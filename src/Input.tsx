import * as React from 'react';
import classNames from 'classnames';
import { omit } from 'lodash';
import { keys } from 'ts-transformer-keys';

type Value = string;

interface Props {
  value: Value;
  onChange: (value: Value, e: React.ChangeEvent) => void;
  autoFocus?: boolean;
  format?: (Value) => Value;
  onEnter?: Function;
  prepend?: JSX.Element;
  append?: JSX.Element;
}

class Input extends React.PureComponent<Props & React.AllHTMLAttributes<any>> {
  static defaultProps = {
    value: null,
    autoFocus: false,
    format: v => v,
    onChange: () => {},
    onEnter: () => {},
    prepend: null,
    append: null,
  };

  private input = React.createRef<HTMLInputElement>();

  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.current.focus();
    }
  }

  renderInput(className?: string): JSX.Element {
    const props = omit(this.props, keys<Props>());

    return (
      <input
        {...props}
        className={classNames('form-control', this.props.className, className)}
        type="text"
        value={this.props.value == null ? '' : this.props.value}
        ref={this.input}
        onChange={(e) => {
          let { value } = e.target;
          value = this.props.format(value);
          this.props.onChange(value, e);
        }}

        onKeyPress={(e) => {
          if (e.charCode === 13) {
            this.props.onEnter();
          }
        }}
      />
    );
  }

  render() {
    if (this.props.prepend == null && this.props.append == null) {
      return this.renderInput();
    }

    return (
      <div className={classNames('d-flex align-items-center justify-content-between', this.props.className)}>
        {this.props.prepend}

        <div className="flex-1 w-100">
          {this.renderInput('border-0')}
        </div>

        {this.props.append}
      </div>
    );
  }
}

export default Input;
