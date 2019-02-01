import * as React from 'react';
import classNames from 'classnames';
import { Transition, TransitionGroup } from 'react-transition-group';
import { EnterHandler } from 'react-transition-group/Transition';

import './style.scss';

export interface AnimateProps {
  enterClassName?: string;
  leaveClassName?: string;
  enterDuration?: number;
  leaveDuration?: number;
  activeClass?: string;
  onEnter?: EnterHandler,
  onEntering?: EnterHandler,
  onEntered?: EnterHandler,
}

class Animate extends React.PureComponent<AnimateProps> {
  static defaultProps = {
    enterDuration: 200,
    leaveDuration: 200,
    enterClassName: null,
    leaveClassName: null,
    activeClass: 'active',
    children: null,
    onEnter: () => {},
    onEntering: () => {},
    onEntered: () => {},
  };

  render() {
    const {
      enterDuration, leaveDuration, enterClassName, leaveClassName,
    } = this.props;

    return (
      <TransitionGroup>
        {this.props.children && React.Children.map(this.props.children, (child: JSX.Element) => (
          <Transition
            key={child.key || 'single'}
            in
            timeout={{
              enter: enterClassName ? enterDuration : 0,
              exit: leaveClassName ? leaveDuration : 0,
            }}
            onEnter={this.props.onEnter}
            onEntering={this.props.onEntering}
            onEntered={this.props.onEntered}
            unmountOnExit
          >
            {state => React.cloneElement(child, {
              className: classNames(child.props.className, 'animation', {
                [enterClassName]: enterClassName && state === 'entering',
                [leaveClassName]: leaveClassName && (state === 'exiting' || state === 'exited'),
                [this.props.activeClass]: state === 'entered',
              }),
            })}
          </Transition>
        ))}
      </TransitionGroup>
    );
  }
}

export default Animate;
