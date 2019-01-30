import * as React from 'react';
import Input from './Input';
import Clone from './Clone';

interface Props {
  name?: string,
}

class Test extends React.PureComponent<Props> {
  static defaultProps = {
    name: 'mefive',
  };

  state = {
    age: 32,
  };

  render() {
    return (
      <div>
        {this.props.name}
        {this.state.age}
        <Input className="test" />

        <Clone className="t">
          <div>123</div>
          <div>123</div>
        </Clone>
      </div>
    );
  }
}

export default Test;
