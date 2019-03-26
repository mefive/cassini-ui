import * as React from 'react';
import pick from 'lodash-es/pick';
import omit from 'lodash-es/omit';
import { keys } from 'ts-transformer-keys';
import getRealDom from './utils/dom';

export interface ClickableProps {
  onClick: (e?: React.MouseEvent<any>) => void;
}

class Clickable extends React.PureComponent<ClickableProps> {
  public node: HTMLElement = null;

  render() {
    return React.Children.map(
      this.props.children,
      (child: React.ComponentElement<any, any>, index) => {
        if (index === 0) {
          return React.cloneElement(
            child,
            {
              ...omit(pick(this.props, keys<React.DOMAttributes<any>>()), ['children']),
              onKeyPress: (e) => {
                if (e.key === 'Enter') {
                  this.props.onClick(e);
                }
              },
              tabIndex: 0,
              role: 'button',
              ref: (el) => {
                if (typeof child.ref === 'function') {
                  child.ref(el);
                }
                this.node = getRealDom(el);
              },
            },
          );
        }

        return child;
      },
    );
  }
}

export default Clickable;
