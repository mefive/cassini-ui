import * as React from 'react';
import classNames from 'classnames';
import { omit } from 'lodash';
import { keys } from 'ts-transformer-keys';
import safeSetState from '../safeSetState';
import StyledPopover from './styled';

export enum Placement {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  TOP_LEFT = 'top-left',
  TOP_RIGHT = 'top-right',
  BOTTOM_LEFT = 'bottom-left',
  BOTTOM_RIGHT = 'bottom-right',
  LEFT_TOP = 'left-top',
  LEFT_BOTTOM = 'left-bottom',
  RIGHT_TOP = 'right-top',
  RIGHT_BOTTOM = 'right-bottom',
}

interface Props {
  placement?: Placement;
  container?: HTMLElement;
  anchor?: HTMLElement;
  offset?: number;
  hasArrow?: boolean;
}

interface PlacementStyleInfo {
  style?: {
    left?: number,
    top?: number,
    marginLeft?: number,
    marginTop?: number,
  };

  betterPlacement?: Placement;
}

@safeSetState
class Popover extends React.PureComponent<Props & React.HTMLAttributes<any>> {
  static Placement = Placement;

  static defaultProps = {
    container: null,
    anchor: null,
    placement: Placement.TOP,
    offset: 0,
    hasArrow: true,
  };

  state = {
    style: null,
    placement: this.props.placement,
  };

  public node: HTMLDivElement = null;

