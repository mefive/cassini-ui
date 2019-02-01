import * as React from 'react';
import * as ReactDOM from 'react-dom';
import classNames from 'classnames';

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
    return ReactDOM.createPortal((
      <React.Fragment>
        {React.Children.map(this.props.children, (child: JSX.Element) => React.cloneElement(
          child,
          {
            className: classNames(this.props.className, child.props.className),
          },
        ))}
      </React.Fragment>
    ), this.wrapper);
  }
}

export default Portal;
