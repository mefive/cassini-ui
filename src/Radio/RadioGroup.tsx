import * as React from 'react';
import Radio, { RadioProps } from './Radio';

type Value = RadioProps['value'];

interface RadioGroupProps {
  value?: Value;
  onChange?: (Value) => void;
  radios?: {
    value: Value,
    title: string,
  }[];
  icon?: (checked: boolean) => void;
  format?: (string) => Value;
  className?: string;
  readOnly?: boolean;
}

class RadioGroup extends React.PureComponent<RadioGroupProps> {
  static defaultProps = {
    onChange: () => {},
    format: v => v,
    readOnly: false,
  };

  private onChange:(value: Value) => void = (value) => {
    if (this.props.readOnly) {
      return;
    }

    const fv = this.props.format(value);
    if (fv !== this.props.value) {
      this.props.onChange(fv);
    }
  };

  render() {
    const { radios } = this.props;

    return (
      <div className={this.props.className}>
        {radios && radios.map(radio => (
          <Radio
            key={`${radio.value}`}
            icon={this.props.icon}
            value={radio.value}
            checked={radio.value === this.props.value}
            onChange={this.onChange}
          >
            {radio.title}
          </Radio>
        ))}

        {React.Children.map(this.props.children, (child: JSX.Element) => {
          if (child.type === Radio) {
            return React.cloneElement(
              child, {
                checked: child.props.value === this.props.value,
                onChange: this.onChange,
              },
            );
          }

          return null;
        })}
      </div>
    );
  }
}

export default RadioGroup;
