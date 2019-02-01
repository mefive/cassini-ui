import * as React from 'react';
import classNames from 'classnames';

type Props = {
  gutter?: number;
};

class Grid extends React.PureComponent<Props & React.HTMLAttributes<any>> {
  static defaultProps = {
    gutter: 0,
  };

  render() {
    const { gutter, ...props } = this.props;

    return (
      <div
        {...props}
        className={classNames('container', props.className)}
        style={{
          paddingLeft: -gutter * 0.5,
          paddingRight: -gutter * 0.5,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Grid;
