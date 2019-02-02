import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import CustomSelect from '../src/CustomSelect';
import Container from './Container';
import Select, { Option } from '../src/Select';

const persons: Option[] = [{
  value: 'mefive',
  title: 'mefive',
}, {
  value: 'mark',
  title: 'Mark',
}];

const addr: Option[] = [{
  value: 'home',
  title: 'Home',
}, {
  value: 'company',
  title: 'Company',
}];

class TestSelect extends React.PureComponent {
  state = {
    person: 'mefive',
    addr: 'home',
  };

  render() {
    return (
      <Container title="Select">
        <div className="d-flex">
          <div className="flex-1">
            <Select
              options={persons}
              onChange={person => this.setState({ person })}
              value={this.state.person}
            />
          </div>

          <div className="flex-1 ml-2">
            <CustomSelect>
              45
            </CustomSelect>
          </div>
        </div>

      </Container>
    );
  }
}

export default TestSelect;
