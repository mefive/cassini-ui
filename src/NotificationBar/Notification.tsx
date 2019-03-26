import * as React from 'react';
import classNames from 'classnames';

export enum NotificationType {
  TYPE_ERROR = 'error',
  TYPE_SUCCESS = 'success',
  TYPE_INFO = 'info',
  TYPE_PRIMARY = 'primary',
}

export interface NotificationData {
  message: string;
  type?: NotificationType;
  cb?: Function;
  id?: string;
  isRawHtml?: boolean;
}

export interface NotificationProps extends NotificationData {
  wait?: number;
  className?: string;
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
    const {
      type, message, isRawHtml, className,
    } = this.props;

    return (
      <div
        className={classNames(
          'alert',
          { 'alert-success': type === NotificationType.TYPE_SUCCESS },
          { 'alert-danger': type === NotificationType.TYPE_ERROR },
          { 'alert-info': type === NotificationType.TYPE_INFO },
          { 'alert-primary': type === NotificationType.TYPE_PRIMARY },
          className,
        )}
        dangerouslySetInnerHTML={isRawHtml ? { __html: message } : null}
      >
        {isRawHtml ? null : message}
      </div>
    );
  }
}

export default Notification;
