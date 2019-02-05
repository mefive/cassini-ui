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

const StyledModalContainer = styled.div`
  display: block;
  animation-duration: 0.3s;
`;

const StyledModalDialog = styled.div`
  left: 50%;
  top: 50%;
`;

interface ModalProps {
  title?: string,
  onClose?: (Event) => void,
  onEnter?: Function,
  visible?: boolean,
  width?: string | number,
  className?: string;
}

class Modal extends React.PureComponent<ModalProps, any> {
  static defaultProps = {
    title: null,
    onClose: null,
    onEnter: () => {},
    visible: false,
    width: 480,
  };

  private dialog: HTMLDivElement = null;

  private dialogHeader: HTMLDivElement = null;

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
          enterDuration={300}
          leaveClassName={Animation.FADE_OUT_HALF}
          leaveDuration={300}
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
          enterClassName="scale-in"
          enterDuration={300}
          leaveClassName="scale-out"
          leaveDuration={300}
        >
          {this.props.visible && (
            <Portal>
              <StyledModalContainer
                className={classNames(
                  'modal overflow-hidden',
                  this.props.className,
                )}
              >
                <StyledModalDialog
                  className="modal-dialog"
                  ref={(el) => { this.dialog = el; }}
                  style={{
                    marginLeft: this.state.marginLeft,
                    marginTop: this.state.marginTop,
                    minWidth: this.props.width,
                  }}
                >
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
                      style={{
                        maxHeight: this.state.bodyMaxHeight,
                        overflowY: 'auto',
                      }}
                    >
                      {this.props.children}
                    </div>
                  </div>
                </StyledModalDialog>
              </StyledModalContainer>
            </Portal>
          )}
        </Animate>
      </React.Fragment>
    );
  }
}

export default Modal;
