import * as React from 'react';

class Clickable extends React.PureComponent<React.HTMLAttributes<any>> {
  render() {
    return React.Children.map(this.props.children, (child: JSX.Element, index) => {
      if (index === 0) {
        return React.cloneElement(
          child,
          {
            onClick: this.props.onClick,
            onKeyPress: (e) => {
              if (e.key === 'Enter') {
                this.props.onClick(e);
              }
            },
            tabIndex: 0,
            role: 'button',
          },
        );
      }

      return child;
    });
  }
}

export default Clickable;
