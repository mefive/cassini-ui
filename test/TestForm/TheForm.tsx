import * as React from 'react';
import SvgCheckSquare from '../../src/icons/solid/CheckSquare';
import SvgSquare from '../../src/icons/solid/Square';
import Container from '../Container';
import Input from '../../src/Input';
import Checkbox from '../../src/Checkbox';
import Radio, { RadioGroup } from '../../src/Radio';

const radios = [{
  value: 'red',
  title: 'Red',
}, {
  value: 'white',
  title: 'White',
}, {
  value: 'black',
  title: 'Black',
}];

class TheForm extends React.PureComponent {
  state = {
    name: 'mefive',
    remembered: false,
    color: 'black',
  };

  render() {
    return (
      <Container title="Form">
        <div className="d-flex align-items-center">
          <div className="flex-1">
            <Input
              value={this.state.name}
              onChange={name => this.setState({ name })}
            />
          </div>

          <div className="flex-1 ml-2">
            <Checkbox
              checked={this.state.remembered}
              onChange={remembered => this.setState({ remembered })}
              icon={checked => (
                <div className="mr-0">
                  {checked
                    ? (<SvgCheckSquare style={{ width: 12 }} />)
                    : (<SvgSquare style={{ width: 12 }} />)
                  }
                </div>
              )}
            >
              remembered
            </Checkbox>
          </div>
        </div>

        <div className="d-flex align-items-center mt-2">
          <div className="flex-1">
            <RadioGroup
              value={this.state.color}
              onChange={color => this.setState({ color })}
            >
              {radios.map(radio => (
                <Radio
                  key={radio.value}
                  value={radio.value}
                >
                  {radio.title}
                </Radio>
              ))}
            </RadioGroup>
          </div>
        </div>
      </Container>
    );
  }
}

export default TheForm;
