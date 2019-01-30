import * as React from 'react';
import classNames from 'classnames';

class Input extends React.PureComponent<React.HTMLAttributes<HTMLInputElement>> {
  render() {
    return (
      <input
        {...this.props}
        className={classNames(
          'form-control',
          this.props.className,
        )}
      />
    );
  }
}

export default Input;
