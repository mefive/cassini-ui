import * as React from 'react';
import range from 'lodash-es/range';
import Container from './Container';
import Clickable from '../src/Clickable';
import Dialog, {
  Alert, Confirm, DialogBody, DialogFooter,
} from '../src/Dialog';

class TestDialog extends React.PureComponent {
  state = {
    showCustom: false,
    showAlert: false,
    showConfirm: false,
  };

  private closeCustom = () => this.setState({ showCustom: false });

  private closeConfirm = () => this.setState({ showConfirm: false });

  render() {
    return (
      <Container title="Dialog">
        <div className="d-flex">
          <Clickable onClick={() => this.setState({ showCustom: true })}>
            <div className="btn btn-primary">
              Custom
            </div>
          </Clickable>

          <Clickable onClick={() => this.setState({ showAlert: true })}>
            <div className="btn btn-danger ml-1">
              Alert
            </div>
          </Clickable>

          <Clickable onClick={() => this.setState({ showConfirm: true })}>
            <div className="btn btn-success ml-1">
              Confirm
            </div>
          </Clickable>
        </div>

        <Dialog
          visible={this.state.showCustom}
          onClose={this.closeCustom}
          title="Custom"
        >
          <DialogBody>
            {range(50).map(index => (
              <div key={`${index}`}>{index}</div>
            ))}
          </DialogBody>

          <DialogFooter>
            <Clickable onClick={this.closeCustom}>
              <div className="btn btn-white">取消</div>
            </Clickable>

            <Clickable onClick={this.closeCustom}>
              <div className="btn btn-primary ml-1">确定</div>
            </Clickable>
          </DialogFooter>
        </Dialog>

        <Alert
          title="Alert"
          visible={this.state.showAlert}
          onClose={() => this.setState({ showAlert: false })}
        >
          Damn, that is it.
        </Alert>

        <Confirm
          visible={this.state.showConfirm}
          onClose={this.closeConfirm}
          onConfirm={this.closeConfirm}
        >
          Are you really sure about what you are doing?
        </Confirm>
      </Container>
    );
  }
}

export default TestDialog;
