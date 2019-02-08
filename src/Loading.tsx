import * as React from 'react';
import styled from 'styled-components';

interface LoadingProps extends React.HTMLAttributes<any> {
  vertical?: boolean;
  horizontal?: boolean;
}

const StyledLoading = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  .message {
    position: absolute;
    left: 50%;
    top: 50%;
  }
`;

class Loading extends React.PureComponent<LoadingProps> {
  static defaultProps = {
    vertical: true,
    horizontal: true,
  };

  private message: HTMLDivElement = null;

  componentDidMount() {
    this.pin();
  }

  componentDidUpdate(preProps) {
    if (preProps.children !== this.props.children) {
      this.pin();
    }
  }

  pin() {
    const { message } = this;
    const { clientWidth, clientHeight } = message;

    if (this.props.horizontal) {
      message.style.marginLeft = `${-(0.5 * clientWidth)}px`;
    }

    if (this.props.vertical) {
      message.style.marginTop = `${-(0.5 * clientHeight)}px`;
    }
  }

  render() {
    return (
      <StyledLoading className={this.props.className}>
        <div
          ref={(el) => { this.message = el; }}
          className="message d-inline-block"
        >
          {this.props.children}
        </div>
      </StyledLoading>
    );
  }
}

export default Loading;
