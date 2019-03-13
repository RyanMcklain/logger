/* The component that is responsible for each log.
will contain the clock and the text field as inputs*/
import React from 'react';
import moment from 'moment';

import Clock from './clock';
import Text from './text';

const style = {
  display: 'inline-flex'
};

class Log extends React.Component {
  constructor(props) {
    super(props);

    const format = 'HH:mm';
    let endTime = props.time.end && moment(props.time.end).format(format);
    let startTime = moment(props.time.start).format(format);

    if (props.last) {
      endTime = moment().format(format);
    }

    if (props.first) {
      startTime = moment().format(format);
    }

    this.state = {
      format,
      text: props.text,
      endTime,
      startTime
    };

    this.tick = this.tick.bind(this);
    this.setLog = this.setLog.bind(this);
    this.updateText = this.updateText.bind(this);

    this.tickIntervalID = null;
  }

  componentDidMount() {
    if (this.props.last) {
      this.tickIntervalID = setInterval(this.tick, 1000);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.time.start !== prevProps.time.start) {
      // this is a case for just determining if a new log added. More
      // clear logic?
      this.setState({
        startTime: moment(this.props.time.start).format(this.state.format)
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.tickIntervalID);
  }

  tick() {
    this.setState({
      endTime: moment().format(this.state.format)
    });
  }

  setLog() {
    this.props.onClick({
      text: this.state.text,
      time: {
        start: moment(this.state.startTime, this.state.format).valueOf(),
        end: moment(this.state.endTime, this.state.format).valueOf()
      }
    });
  }

  updateText(event) {
    this.setState({ text: event.target.value });
  }

  updateClockTime(event) {
    this.setState({
      endTime: event.target.value,
      startTime: event.target.value
    });
  }

  render() {
    const { last, first } = this.props;
    return (
      <div style={ style }>
        <Clock
          onChange={ this.updateClockTime }
          start={ this.state.startTime }
          end={ this.state.endTime } />
        <Text
          text={ this.state.text }
          onChange={ this.updateText } />
        { (last || first) &&
          <input type="button" value="SET" onClick={ this.setLog } /> }
      </div>
    );
  }
}

Log.defaultProps = {
  time: {
    start: moment().format('HH:mm'),
    end: null
  }
}

export default Log;
