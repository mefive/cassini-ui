import * as React from 'react';
import Calendar, { CalendarProps } from './Calendar';
import Trigger from './Trigger';
import { Animation } from './Animate';
import Popover, { Placement } from './Popover';
import CustomSelect from './CustomSelect';

interface DatePickerProps extends CalendarProps {
  formatter?: string;
  className?: string;
}

class DatePicker extends React.PureComponent<DatePickerProps, { active: boolean }> {
  static defaultProps = {
    formatter: 'YYYY-MM-DD',
  };

  state = {
    active: false,
  };

  render() {
    const {
      className, value, formatter, ...props
    } = this.props;

    return (
      <Trigger
        active={this.state.active}
        onActiveChange={active => this.setState({ active })}
        enterClassName={Animation.FADE_IN}
        leaveClassName={Animation.FADE_OUT}
        popover={() => (
          <Popover
            placement={Placement.BOTTOM}
            hasArrow={false}
            offset={5}
          >
            <Calendar
              {...props}
              onChange={(date) => {
                this.props.onChange(date);
                this.setState({ active: false });
              }}
            />
          </Popover>
        )}
      >
        <CustomSelect className={this.props.className}>
          {value ? value.format(formatter) : '请选择'}
        </CustomSelect>
      </Trigger>
    );
  }
}

export default DatePicker;
