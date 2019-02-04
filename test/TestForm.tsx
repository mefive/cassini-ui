import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import Container from './Container';
import Input from '../src/Input';
import Checkbox from '../src/Checkbox';

class TestForm extends React.PureComponent {
  state = {
    name: 'mefive',
    remembered: false,
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
              label="remembered"
              checked={this.state.remembered}
              onChange={e => this.setState({ remembered: e.target.checked })}
              checkbox={checked => (
                <div className="mr-0">
                  <FontAwesomeIcon icon={checked ? faCheckSquare : faSquare} />
                </div>
              )}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export default TestForm;
