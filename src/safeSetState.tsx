import * as React from 'react';

function safeSetState(WrappedComponent: React.ComponentClass<any, any>): any {
  class SafeSetState extends WrappedComponent {
    componentDidMount(): void {}

    componentDidCatch(): void {}

    componentDidUpdate(): void {}

    componentWillReceiveProps(): void {}

    componentWillMount(): void {}

    componentWillUpdate(): void {}

    componentWillUnmount() {
      this.child.setState = () => { };
    }

    private child: React.Component<any, any>;

    render() {
      const { forwardedRef, ...rest } = this.props;

      return (
        <WrappedComponent
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

  return React.forwardRef((props, ref) => (
    <SafeSetState {...props} forwardedRef={ref} />
  ));
}

export default safeSetState;
