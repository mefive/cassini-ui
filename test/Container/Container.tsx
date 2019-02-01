import * as React from 'react';
import classNames from 'classnames';

interface Props {
  children: React.ReactNode,
  title: string;
}

class Container extends React.PureComponent<Props & React.HTMLAttributes<any>> {
  static defaultProps = {
    className: null,
    title: null,
  };

  render() {
    return (
      <div className={classNames('card', this.props.className)}>
        <div className="card-header">
          {this.props.title}
        </div>

        <div className="card-body">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Container;
