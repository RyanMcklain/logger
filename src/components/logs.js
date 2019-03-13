/* the logic component. Will be responsible for
calculating all the shit your human mind is too slow to process */

import React, { Fragment } from 'react';

import Log from './log';
import Manipura from './manipura';

const fooTime = 1552422242000;
const fooLogs = [
  {
    id: 1,
    text: 'foo',
    time: {
      start: fooTime,
      end: fooTime + ((1 / 4) * 60 * 60 * 1000)
    }
  },
  {
    id: 2,
    text: 'foo',
    time: {
      start: fooTime + ((1 / 4) * 60 * 60 * 1000),
      end: fooTime + ((1 / 3) * 60 * 60 * 1000)
    }
  }
];

class Logs extends React.Component {
  constructor() {
    super();
    this.state = {
      logs: localStorage.getItem('logs') || []
    }

    this.logsUI = this.logsUI.bind(this);
    this.setLog = this.setLog.bind(this);
  }

  setLog(logData) {
    this.setState({
      logs: this.state.logs.concat(logData)
    });
  }

  logsUI() {
    if (this.state.logs.length === 0) {
      return (
        <Log key="firstLog" onClick={ this.setLog } first last />
      )
    }

    const lastTime = this.state.logs[this.state.logs.length - 1].time.end;
    const nextTime = {
      start: lastTime,
      end: null
    }
    return this.state.logs
      .map(log => (<Log key={ log.id } text={ log.text } time={ log.time } />))
      .concat(<Log key="lastLog" onClick={ this.setLog } time={ nextTime } last />);
  }

  render() {
    return (
      <Fragment>
        { this.logsUI() }
        <Manipura logs={ this.state.logs } />
      </Fragment>
    )
  }
}

export default Logs;
