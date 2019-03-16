/* Will be responsible for taking all the data accumulated in logs, and
predict, give stats, and give hints about the fututre */
import React from 'react';
import moment from 'moment';
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


    const totalSeconds = this.props.logs
      .filter(({ unix }) => moment(this.props.currentDate).isSame(unix, 'day'))
      // TODO: this is not an accurate calc
      .reduce((acc, { unix }) => acc + unix, 0);

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
