import * as React from 'react';
import * as keycode from 'keycode';
import classNames from 'classnames';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { addClass, removeClass } from 'dom-helpers/class';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import Portal from './Portal';
import Animate, { Animation } from './Animate';
import Clickable from './Clickable';

export const StyledModalContainer = styled.div`
  display: block;
  animation-duration: 0.3s;
`;

export const StyledModalDialog = styled.div`
  left: 50%;
  top: 50%;
`;

export interface ModalProps {
  title?: string,
  onClose?: (Event) => void,
  onEnter?: Function,
  visible?: boolean,
  width?: string | number,
  className?: string;
  dialog?: JSX.Element;
}

class Modal extends React.PureComponent<ModalProps, any> {
  static defaultProps = {
    title: null,
    onClose: null,
    onEnter: () => {},
    visible: false,
    width: 480,
    dialog: <StyledModalDialog />,
  };

  private dialog: HTMLDivElement = null;

  private dialogHeader: HTMLDivElement = null;

  public dialogWrapper: HTMLDivElement = null;

  public resize = debounce(() => {
    const { dialogHeader } = this;

    this.setState({
      bodyMaxHeight:
        window.innerHeight - (dialogHeader == null ? 0 : dialogHeader.offsetHeight) - 2,
    }, this.pin);
  });

  state = {
    marginLeft: 0,
    marginTop: 0,
    bodyMaxHeight: window.innerHeight,
  };

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible && !this.props.visible) {
      window.blur();
      document.addEventListener('keydown', this.onKeyPress);
    } else if (!nextProps.visible && this.props.visible) {
      document.removeEventListener('keydown', this.onKeyPress);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.visible && this.props.visible) {
      this.resize();
      addClass(document.body, 'modal-open');
    } else if (prevProps.visible && !this.props.visible) {
      removeClass(document.body, 'modal-open');
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
    document.removeEventListener('keydown', this.onKeyPress);
  }


  onKeyPress = (e) => {
    const code = keycode(e);

    if (code === 'esc') {
      e.preventDefault();
      this.props.onClose(e);
    } else if (code === 'enter') {
      this.props.onEnter();
    }
  };


  public pin = () => {
    if (this.props.visible) {
      const { dialog } = this;

      if (dialog) {
        this.setState({
          marginLeft: -0.5 * dialog.offsetWidth,
          marginTop: -0.5 * dialog.offsetHeight,
        });
      }
    }
  };

  render() {
    return (
      <React.Fragment>
        <Animate
          enterClassName={Animation.FADE_IN_HALF}
          enterDuration={200}
          leaveClassName={Animation.FADE_OUT_HALF}
          leaveDuration={200}
        >
          {this.props.visible && (
            <Portal>
              <StyledModalContainer
                className="modal-backdrop show"
              />
            </Portal>
          )}
        </Animate>

        <Animate
          enterClassName={Animation.SCALE_IN}
          enterDuration={200}
          leaveClassName={Animation.SCALE_OUT}
          leaveDuration={200}
        >
          {this.props.visible && (
            <Portal>
              <StyledModalContainer
                className={classNames(
                  'modal overflow-hidden',
                  this.props.className,
                )}
              >
                {React.cloneElement(this.props.dialog, {
                  className: 'modal-dialog',
                  ref: (el) => { this.dialog = el; },
                  style: {
                    marginLeft: this.state.marginLeft,
                    marginTop: this.state.marginTop,
                    minWidth: this.props.width,
                  },
                }, (
                  <div className="modal-content">
                    <div className="modal-header" ref={(el) => { this.dialogHeader = el; }}>
                      <h5 className="modal-title">{this.props.title}</h5>
                      {this.props.onClose != null && (
                        <Clickable onClick={this.props.onClose}>
                          <div className="close">
                            <FontAwesomeIcon icon={faTimes} />
                          </div>
                        </Clickable>
                      )}
                    </div>

                    <div
                      className="modal-body-wrapper"
                      style={{
                        maxHeight: this.state.bodyMaxHeight,
                        overflowY: 'auto',
                      }}
                      ref={(el) => { this.dialogWrapper = el; }}
                    >
                      {this.props.children}
                    </div>
                  </div>
                ))}
              </StyledModalContainer>
            </Portal>
          )}
        </Animate>
      </React.Fragment>
    );
  }
}

export default Modal;
