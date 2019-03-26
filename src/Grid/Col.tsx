import * as React from 'react';
import classNames from 'classnames';
import pick from 'lodash-es/pick';

type Layout = {
  span?: number,
  offset? :number,
};

export type ColProps = {
  xs?: number | Layout;
  sm?: number | Layout;
  md?: number | Layout;
  lg?: number | Layout;
  xl?: number | Layout;
  gutter?: number;
} & Layout;

class Col extends React.PureComponent<ColProps & React.HTMLAttributes<any>> {
  static defaultProps = {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null,

    span: null,
    offset: null,
    className: null,
    gutter: null,
    children: null,
    style: {},
  };

  getBreakPointClassNames() {
    const breakPoints: { [s:string]: number | Layout } = pick(this.props, ['xs', 'sm', 'md', 'lg', 'xl']);
    const classes = {};

    const { span, offset } = this.props;

    if (span != null || offset != null) {
      classes[`col-md-${span}`] = span != null;
      classes[`offset-md-${offset}`] = offset != null;
    } else {
      Object.keys(breakPoints).forEach((key) => {
        const breakPoint = breakPoints[key];

        if (typeof breakPoint === 'number') {
          classes[`col-${key}-${breakPoint}`] = true;
        } else if (breakPoint != null) {
          classes[`col-${key}-${breakPoint.span}`] = breakPoint.span != null;
          classes[`offset-${key}-${breakPoint.offset}`] = breakPoint.offset != null;
        }
      });
    }
    return classNames(classes);
  }

  render() {
    const { gutter } = this.props;

    return (
      <div
        className={classNames(
          'col',
          this.props.className,
          this.getBreakPointClassNames(),
        )}
        style={{
          paddingLeft: gutter == null ? 0 : gutter / 2,
          paddingRight: gutter == null ? 0 : gutter / 2,
          ...this.props.style,
        }}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Col;
