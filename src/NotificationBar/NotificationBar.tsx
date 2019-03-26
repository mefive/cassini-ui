import * as React from 'react';
import styled from 'styled-components';

import Animate, { Animation } from '../Animate';
import Notification, { NotificationData } from './Notification';
import Portal from '../Portal';

export interface NotificationBarProps {
  dataSource: NotificationData[];
  onRemove?: () => void;
  cb?: (index: number) => void;
}

const StyledNotificationBar = styled.div`
  position: fixed;
  z-index: 9999;
  top: 60px;
  width: 400px;
  left: 50%;
  margin-left: -200px;
`;

class NotificationBar extends React.PureComponent<NotificationBarProps> {
  static defaultProps = {
    dataSource: [],
    cb: () => {},
  };

  render() {
    return (
      <Portal>
        <StyledNotificationBar>
          <Animate
            enterClassName={Animation.SLIDE_DOWN_IN}
            enterDuration={300}
            leaveClassName={Animation.SLIDE_DOWN_OUT}
          >
            {this.props.dataSource.map((data, index) => (
              <Notification
                key={data.id}
                message={data.message}
                type={data.type}
                cb={() => this.props.cb(index)}
                isRawHtml={data.isRawHtml}
              />
            ))}
          </Animate>
        </StyledNotificationBar>
      </Portal>
    );
  }
}

export default NotificationBar;
