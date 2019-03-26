import * as React from 'react';
import classNames from 'classnames';
import omit from 'lodash-es/omit';
import { keys } from 'ts-transformer-keys';

interface Props {
  format?: (string) => string;
  onEnter?: Function;
  prepend?: JSX.Element;
  append?: JSX.Element;
  onChange?: (value: string | string[] | number, e?: React.ChangeEvent) => void;
}

type I = React.InputHTMLAttributes<any>;

export type InputProps = Props & Pick<I, Exclude<keyof I, 'onChange'>>;

class Input extends React.PureComponent<InputProps> {
  static defaultProps = {
    value: null,
    autoFocus: false,
    format: v => v,
    onChange: () => {},
    onEnter: () => {},
    prepend: null,
    append: null,
  };

  private input: HTMLInputElement = null;

  componentDidMount() {
    if (this.props.autoFocus) {
      this.input.focus();
    }
  }

  renderInput(className?: string): JSX.Element {
    const props = omit(this.props, keys<Props>());

    return (
      <input
        type="text"
        {...props}
        className={classNames('form-control', this.props.className, className)}
        value={this.props.value == null ? '' : this.props.value}
        ref={(el) => { this.input = el; }}
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
