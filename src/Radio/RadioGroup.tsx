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
}

class RadioGroup extends React.PureComponent<RadioGroupProps> {
  static defaultProps = {
    value: null,
    onChange: () => {},
    radios: null,
  };

  private onChange:(e: React.ChangeEvent<HTMLInputElement>) => void = (e) => {
    const { value } = e.target;

    if (value !== this.props.value) {
      this.props.onChange(value);
    }
  };

  render() {
    const { radios } = this.props;

    return (
      <div>
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
