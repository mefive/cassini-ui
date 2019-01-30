import * as React from 'react';
import * as ReactDOM from 'react-dom';

export interface PortalProps extends React.HTMLAttributes<JSX.Element> {
  getContainer?: () => HTMLElement;
  onContainerChange?: (HTMLElement) => void;
}

class Portal extends React.PureComponent<PortalProps> {
  static defaultProps = {
    getContainer: () => document.body,
    onContainerChange: () => {},
  };

  constructor(props) {
    super(props);

    const container: HTMLElement = props.getContainer();
    const wrapper = document.createElement('div');

    container.appendChild(wrapper);

    this.container = container;
    this.wrapper = wrapper;
  }

  componentDidMount() {
    this.props.onContainerChange(this.container);
  }

  componentWillUnmount() {
    this.wrapper.parentNode.removeChild(this.wrapper);
  }

  private readonly container: HTMLElement;

  private readonly wrapper: HTMLElement;

  render() {
    return ReactDOM.createPortal(this.props.children, this.wrapper);
  }
}

export default Portal;
