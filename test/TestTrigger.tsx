import * as React from 'react';
import Popover, { Placement } from '../src/Popover';
import Trigger from '../src/Trigger';
import Container from './Container';

interface Props {
  name?: string,
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
        <div className="text-center">
          <Trigger
            action={Trigger.Action.CLICK}
            popover={() => (
              <Popover
                placement={Placement.BOTTOM_RIGHT}
                className="p-3"
              >
                <span>
                  Damn, I am in a Popover
                </span>
              </Popover>
            )}
            enterClassName="fade-in"
            leaveClassName="fade-out"
          >
            <div className="btn btn-lg btn-primary">Click</div>
          </Trigger>
        </div>
      </Container>
    );
  }
}

export default TestTrigger;
