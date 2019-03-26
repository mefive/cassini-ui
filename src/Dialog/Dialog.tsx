import * as React from 'react';
import styled from 'styled-components';
import Modal, { ModalProps, StyledModalDialog } from '../Modal';

export interface DialogProps extends ModalProps {}

export function DialogBody(props: JSX.ElementChildrenAttribute) {
  return (
    <div className="modal-body">
      {props.children}
    </div>
  );
}

export function DialogFooter(props: JSX.ElementChildrenAttribute) {
  return (
    <div>
      <div className="modal-footer">
        {props.children}
      </div>
    </div>
  );
}

export const StyledDialog = styled(StyledModalDialog)`
  .modal-body-wrapper {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  
  .modal-body {
    min-height: calc(10vh);
    flex: 1;
    overflow-y: auto;
  } 
`;

class Dialog extends React.PureComponent<DialogProps> {
  public modal: Modal = null;

  render() {
    const { children, ...props } = this.props;
    return (
      <Modal
        {...props}
        dialog={<StyledDialog />}
        ref={(el) => { this.modal = el; }}
      >
        {React.Children.map(children, (child: React.FunctionComponentElement<any>) => {
          if (child && (child.type === DialogBody || child.type === DialogFooter)) {
            return child;
          }

          return null;
        })}
      </Modal>
    );
  }
}

export default Dialog;
