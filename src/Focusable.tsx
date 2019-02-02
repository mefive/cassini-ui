import * as React from 'react';

class Focusable extends React.PureComponent<React.HTMLAttributes<any>> {
  render() {
    const child = React.Children.only(this.props.children) as JSX.Element;

    return React.cloneElement(
      child,
      {
        tabIndex: 0,
      },
    );
  }
}

export default Focusable;
