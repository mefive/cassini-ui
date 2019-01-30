import * as React from 'react';
import { omit } from 'lodash';

class Clone extends React.PureComponent<React.HTMLAttributes<JSX.Element>> {
  render() {
    return (
      <React.Fragment>
        {React.Children.map(
          this.props.children,
          (child: JSX.Element) => React
            .cloneElement(child, omit(this.props, ['children'])),
        )}
      </React.Fragment>
    );
  }
}

export default Clone;
