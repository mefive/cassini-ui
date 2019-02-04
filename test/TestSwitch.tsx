import * as React from 'react';
import Container from './Container';
import Switch from './styled/Switch';

class TestSwitch extends React.PureComponent {
  state = {
    value: false,
  };

  render() {
    return (
      <Container title="Switch">
        <Switch
          value={this.state.value}
          onChange={value => this.setState({ value })}
        />
      </Container>
    );
  }
}

export default TestSwitch;
