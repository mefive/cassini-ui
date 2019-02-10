import * as React from 'react';
import * as moment from 'moment';
import Container from './Container';
import Calendar, { CalendarType } from '../src/Calendar';

class TestCalendar extends React.PureComponent {
  state = {
    date: moment(),
  };

  render() {
    return (
      <Container title="Calendar">
        <div className="d-flex">
          <div className="flex-1 d-flex justify-content-center">
            <Calendar
              type={CalendarType.DATES_IN_MONTH}
              value={this.state.date}
              onChange={date => this.setState({ date })}
              width={250}
            />
          </div>

          <div className="flex-1 ml-2 d-flex justify-content-center">
            <Calendar
              type={CalendarType.MONTHS_IN_YEAR}
              value={this.state.date}
              onChange={date => this.setState({ date })}
              width={250}
            />
          </div>
        </div>
      </Container>
    );
  }
}

export default TestCalendar;
