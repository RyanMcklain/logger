/* Will be responsible for taking all the data accumulated in logs, and
predict, give stats, and give hints about the fututre */
import React from 'react';
import moment from 'moment';

class Manipura extends React.Component {
  constructor(props) {
    super(props);

    // const totalSeconds = ;

    // this.state = {
    //   totalTime: moment(totalSeconds).format('HH:mm')
    // }
  }

  componentDidUpdate() {
    console.log('manipura updated!');
  }

  render() {
    if (this.props.logs.length === 0) {
      return null;
    }

    const totalSeconds = this.props.logs
      .map(log => log.time.end - log.time.start)
      .reduce((acc, curr) => acc + curr);
    return (
      <div>
        total: { moment(totalSeconds).format('HH:mm') }
      </div>
    );
  }
}

Manipura.defaultProps = {
  logs: []
};

export default Manipura;
