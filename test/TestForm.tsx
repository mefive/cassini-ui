import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import Container from './Container';
import Input from '../src/Input';
import Checkbox from '../src/Checkbox';
import { RadioGroup } from '../src/Radio';

class TestForm extends React.PureComponent {
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
              onChange={e => this.setState({ name: e.target.value })}
            />
          </div>

          <div className="flex-1 ml-2">
            <Checkbox
              checked={this.state.remembered}
              onChange={e => this.setState({ remembered: e.target.checked })}
              icon={checked => (
                <div className="mr-0">
                  <FontAwesomeIcon icon={checked ? faCheckSquare : faSquare} />
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
              radios={[{
                value: 'red',
                title: 'Red',
              }, {
                value: 'white',
                title: 'White',
              }, {
                value: 'black',
                title: 'Black',
              }]}
              value={this.state.color}
              onChange={color => this.setState({ color })}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export default TestForm;
