import * as React from 'react';
import * as moment from 'moment';
import classNames from 'classnames';
import range from 'lodash-es/range';
import Clickable from '../Clickable';
import SvgAngleLeft from '../icons/solid/AngleLeft';
import SvgAngleRight from '../icons/solid/AngleRight';
import { StyledCalendar, StyledSwitcher } from './styled';
import Grid, { Col, Row } from '../Grid';

export type MonthsInYearProps = {
  className?: string;
  value?: moment.Moment;
  onChange?: (date: moment.Moment) => void;
  max?: moment.Moment;
  min?: moment.Moment;
  disabledDate?: (date: moment.Moment) => boolean;
  width?: number | string;
  month?: (month: number) => JSX.Element;
};

const monthTitle = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月',
];

class MonthsInYear extends React.PureComponent<MonthsInYearProps> {
  static defaultProps = {
    value: moment(),
    month: month => <span>{monthTitle[month]}</span>,
    disabledDate: () => false,
  };

  state = {
    year: this.props.value.year(),
  };

  componentWillReceiveProps(nextProps: Readonly<MonthsInYearProps>): void {
    if (nextProps.value !== this.props.value) {
      this.setState({ year: nextProps.value.year() });
    }
  }

  render() {
    const { year } = this.state;

    return (
      <StyledCalendar style={{ width: this.props.width }}>
        <StyledSwitcher>
          <Clickable
            onClick={() => this.setState({
              year: moment(`${year}`).subtract(1, 'year').year(),
            })}
          >
            <div className="switcher-action">
              <SvgAngleLeft style={{ width: 8 }} />
            </div>
          </Clickable>

          <div className="switcher-year">
            {year}
          </div>

          <Clickable
            onClick={() => this.setState({
              year: moment(`${year}`).add(1, 'year').year(),
            })}
          >
            <div className="switcher-action">
              <SvgAngleRight style={{ width: 8 }} />
            </div>
          </Clickable>
        </StyledSwitcher>

        <Grid className="month-panel">
          <Row>
            {range(12).map((month) => {
              const date = moment(`${year}`).month(month);
              const disabled = this.props.disabledDate(date);
              const current = date.isSame(this.props.value, 'month');

              return (
                <Col key={month} span={4}>
                  <Clickable
                    onClick={() => {
                      if (!current) {
                        this.props.onChange(date);
                      }
                    }}
                  >
                    <div
                      className={classNames(
                        'month',
                        { enable: !disabled },
                        { current },
                      )}
                    >
                      {this.props.month(month)}
                    </div>
                  </Clickable>
                </Col>
              );
            })}
          </Row>
        </Grid>
      </StyledCalendar>
    );
  }
}

export default MonthsInYear;
