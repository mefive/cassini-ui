import * as React from 'react';
import Container from '../Container';
import WithForm from './WithForm';

class TestForm extends React.PureComponent {
  state = {
    dataSource: {
      name: 'mefive',
      remember: true,
      gender: 'male',
    },
  };

  render() {
    const { dataSource } = this.state;

    return (
      <Container title="Form">
        <WithForm
          dataSource={this.state.dataSource}
          onChange={(key, value) => this.setState({
            dataSource: {
              ...dataSource,
              [key]: value,
            },
          })}
          onSubmit={() => alert(1)}
        />
      </Container>
    );
  }
}

export default TestForm;
