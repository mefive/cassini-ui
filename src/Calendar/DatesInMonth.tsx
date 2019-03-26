import * as React from 'react';
import * as moment from 'moment';
import classNames from 'classnames';
import padStart from 'lodash-es/padStart';
import range from 'lodash-es/range';
import SvgAngleLeft from '../icons/solid/AngleLeft';
import SvgAngleRight from '../icons/solid/AngleRight';
import Calendar from './Calendar';
import Clickable from '../Clickable';
import { StyledCalendar, StyledSwitcher } from './styled';

const calendar = new Calendar();

export type DatesInMonthProps = {
  weekday?: (day: number) => JSX.Element;
  className?: string;
  value?: moment.Moment;
  onChange?: (date: moment.Moment) => void;
  max?: moment.Moment;
  min?: moment.Moment;
  disabledDate?: (date: moment.Moment) => boolean;
  width?: number | string;
};

const weekDaysTitle = [
  '日', '一', '二', '三', '四', '五', '六',
];

class DatesInMonth extends React.PureComponent<DatesInMonthProps> {
  static defaultProps = {
    weekday: day => <span>{weekDaysTitle[day]}</span>,
    value: null,
    max: null,
    min: null,
    onChange: () => {},
    disabledDate: () => false,
    width: '100%',
  };

  private readonly now: moment.Moment = moment();

  state = {
    year: this.now.year(),
    month: this.now.month(),
  };

  componentWillReceiveProps(nextProps: Readonly<DatesInMonthProps>): void {
    if (nextProps.value !== this.props.value) {
      this.setState({
        year: nextProps.value.year(),
        month: nextProps.value.month(),
      });
    }
  }

  get currentMonth(): moment.Moment {
    return moment().year(this.state.year).month(this.state.month);
  }

  get monthDates(): number[][] {
    return calendar.monthDays(this.state.year, this.state.month);
  }

  render() {
    const { currentMonth } = this;

    return (
      <StyledCalendar
        className={this.props.className}
        style={{ width: this.props.width }}
      >
        <StyledSwitcher>
          <Clickable
            onClick={() => {
              const month = currentMonth.clone();
              month.subtract(1, 'M');
              this.setState({
                year: month.year(),
                month: month.month(),
              });
            }}
          >
            <div className="switcher-action">
              <SvgAngleLeft style={{ width: 8, height: 16 }} />
            </div>
          </Clickable>

          <div className="switcher-year">
            {this.state.year}
            年
            {padStart(`${this.state.month + 1}`, 2, '0')}
            月
          </div>

          <Clickable
            onClick={() => {
              const month = currentMonth.clone();
              month.add(1, 'M');
              this.setState({
                year: month.year(),
                month: month.month(),
              });
            }}
          >
            <div className="switcher-action">
              <SvgAngleRight style={{ width: 8, height: 16 }} />
            </div>
          </Clickable>
        </StyledSwitcher>

        <table className="date-table">
          <thead>
            <tr>
              {range(7).map(day => (
                <td key={day}>
                  {this.props.weekday(day)}
                </td>
              ))}
            </tr>
          </thead>

          <tbody>
            {this.monthDates.map((week, rowIndex) => (
              <tr key={`${rowIndex + 1}`}>
                {week.map((date, colIndex) => {
                  const disabled = this.props.disabledDate(currentMonth);

                  return (
                    <Clickable
                      onClick={() => {
                        if (!disabled && date) {
                          this.props.onChange(currentMonth.date(date));
                        }
                      }}
                      key={`${colIndex + 1}`}
                    >
                      <td
                        className={classNames(
                          'date',
                          { disable: disabled || !date },
                          { enable: !disabled && date },
                          { current: currentMonth.clone().date(date).isSame(this.props.value, 'd') },
                        )}
                      >
                        {date || null}
                      </td>
                    </Clickable>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </StyledCalendar>
    );
  }
}

export default DatesInMonth;
