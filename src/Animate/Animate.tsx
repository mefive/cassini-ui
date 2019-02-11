import * as React from 'react';
import classNames from 'classnames';
import { Transition, TransitionGroup } from 'react-transition-group';
import { EnterHandler } from 'react-transition-group/Transition';
import StyledAnimate from './styled';

export enum Animation {
  SLIDE_DOWN_IN = 'slide-down-in',
  SLIDE_DOWN_OUT = 'slide-down-out',
  SLIDE_UP_IN = 'slide-up-in',
  SLIDE_UP_OUT = 'slide-up-out',
  SLIDE_RIGHT_IN = 'slide-right-in',
  SLIDE_RIGHT_OUT = 'slide-right-out',
  SCALE_IN = 'scale-in',
  SCALE_OUT = 'scale-out',
  MOVE_UP_IN = 'move-up-in',
  MOVE_UP_OUT = 'move-up-out',
  MOVE_DOWN_IN = 'move-down-in',
  MOVE_DOWN_OUT = 'move-down-out',
  MOVE_RIGHT_IN = 'move-right-in',
  MOVE_RIGHT_OUT = 'move-right-out',
  MOVE_LEFT_IN = 'move-left-in',
  MOVE_LEFT_OUT = 'move-left-out',
  FADE_IN = 'fade-in',
  FADE_OUT = 'fade-out',
  FADE_IN_HALF = 'fade-in-half',
  FADE_OUT_HALF = 'fade-out-half',
}

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
      <React.Fragment>
        <StyledAnimate />

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
              {state => React.cloneElement(
                child,
                {
                  className: classNames('animation', {
                    [enterClassName]: enterClassName && state === 'entering',
                    [leaveClassName]: leaveClassName && (state === 'exiting' || state === 'exited'),
                    [this.props.activeClass]: state === 'entered',
                  }),
                },
              )}
            </Transition>
          ))}
        </TransitionGroup>
      </React.Fragment>
    );
  }
}

export default Animate;
