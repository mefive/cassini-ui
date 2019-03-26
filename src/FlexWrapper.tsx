import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';

const StyledFlexWrapper = styled.div`
  &.absolute {
    position: absolute;
    left: 0;
    right: 0;
  }
`;

interface FlexWrapperProps {
  bottom?: number;
  absolute?: boolean;
  minHeight?: number;
  isFixedHeight?: boolean;
}

class FlexWrapper extends React.PureComponent<FlexWrapperProps & React.HTMLAttributes<any>> {
  static defaultProps = {
    bottom: 0,
    absolute: false,
    isFixedHeight: true,
    minHeight: 0,
  };

  state = {
    absoluteTop: null,
  };

  private container: HTMLDivElement = null;

  componentDidMount() {
    this.resizeContainer();
    window.addEventListener('resize', this.resizeContainer);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeContainer);
  }

  resizeContainer = () => {
    if (this.container == null) {
      return;
    }

    if (this.props.absolute) {
      if (this.state.absoluteTop != null) {
        return;
      }

      this.setState({ absoluteTop: this.container.offsetTop });
      return;
    }

    const { top } = this.container.getBoundingClientRect();

    this.container.style[this.props.isFixedHeight ? 'height' : 'minHeight'] = `${
      Math.max(window.innerHeight - top - this.props.bottom, this.props.minHeight)
    }px`;
  };

  render() {
    return (
      <StyledFlexWrapper
        id={this.props.id}
        ref={(el) => { this.container = el; }}
        className={classNames(
          this.props.className,
          { 'position-relative': this.props.absolute },
          { absolute: this.props.absolute && this.state.absoluteTop != null },
        )}
        style={{
          ...this.props.style,
          top: this.state.absoluteTop,
          bottom: this.props.absolute ? this.props.bottom : null,
        }}
      >
        {this.props.children}
      </StyledFlexWrapper>
    );
  }
}

export default FlexWrapper;
