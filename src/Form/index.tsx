import * as React from 'react';
import { isFunction, omit, pick } from 'lodash';
import classNames from 'classnames';
import styled from 'styled-components';
import Checkbox from '../Checkbox';

export { default } from './Form';
export { default as FormItem } from './FormItem';

interface WithFormProps {
  dataSource?: object;
  onChange?: (key: string, value: any) => void;
  onSubmit?: () => void;
}

type Rule = {
  required?: boolean,
  minLength?: number,
  maxLength?: number,
  regexp?: RegExp,
  validator?: (any) => boolean,
  message?: string,
};

type FieldOption = {
  rules?: Rule[];
};

export interface FormProps extends WithFormProps {
  validate?: (fields: string | string[]) => void;
  getFieldDecorator?: (name: string, options?: FieldOption) => (Item: JSX.Element) => JSX.Element;
  errors?: { [s: string]: string; };
  clearError?: Function;
}

export const withForm = (WrappedComponent) => {
  const StyledForm = styled(WrappedComponent)`
    .required {
      position: relative;
      &:before {
        content: '*';
        color: ${({ theme }) => theme.red};
        font-size: 16px;
        margin-right: 0.25rem;
        vertical-align: middle;
        left: 0;
        top: 0;
      }
    }
    
    .col-form-label {
      &.right {
        text-align: right;
        padding-right: 15px;
      }
    } 
  `;

  class DecoratedForm extends React.PureComponent<WithFormProps> {
    static defaultProps = {
      dataSource: {},
      onChange: () => {},
      onSubmit: () => {},
    };

    private rules: Map<string, Rule[]> = new Map();

    private wrappedInstance: any = null;

    state = {
      errors: {},
    };

    getWrappedInstance() {
      return this.wrappedInstance;
    }

    onChange = (
      e: React.ChangeEvent<HTMLInputElement> | string | number | boolean,
      Item: JSX.Element,
      name: string,
    ) => {
      let value = null;

      if (typeof e === 'object') {
        const { checked, value: v, type } = e.target;

        if (['checkbox', 'radio'].indexOf(type) !== -1) {
          value = checked;
        } else {
          value = v;
        }
      } else {
        value = e;
      }

      if (isFunction(Item.props.onChange)) {
        Item.props.onChange(value);
      }

      this.clearError(name);

      this.props.onChange(name, value);
    };

    getFieldDecorator = (name: string, options: FieldOption = {}) => (Item: JSX.Element) => {
      const error = this.state.errors[name];

      if (options) {
        this.rules.set(name, options.rules);
      }

      const value = this.props.dataSource[name];

      return React.cloneElement(Item, {
        className: classNames(Item.props.className, {
          'is-invalid': error != null,
        }),
        value,
        checked: Item.type === Checkbox ? value : undefined,
        onChange: e => this.onChange(e, Item, name),
        name,
        error,
      });
    };

    clearError = (field) => {
      let fields;

      if (field == null) {
        fields = Array.from(this.rules.keys());
      } else if (typeof field === 'string') {
        fields = [field];
      } else {
        fields = field;
      }

      const { errors } = this.state;

      this.setState({ errors: omit(errors, fields) });
    };

    validate = (field) => {
      let { errors } = this.state;
      errors = pick(errors, Array.from(this.rules.keys()));

      let fields;

      if (field == null) {
        fields = Array.from(this.rules.keys());
      } else if (typeof field === 'string') {
        fields = [field];
      } else {
        fields = field;
      }

      const addToError = (name, message) => {
        if (name in this.state.errors) {
          delete errors[name];
        }

        if (name in errors) {
          errors[name] = `${errors[name]}, ${message}`;
        } else {
          errors[name] = message;
        }
      };

      fields.forEach((name) => {
        const rules = this.rules.get(name);

        if (rules) {
          let value = this.props.dataSource[name];

          for (let i = 0; i < rules.length; i += 1) {
            const rule = rules[i];

            if (value == null || value === '' || (typeof value === 'string' && value.trim() === '')) {
              if (rule.required) {
                errors[name] = rule.message || '必填项不能为空';
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

      return Object.keys(errors).length === 0;
    };

    render() {
      // clear rules at first, let 'getFieldDecorator' start over the adding
      this.rules = new Map();

      return (
        <StyledForm
          {...this.props}
          validate={this.validate}
          getFieldDecorator={this.getFieldDecorator}
          errors={this.state.errors}
          clearError={this.clearError}
          ref={(el) => { this.wrappedInstance = el; }}
        />
      );
    }
  }

  return DecoratedForm;
};
