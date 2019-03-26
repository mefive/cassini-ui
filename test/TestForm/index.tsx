import * as React from 'react';
import Container from '../Container';
import UserForm from './UserForm';

export interface User {
  name: string;
  remember: boolean;
  gender: string;
}

class TestForm extends React.PureComponent {
  state = {
    dataSource: {
      name: 'mefive',
      remember: true,
      gender: 'male',
    } as User,
  };

  render() {
    const { dataSource } = this.state;

    return (
      <Container title="Form">
        <UserForm
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
