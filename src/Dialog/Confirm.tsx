import * as React from 'react';
import Dialog, { DialogBody, DialogFooter, DialogProps } from './Dialog';
import Clickable from '../Clickable';

interface ConfirmProps extends DialogProps {
  okText?: string;
  cancelText?: string;
  onConfirm?: (Event) => void;
}

class Confirm extends React.PureComponent<ConfirmProps> {
  static defaultProps = {
    okText: '确定',
    cancelText: '取消',
    onConfirm: () => {},
  };

  render() {
    return (
      <Dialog {...this.props} onEnter={this.props.onConfirm}>
        <DialogBody>
          {this.props.children}
        </DialogBody>

        <DialogFooter>
          <Clickable onClick={this.props.onClose}>
            <div className="btn btn-sm btn-gray">
              {this.props.cancelText}
            </div>
          </Clickable>

          <Clickable onClick={this.props.onConfirm}>
            <div className="btn btn-sm btn-secondary">
              {this.props.okText}
            </div>
          </Clickable>
        </DialogFooter>
      </Dialog>
    );
  }
}

export default Confirm;
