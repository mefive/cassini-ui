import * as React from 'react';
import classNames from 'classnames';
import styled from 'styled-components';
import Clickable from '../Clickable';

const StyledSwitch = styled.div`
  width: 44px;
  height: 24px;
  line-height: 24px;
  padding-left: 5px;
  padding-right: 5px;
  position: relative;
  border-radius: 12px;
  background: #BFBFBF;
  color: ${({ theme }) => theme.white};
  text-align: right;
  user-select: none;

  &.checked {
    background: ${({ theme }) => theme.primary};
    text-align: left;
  }

  &.ready {
    transition: background-color .2s;

    .switch-ball {
      transition: left .2s;
    }
  }
  
  .switch-ball {
    position: absolute;
    height: 20px;
    width: 20px;
    top: 2px;
    border-radius: 10px;
    background: ${({ theme }) => theme.white};
  }
`;

type Value = boolean;

interface Props {
  value?: Value;
  onChange?: (Value) => void;
  trueText?: string;
  falseText?: string;
  width?: number;
}

class Switch extends React.PureComponent<Props & React.AllHTMLAttributes<any>> {
  static defaultProps = {
    value: null,
    onChange: () => {},
    trueText: null,
    falseText: null,
    width: null,
    disabled: false,
  };

  state = {
    width: 0,
    ready: false,
  };

  private node:HTMLDivElement = null;

  componentDidMount() {
    this.setWidth();
  }

  setWidth() {
    this.setState({
      width: this.node.clientWidth,
    }, () => setTimeout(() => this.setState({ ready: true })));
  }

  render() {
    const {
      value, width, trueText, falseText,
    } = this.props;

    return (
      <Clickable
        onClick={() => {
          if (this.props.disabled) {
            return;
          }

          this.props.onChange(!value);
        }}
      >
        <StyledSwitch
          className={classNames(
            this.props.className,
            'switch',
            { ready: this.state.ready },
            { checked: value },
          )}
          style={{ width, cursor: this.props.disabled ? 'not-allowed' : null }}
          ref={(el) => { this.node = el; }}
        >
          <div
            className="switch-ball"
            style={{
              left: value ? this.state.width - 2 - 20 : 2,
            }}
          />

          <span className="switch-text">
            {value ? trueText : falseText}
          </span>
        </StyledSwitch>
      </Clickable>
    );
  }
}

export default Switch;
