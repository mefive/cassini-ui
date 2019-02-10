import * as React from 'react';
import { pick } from 'lodash';
import { keys } from 'ts-transformer-keys';
import DatesInMonth, { DatesInMonthProps } from './DatesInMonth';
import MonthsInYear, { MonthsInYearProps } from './MonthsInYear';

export enum CalendarType {
  DATES_IN_MONTH = 'dates_in_month',
  MONTHS_IN_YEAR = 'months_in_year'
}

type AllProps = MonthsInYearProps & DatesInMonthProps;

export interface CalendarProps extends AllProps {
  type?: CalendarType;
}

const monthsInYearKeys = keys<MonthsInYearProps>();
const datesInMonthKeys = keys<DatesInMonthProps>();

class Calendar extends React.PureComponent<CalendarProps> {
  static defaultProps = {
    type: CalendarType.DATES_IN_MONTH,
  };

  render() {
    const { type } = this.props;

    console.log(datesInMonthKeys, monthsInYearKeys);

    if (type === CalendarType.DATES_IN_MONTH) {
      return <DatesInMonth {...pick(this.props, datesInMonthKeys)} />;
    }

    if (type === CalendarType.MONTHS_IN_YEAR) {
      return <MonthsInYear {...pick(this.props, monthsInYearKeys)} />;
    }

    return null;
  }
}

export default Calendar;
