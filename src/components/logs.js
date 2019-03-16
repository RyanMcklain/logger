/* the logic component. Will be responsible for
calculating all the shit your human mind is too slow to process */

import React, { Fragment } from 'react';
import moment from 'moment';

import Log from './log';
import Manipura from './manipura';
import Date from './date';

const fooTime = 1552422242000;
// const fooLogs = [
//   {
//     id: 1,
//     text: 'foo',
//     unix: fooTime,
//     time: {
//       start: moment(fooTime).format('HH:mm'),
//       startUnix: fooTime,
//       end: moment(fooTime).add(1, 'hour').format('HH:mm'),
//       endUnix: moment(fooTime).add(1, 'hour').valueOf()
//     }
//   },
//   {
//     id: 2,
//     text: 'foolord',
//     unix: fooTime,
//     time: {
//       start: moment(fooTime).add(1, 'hour').format('HH:mm'),
//       startUnix: moment(fooTime).add(1, 'hour').valueOf(),
//       end: moment(fooTime).add(0.5, 'hour').format('HH:mm'),
//       endUnix: moment(fooTime).add(0.5, 'hour').valueOf()
//     }
//   }
// ];

const fooLogs = [
  {
    id: 1,
    text: 'foo',
    unix: fooTime,
    formattedTime: moment(fooTime).add(1, 'hour').format('HH:mm')
  },
  {
    id: 2,
    text: 'foolord',
    unix: fooTime,
    formattedTime: moment(fooTime).add(0.5, 'hour').format('HH:mm')
  }
];

class Logs extends React.Component {
  constructor() {
    super();
    this.state = {
      date: moment().format('YYYY-MM-DD'), // '2019-03-14',
      logs: fooLogs || localStorage.getItem('logs') || []
    }

    this.logsUI = this.logsUI.bind(this);
    this.setLog = this.setLog.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.focusOnToday = this.focusOnToday.bind(this);
  }

  setLog(logData) {
    this.setState({
      logs: this.state.logs.concat(logData)
    });
  }

  logsUI() {
    const logs = this.state.logs.filter(log => (
      moment(log.unix).isSame(moment(this.state.date), 'day')
    ));

    const firstLog = (
      <Log
        key="firstLog"
        onClick={ this.setLog }
        date={ this.state.date }
        first
        last />
    );

    if (logs.length === 0) {
      return moment(this.state.date).isSame(moment(), 'day') ? firstLog : null;
    }

    const ordinaryLog = log => (
      <Log
        key={ log.id }
        text={ log.text }
        date={ this.state.date }
        time={ log.formattedTime } />
    );

    const lastLog = (
      <Log
        key="lastLog"
        onClick={ this.setLog }
        date={ this.state.date }
        time={ logs[logs.length - 1].formattedTime }
        last />
    );

    if (moment(this.state.date).isBefore(moment(), 'day')) {
      return logs.map(ordinaryLog);
    }

    return logs.map(ordinaryLog).concat(lastLog);
  }

  changeDate(event) {
    this.setState({
      date: event.target.value
    });
  }

  focusOnToday() {
    this.setState({
      date: moment().format('YYYY-MM-DD')
    });
  }

  render() {
    return (
      <Fragment>
        <Date
          onChange={ this.changeDate }
          onMessageClick={ this.focusOnToday }
          date={ this.state.date } />
        { this.logsUI() }
        <Manipura
          logs={ this.state.logs }
          dateFormat="YYYY-MM-DD HH:mm:ss"
          currentDate={ this.state.date } />
      </Fragment>
    )
  }
}

export default Logs;
