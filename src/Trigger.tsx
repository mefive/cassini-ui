import * as React from 'react';
import { contains } from 'dom-helpers/query';
import { isFunction } from 'lodash';
import Popover from './Popover';
// eslint-disable-next-line typescript/no-unused-vars
import Animate, { AnimateProps } from './Animate';
import Portal from './Portal';

export enum Action {
  CLICK = 'click',
  HOVER = 'hover',
  HOVER_HOLD = 'hover_hold',
}

export interface TriggerProps extends AnimateProps {
  active?: boolean;
  defaultActive?: boolean;
  onActiveChange?: Function;
  action?: Action;
  popover?: () => React.ComponentElement<any, any>;
  enterDelay?: number;
  leaveDelay?: number;
  disabled?: boolean;
}

interface Events {
  onClick?: React.ReactEventHandler;
  onMouseEnter?: React.ReactEventHandler;
  onMouseLeave?: React.ReactEventHandler;
}

class Trigger extends React.PureComponent<TriggerProps> {
  static Action = Action;

  static defaultProps = {
    active: null,
    onActiveChange: () => {},
    defaultActive: false,
    action: Action.CLICK,
    popover: () => (<Popover />),
    enterDelay: null,
    leaveDelay: null,
    disabled: false,
  };

  state = {
    active: this.props.active == null ? this.props.defaultActive : this.props.active,
    popoverContainer: null,
  };

  private popover: Popover = null;

  private enterDelayTimer:any = null;

  private leaveDelayTimer:any = null;

  private anchor:Node = null;

  componentWillReceiveProps({ active }) {
    if (active !== this.props.active) {
      this.setState({ active });
      this.clearTimers();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.action === Action.CLICK) {
      if (!prevState.active && this.state.active) {
        document.addEventListener('click', this.onClick);
      } else if (prevState.active && !this.state.active) {
        document.removeEventListener('click', this.onClick);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onClick);
    this.clearTimers();
  }

  onClick = (e) => {
    const popover = this.popover && this.popover.node;

    if (popover == null || !contains(popover, e.target)) {
      this.setActive(!this.state.active);
    }
  };

  onMouseEnter = () => this.setActive(true);

  onMouseLeave = () => this.setActive(false);

  setActive(active, force = false) {
    this.clearTimers();

    if (!force) {
      if (active && this.props.enterDelay) {
        this.enterDelayTimer = setTimeout(
          () => this.setActive(active, true),
          this.props.enterDelay,
        );
        return;
      }

      if (!active && this.props.leaveDelay) {
        this.leaveDelayTimer = setTimeout(
          () => this.setActive(active, true),
          this.props.leaveDelay,
        );
        return;
      }
    }

    if (this.props.active == null) {
      this.setState({ active });
    }

    this.props.onActiveChange(active);
  }

  clearTimers() {
    if (this.enterDelayTimer) {
      clearTimeout(this.enterDelayTimer);
    }

    if (this.leaveDelayTimer) {
      clearTimeout(this.leaveDelayTimer);
    }
  }

  render() {
    const { action } = this.props;
    const { active } = this.state;

    return React.Children.map(
      this.props.children,
      (child: React.ComponentElement<any, any>, index) => {
        if (index === 0) {
          const events:Events = {};

          if (!this.props.disabled) {
            if (action === Action.CLICK && !active) {
              events.onClick = this.onClick;
            }

            if ([Action.HOVER, Action.HOVER_HOLD].indexOf(action) !== -1) {
              events.onMouseEnter = this.onMouseEnter;
              events.onMouseLeave = this.onMouseLeave;
            }
          }

          return React.cloneElement(
            child,
            {
              ...events,
              ref: (el) => {
                if (isFunction(child.ref)) {
                  child.ref(el);
                }

                this.anchor = el;
              },
            },
          );
        }

        return child;
      },
    ).concat((
      <Animate
        enterClassName={this.props.enterClassName}
        leaveClassName={this.props.leaveClassName}
        enterDuration={this.props.enterDuration}
        leaveDuration={this.props.leaveDuration}
        onEnter={() => {
          this.popover.place();
        }}
        key={React.Children.count(this.props.children)}
      >
        {active && (
          <Portal
            onContainerChange={popoverContainer => this.setState(
              { popoverContainer },
              () => this.popover.place(),
            )}
          >
            {(() => {
              const popover = this.props.popover();

              const events:Events = {};

              if (action === Action.HOVER_HOLD) {
                events.onMouseEnter = () => this.setActive(true, true);
                events.onMouseLeave = this.onMouseLeave;
              }

              return React.cloneElement(
                popover,
                {
                  ...events,
                  anchor: this.anchor,
                  container: this.state.popoverContainer,
                  ref: (el) => {
                    if (isFunction(popover.ref)) {
                      popover.ref(el);
                    }

                    this.popover = el;
                  },
                },
              );
            })()}
          </Portal>
        )}
      </Animate>
    ));
  }
}

export default Trigger;
