import * as React from 'react';
import Popover, { Placement } from '../src/Popover';
import Trigger from '../src/Trigger';
import Container from './Container';

interface Props {
  name?: string,
}

function popover() {
  return (
    <Popover
      placement={Placement.BOTTOM}
      className="p-3"
    >
      <span>
        Damn, I am in a Popover
      </span>
    </Popover>
  );
}

class TestTrigger extends React.PureComponent<Props> {
  static defaultProps = {
    name: 'mefive',
  };

  state = {
    age: 32,
  };

  private popover = React.createRef<Popover>();

  componentDidMount(): void {
    console.log(this.popover.current);
  }

  render() {
    return (
      <Container title="Trigger">
        <div className="d-flex justify-content-center">
          <Trigger
            action={Trigger.Action.CLICK}
            popover={popover}
            enterClassName="fade-in"
            leaveClassName="fade-out"
          >
            <div className="btn btn-lg btn-primary">Click</div>
          </Trigger>

          <Trigger
            action={Trigger.Action.HOVER_HOLD}
            popover={popover}
            enterClassName="slide-down-in"
            leaveClassName="fade-down-out"
            leaveDelay={300}
          >
            <div className="btn btn-lg btn-primary ml-2">Hover Hold</div>
          </Trigger>
        </div>
      </Container>
    );
  }
}

export default TestTrigger;
