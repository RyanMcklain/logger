/* Will be responsible for taking all the data accumulated in logs, and
predict, give stats, and give hints about the fututre */
import React from 'react';
import moment from 'moment';

import { HOUR_FORMAT } from '../constants/time';

window.moment = moment;

const convertSecondsToHoursString = seconds => {
  if (seconds < 60) {
    return `${seconds} seconds`;
  }

  const minutes = parseInt(seconds / 60, 10);
  const remainSeconds = parseInt(seconds % 60, 10);
  if (minutes < 60) {
    return `${minutes} minutes ${remainSeconds} seconds`;
  }

  const hours = parseInt(seconds / 60 / 60, 10);
  const remainMinutes = parseInt(seconds / 60 % 60, 10);
  return `${hours} hours ${remainMinutes} minutes`;
}
class Manipura extends React.Component {
  constructor() {
    super();

    this.state = {
      feelings: ['😐', '😀', '🤩', '😍', '🙂', '☹️', '😕', '🙁', '😢']
    }
  }
  render() {
    if (this.props.logs.length === 0) {
      return null;
    }


    let foo = 0;
    const totalSeconds = this.props.logs
      .filter(log => {
        console.log(log.formattedTime);
        return moment(this.props.currentDate).isSame(log.unix, 'day')
      })
      // TODO: this is not an accurate calc
      .reduce((accumulator, log) => {
        if (!accumulator) {
          return moment(log.formattedTime, HOUR_FORMAT).valueOf();
        }

        return moment(log.formattedTime, HOUR_FORMAT).valueOf() - accumulator;
      }, 0);

    console.log('TOTAL', totalSeconds);
    let totalTimeString = totalSeconds === 0
      ? null
      : `total: ${convertSecondsToHoursString(totalSeconds / 1000)}`;

    return (
      <div>
        { totalTimeString }
        <div>
          how do you feel today?
          <div>{ this.state.feelings }</div>
          why? (will only be presented after choosing the feeling)
          <input type="text" />
        </div>
      </div>
    );
  }
}

Manipura.defaultProps = {
  logs: []
};

export default Manipura;
