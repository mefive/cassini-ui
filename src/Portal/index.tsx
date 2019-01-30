import * as React from 'react';
import { PortalContext } from '../context';
import Portal, { PortalProps } from './Portal';

export default React.forwardRef((props: PortalProps, ref: React.Ref<Portal>) => (
  <PortalContext.Consumer>
    {({ getContainer }) => (
      <Portal
        {...props}
        getContainer={props.getContainer || getContainer}
        ref={ref}
      />
    )}
  </PortalContext.Consumer>
));
