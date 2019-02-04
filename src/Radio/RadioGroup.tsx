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
            onChange={(e) => {
              const { value } = e.target;

              if (value !== this.props.value) {
                this.props.onChange(value);
              }
            }}
          >
            {radio.title}
          </Radio>
        ))}
      </div>
    );
  }
}

export default RadioGroup;
