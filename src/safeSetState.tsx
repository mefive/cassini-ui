import * as React from 'react';

function safeSetState<T extends React.ComponentClass>(WrappedComponent: T): T {
  const W = WrappedComponent as React.ComponentClass;

  class SafeSetState extends React.PureComponent<{ forwardedRef }> {
    componentWillUnmount() {
      this.child.setState = () => { };
    }

    private child: React.Component<any, any>;

    render() {
      const { forwardedRef, ...rest } = this.props;

      return (
        <W
          ref={(child) => {
            this.child = child;
            if (forwardedRef) {
              forwardedRef(child);
            }
          }}
          {...rest}
        />
      );
    }
  }

  // eslint-disable-next-line
  const S = React.forwardRef((props, ref) => (
    <SafeSetState {...props} forwardedRef={ref} />
  ));

  return S as any as T;
}

export default safeSetState;
