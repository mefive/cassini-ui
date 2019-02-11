import * as React from 'react';
import classNames from 'classnames';

export enum NotificationType {
  TYPE_ERROR = 'error',
  TYPE_SUCCESS = 'success',
  TYPE_INFO = 'info',
  TYPE_PRIMARY = 'primary',
}

export type NotificationData = {
  message: string;
  type?: NotificationType;
  cb?: Function;
  id?: string;
};

export interface NotificationProps {
  wait?: number;
  cb?: () => void;
  className?: string;
  type: NotificationType;
  message: string;
}

class Notification extends React.PureComponent<NotificationProps> {
  static defaultProps = {
    wait: 3000,
    cb: () => {},
    type: NotificationType.TYPE_SUCCESS,
  };

  private timer:number = null;

  componentDidMount() {
    this.timer = window.setTimeout(
      () => this.props.cb(),
      this.props.wait,
    );
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  render() {
    return (
      <div
        className={classNames(
          'alert',
          { 'alert-success': this.props.type === NotificationType.TYPE_SUCCESS },
          { 'alert-danger': this.props.type === NotificationType.TYPE_ERROR },
          { 'alert-info': this.props.type === NotificationType.TYPE_INFO },
          { 'alert-primary': this.props.type === NotificationType.TYPE_PRIMARY },
          this.props.className,
        )}
      >
        {this.props.message}
      </div>
    );
  }
}

export default Notification;
