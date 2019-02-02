import * as React from 'react';
import { range } from 'lodash';
import Container from './Container';
import Select, { Option } from '../src/Select';

const persons: Option[] = [{
  value: 'mefive',
  title: 'mefive',
}, {
  value: 'mark',
  title: 'Mark',
}];

const address: Option[] = range(50).map(index => ({
  value: index,
  title: `title+${index}`,
}));

class TestSelect extends React.PureComponent {
  state = {
    person: 'mefive',
    addr: range(10).map(index => index),
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
            <Select
              options={address}
              value={this.state.addr}
              onChange={addr => this.setState({ addr })}
              multiple
            />
          </div>
        </div>

      </Container>
    );
  }
}

export default TestSelect;
