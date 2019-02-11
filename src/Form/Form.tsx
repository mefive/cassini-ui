import * as React from 'react';
import classNames from 'classnames';

class Form extends React.PureComponent<React.FormHTMLAttributes<any>> {
  render() {
    return (
      <form
        className={classNames(
          'form',
          this.props.className,
        )}
        onSubmit={(e) => {
          e.preventDefault();
          if (this.props.onSubmit) {
            this.props.onSubmit(e);
          }
        }}
      >
        <div>
          {this.props.children}
        </div>

        <input type="submit" className="d-none" />
      </form>
    );
  }
}

export default Form;
