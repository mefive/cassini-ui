import * as React from 'react';
import Dialog, { DialogBody, DialogFooter, DialogProps } from './Dialog';
import Clickable from '../Clickable';

interface AlertProps extends DialogProps {
  okText?: string;
}

class Alert extends React.PureComponent<AlertProps> {
  static defaultProps = {
    okText: 'Ok',
  };

  render() {
    return (
      <Dialog
        {...this.props}
      >
        <DialogBody>
          {this.props.children}
        </DialogBody>

        <DialogFooter>
          <Clickable onClick={this.props.onClose}>
            <div className="btn btn-sm btn-secondary">
              {this.props.okText}
            </div>
          </Clickable>
        </DialogFooter>
      </Dialog>
    );
  }
}

export default Alert;
