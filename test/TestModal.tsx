import * as React from 'react';
import range from 'lodash-es/range';
import Container from './Container';
import Modal from '../src/Modal';
import Clickable from '../src/Clickable';

class TestModal extends React.PureComponent {
  state = {
    show: false,
  };

  render() {
    return (
      <Container title="Modal">
        <div>
          <Clickable onClick={() => this.setState({ show: true })}>
            <div className="btn btn-primary">
              Modal
            </div>
          </Clickable>
        </div>
        <Modal
          visible={this.state.show}
          onClose={() => this.setState({ show: false })}
          title="Test Modal"
        >
          <div>
            <div className="modal-body">
              {range(50).map(index => (
                <div key={`${index}`}>Modal body</div>
              ))}
            </div>
            <div className="modal-footer">
              <Clickable onClick={() => this.setState({ show: false })}>
                <div className="btn btn-primary">确定</div>
              </Clickable>
            </div>
          </div>
        </Modal>
      </Container>
    );
  }
}

export default TestModal;
