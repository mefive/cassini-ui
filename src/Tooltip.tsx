import * as React from 'react';
import styled from 'styled-components';
// eslint-disable-next-line typescript/no-unused-vars
import Trigger, { TriggerProps, Action } from './Trigger';
import { Animation } from './Animate';
import Popover, { Placement } from './Popover';

interface TooltipProps extends TriggerProps {
  title?: string;
  placement?: Placement;
}

const StyledPopover = styled(Popover)`
  background-color: ${({ theme }) => theme.tooltipBg};
  border: none;
  z-index: ${({ theme }) => theme.zindexTooltip};

  .popover-body {
    color: ${({ theme }) => theme.tooltipColor};
  }

  &.bs-popover-top {
    .arrow {
      &::before {
        border-top-color: transparent;
      }
      &::after {
        border-top-color: ${({ theme }) => theme.tooltipBg};
      }
    }
  }

  &.bs-popover-bottom {
    .arrow {
      &::before {
        border-bottom-color: transparent;
      }
      &::after {
        border-bottom-color: ${({ theme }) => theme.tooltipBg};
      }
    }
  }

  &.bs-popover-left {
    .arrow {
      &::before {
        border-left-color: transparent;
      }
      &::after {
        border-left-color: ${({ theme }) => theme.tooltipBg};
      }
    }
  }

  &.bs-popover-right {
    .arrow {
      &::before {
        border-right-color: transparent;
      }
      &::after {
        border-right-color: ${({ theme }) => theme.tooltipBg};
      }
    }
  }
`;

class Tooltip extends React.PureComponent<TooltipProps> {
  static defaultProps = {
    title: null,
    placement: Placement.TOP,
  };

  render() {
    return (
      <Trigger
        action={Action.HOVER}
        enterClassName={Animation.SCALE_IN}
        leaveClassName={Animation.SCALE_OUT}
        enterDelay={200}
        leaveDelay={200}
        popover={() => (
          <StyledPopover placement={this.props.placement}>
            <div className="popover-body">
              {this.props.title}
            </div>
          </StyledPopover>
        )}
      >
        {this.props.children}
      </Trigger>
    );
  }
}

export default Tooltip;
