import * as React from 'react';
import classNames from 'classnames';

type RowProps = {
  gutter?: number;
};

class Row extends React.PureComponent<RowProps & React.HTMLAttributes<any>> {
  static defaultProps = {
    style: {},
  };

  render() {
    const { gutter } = this.props;

    return (
      <div
        className={classNames('row', this.props.className)}
        style={{
          marginLeft: gutter == null ? 0 : gutter / -2,
          marginRight: gutter == null ? 0 : gutter / -2,
          ...this.props.style,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Row;
