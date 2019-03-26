import * as React from 'react';
import isFunction from 'lodash-es/isFunction';
import classNames from 'classnames';

export { default } from './Form';
export { default as FormItem } from './FormItem';

export * from './Form';
export * from './FormItem';

// type Value = string | string[] | number | boolean;
type Value = any;

export interface WithFormProps<T = any> {
  dataSource?: T;
  onChange?: (key: keyof T, value: any) => void;
  onSubmit?: () => void;
  isSubmitting?: boolean;
  isDirty?: boolean;
  readOnly?: boolean;

  validate?: (fields?: keyof T | (keyof T)[]) => boolean;
  getFieldDecorator?: (name: keyof T, options?: FieldOption) => (Item: JSX.Element) => JSX.Element;
  errors?: Map<keyof T, string>;
  clearError?: Function;
}

type Rule = {
  required?: boolean,
  minLength?: number,
  maxLength?: number,
  regexp?: RegExp,
  validator?: (value: Value) => boolean,
  message?: string,
};

type FieldOption = {
  rules?: Rule[];
};

function withForm
  <T extends React.ComponentClass<P>, P extends WithFormProps<S>, S>(WrappedComponent: T): T {
  const W = WrappedComponent as React.ComponentClass<P>;

  class DecoratedWithForm extends React.PureComponent<P> {
    private rules: Map<keyof S, Rule[]> = new Map();

    private onChangeMap: Map<keyof S, {
      onChange: (value: Value, e?: React.ChangeEvent<HTMLInputElement>) => void,
      elementOnChange: Function,
    }> = new Map();

    state = {
      errors: new Map<keyof S, string>(),
    };

    getOnChangeFunc(name: keyof S, Item: JSX.Element) {
      const func = this.onChangeMap.get(name);

      if (func && func.elementOnChange === Item.props.onChange) {
        return func.onChange;
      }

      const onChange = (
        value: Value | React.ChangeEvent<HTMLInputElement>,
        event?: React.ChangeEvent<HTMLInputElement>,
      ) => {
        let v;

        if (typeof value === 'object' && 'target' in value) {
          const {
            checked,
            value: vv,
            type,
          } = (value as React.ChangeEvent<HTMLInputElement>).target;

          if (['checkbox', 'radio'].indexOf(type) !== -1) {
            v = checked;
          } else {
            v = vv;
          }
        } else {
          v = value;
        }

        if (isFunction(Item.props.onChange)) {
          Item.props.onChange(value, event);
        }

        this.clearError(name);

        this.props.onChange(name, v);
      };

      this.onChangeMap.set(name, { onChange, elementOnChange: Item.props.onChange });

      return onChange;
    }

    getFieldDecorator = (name: keyof S, options: FieldOption) => (Item: JSX.Element) => {
      const error = this.state.errors.get(name);

      if (options) {
        this.rules.set(name, options.rules);
      }

      const { dataSource } = this.props;

      const value = dataSource ? dataSource[name] : null;

      return React.cloneElement(Item, {
        className: classNames(Item.props.className, {
          'is-invalid': error != null,
        }),
        value,
        onChange: this.getOnChangeFunc(name, Item),
        name,
        error,
      });
    };

    clearError = (field: keyof S | (keyof S)[]) => {
      const e = this.state.errors;

      let fields: (keyof S)[];

      if (field == null) {
        fields = Array.from(this.rules.keys());
      } else if (typeof field === 'string') {
        fields = [field];
      } else {
        fields = field as (keyof S)[];
      }

      if (e.size === 0 || !fields.some(f => e.has(f))) {
        return;
      }

      const errors = new Map(e);

      fields.forEach(f => errors.delete(f));

      this.setState({ errors });
    };

    validate = (field: keyof S | (keyof S)[]) => {
      const { dataSource } = this.props as { dataSource: S };

      const e = this.state.errors;

      const errors = new Map<keyof S, string>();

      this.state.errors.forEach((value, key) => {
        if (this.rules.has(key)) {
          errors.set(key, e.get(key));
        }
      });

      let fields: (keyof S)[];

      if (field == null) {
        fields = Array.from(this.rules.keys());
      } else if (typeof field === 'string') {
        fields = [field];
      } else {
        fields = field as (keyof S)[];
      }

      const addToError = (name: keyof S, message) => {
        if (e.has(name)) {
          errors.delete(name);
        }

        if (errors.has(name)) {
          errors.set(name, `${errors.get(name)}, ${message}`);
        } else {
          errors.set(name, message);
        }
      };

      fields.forEach((name) => {
        const rules = this.rules.get(name);

        if (rules) {
          let value: any = dataSource ? dataSource[name] : null;

          for (let i = 0; i < rules.length; i += 1) {
            const rule = rules[i];

            if (value == null || value === '' || (typeof value === 'string' && value.trim() === '')) {
              if (rule.required) {
                errors.set(name, rule.message || '必填项不能为空');
              }

              break;
            }

            value = value || '';

            if (isFunction(rule.validator)) {
              if (!rule.validator(value)) {
                addToError(name, rule.message || '不符合自定义规则');
              }
            } else if (rule.maxLength != null && value.length > rule.maxLength) {
              addToError(name, rule.message || `不得大于${rule.maxLength}个字符`);
            } else if (rule.minLength != null && value.length < rule.minLength) {
              addToError(name, rule.message || `不得少于${rule.minLength}个字符`);
            } else if (rule.regexp != null && !rule.regexp.test(value)) {
              addToError(name, rule.message || '格式不正确');
            }
          }
        }
      });

      this.setState({ errors });

      return errors.size === 0;
    };

    render() {
      // clear rules at first, let 'getFieldDecorator' start over the adding
      this.rules = new Map();

      return (
        <W
          {...this.props}
          validate={this.validate}
          getFieldDecorator={this.getFieldDecorator}
          errors={this.state.errors}
          clearError={this.clearError}
        />
      );
    }
  }

  return DecoratedWithForm as any as T;
}

export { withForm };
