import * as React from 'react';
import { range } from 'lodash';
import Container from './Container';
import Clickable from '../src/Clickable';
import Dialog, { Alert, DialogBody, DialogFooter } from '../src/Dialog';

class TestDialog extends React.PureComponent {
  state = {
    showCustom: false,
    showAlert: false,
  };

  private closeCustom = () => this.setState({ showCustom: false });

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
      </Container>
    );
  }
}

export default TestDialog;