  componentDidMount() {
    window.addEventListener('resize', this.place);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.place);
  }

  getPlaceStyleInfo(placement: Placement): PlacementStyleInfo {
    const containerRect = this.props.container.getBoundingClientRect();

    const anchorRect = this.props.anchor.getBoundingClientRect();
    const anchorHeight = anchorRect.height;
    const anchorWidth = anchorRect.width;

    const popoverHeight = this.node.offsetHeight;
    const popoverWidth = this.node.offsetWidth;

    const betterPlacement = [];

    let left = 0;
    let top = 0;
    let marginLeft = 0;
    let marginTop = 0;

    // offset
    let { offset } = this.props;

    if (this.props.hasArrow) {
      offset += 10;
    }

    const placements = placement.split('-');

    // handle offset as margin
    switch (placements[0]) {
      case Placement.TOP: {
        marginTop = -offset;
        break;
      }

      case Placement.BOTTOM: {
        marginTop = offset;
        break;
      }

      case Placement.LEFT: {
        marginLeft = -offset;
        break;
      }

      case Placement.RIGHT: {
        marginLeft = offset;
        break;
      }

      default:
        break;
    }

    // handle primary placement
    switch (placements[0]) {
      case Placement.TOP: {
        top = anchorRect.top - popoverHeight - containerRect.top;
        break;
      }

      case Placement.BOTTOM: {
        top = (anchorRect.top + anchorHeight) - containerRect.top;
        break;
      }

      case Placement.LEFT: {
        left = anchorRect.left - popoverWidth - containerRect.left;
        break;
      }

      case Placement.RIGHT: {
        left = (anchorRect.left + anchorWidth) - containerRect.left;
        break;
      }

      default:
        break;
    }

    // handle primary placement align, treat as center alignment
    switch (placements[0]) {
      case Placement.TOP:
      case Placement.BOTTOM: {
        left = (anchorRect.left - containerRect.left) + (0.5 * (anchorWidth - popoverWidth));
        break;
      }

      case Placement.LEFT:
      case Placement.RIGHT: {
        top = (anchorRect.top - containerRect.top) + (0.5 * (anchorHeight - popoverHeight));
        break;
      }

      default:
        break;
    }

    // if has secondary placement, use it to modify alignment
    switch (placements[1]) {
      case Placement.LEFT: {
        left -= (0.5 * (anchorWidth - popoverWidth));
        break;
      }

      case Placement.RIGHT: {
        left += (0.5 * (anchorWidth - popoverWidth));
        break;
      }

      case Placement.TOP: {
        top -= (0.5 * (anchorHeight - popoverHeight));
        break;
      }

      case Placement.BOTTOM: {
        top += (0.5 * (anchorHeight - popoverHeight));
        break;
      }

      default:
        break;
    }

    if (this.props.container !== document.body) {
      top += this.props.container.scrollTop;
      left += this.props.container.scrollLeft;
    }

    // build a better placement, avoid overflowing of the container's edge
    switch (placements[0]) {
      case Placement.TOP: {
        if (top < containerRect.top) {
          betterPlacement[0] = Placement.BOTTOM;
        }
        break;
      }

      case Placement.BOTTOM: {
        if (top + popoverHeight > containerRect.height) {
          betterPlacement[0] = Placement.TOP;
        }
        break;
      }

      case Placement.LEFT: {
        if (left < containerRect.left) {
          betterPlacement[0] = Placement.RIGHT;
        }
        break;
      }

      case Placement.RIGHT: {
        if (left + popoverWidth > containerRect.width) {
          betterPlacement[0] = Placement.LEFT;
        }
        break;
      }

      default:
        break;
    }

    switch (placements[1]) {
      case Placement.LEFT: {
        if (left + popoverWidth > containerRect.width) {
          betterPlacement[1] = Placement.RIGHT;
        }
        break;
      }

      case Placement.RIGHT: {
        if (left < containerRect.left) {
          betterPlacement[1] = Placement.LEFT;
        }
        break;
      }

      case Placement.TOP: {
        if (top + popoverHeight > containerRect.height) {
          betterPlacement[1] = Placement.BOTTOM;
        }
        break;
      }

      case Placement.BOTTOM: {
        if (top < containerRect.top) {
          betterPlacement[1] = Placement.TOP;
        }
        break;
      }

      default:
        break;
    }

    if (!Number.isNaN(left)
      && !Number.isNaN(top)
      && !Number.isNaN(marginLeft)
      && !Number.isNaN(marginTop)
    ) {
      return {
        style: {
          left, top, marginLeft, marginTop,
        },
        betterPlacement: placements.map((p, index) => betterPlacement[index] || p).join('-') as Placement,
      };
    }

    console.error('placement error: you should not seen these', this.props.container, this.props.anchor);
    return { style: null };
  }

  place = () => {
    if (this.props.container == null || this.props.anchor == null) {
      return;
    }

    const placeStyleInfo = this.getPlaceStyleInfo(this.props.placement);
    let betterPlaceStyleInfo = placeStyleInfo;
    let { betterPlacement } = betterPlaceStyleInfo;

    if (betterPlacement !== this.props.placement) {
      betterPlaceStyleInfo = this.getPlaceStyleInfo(placeStyleInfo.betterPlacement);

      if (betterPlaceStyleInfo.betterPlacement !== placeStyleInfo.betterPlacement) {
        // treat origin placement as better placement, cause neither is fit
        ({ betterPlacement } = betterPlaceStyleInfo);
        betterPlaceStyleInfo = placeStyleInfo;
      }

      this.setState({ placement: betterPlacement });
    }

    if (placeStyleInfo.style) {
      this.setState({ style: betterPlaceStyleInfo.style });
    }
  };

  render() {
    const placement = this.state.placement.split('-');

    const {
      style, className, hasArrow, children, ...props
    } = this.props;

    const htmlKeys = keys<Props>();

    return (
      <StyledPopover
        {...omit(props, htmlKeys)}
        className={
          classNames(
            'popover',
            `bs-popover-${placement[0]}`,
            placement[1],
            className,
          )
        }
        style={{
          ...this.state.style,
          ...style,
        }}
        ref={(el) => { this.node = el; }}
      >
        <React.Fragment>
          {children}
          {hasArrow && (<div className="arrow" />)}
        </React.Fragment>
      </StyledPopover>
    );
  }
}

export default Popover;
