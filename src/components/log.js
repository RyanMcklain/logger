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

    const format = 'HH:mm:ss';
    // let endTime = props.time.end && moment(props.time.end).format(format);
    // let startTime = moment(props.time.start).format(format);
    let endTime = props.time.end;
    let startTime = props.time.start;

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
      startTime,
      userSetEndTime: false
    };

    this.tick = this.tick.bind(this);
    this.setLog = this.setLog.bind(this);
    this.updateText = this.updateText.bind(this);
    this.updateClockTime = this.updateClockTime.bind(this);
    this.stopClock = this.stopClock.bind(this);
    this.startClock = this.startClock.bind(this);

    this.tickIntervalID = null;
  }

  componentDidMount() {
    this.startClock();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.time.start !== prevProps.time.start) {
      // TODO: this is a case for just determining if a new log added.
      // clearer logic? also why is this not in the constructor?
      // I remember it has something to do with last/first props, but cannot
      // recall exactly what.
      this.setState({
        startTime: moment(this.props.time.start, this.state.format).format(this.state.format),
        text: ''
      })
    }
  }

  componentWillUnmount() {
    // clearInterval(this.tickIntervalID);
    this.stopClock();
  }

  tick() {
    this.setState({
      endTime: moment().format(this.state.format)
    });
  }

  setLog() {
    /*
    startUnix - for easier calc of stuff. with just the start
    hour we have to combine unix to get the actual date.
    */

    /**
     * Will set in the parent component the text and time of the current
     * component.
     * @constructor
     * @const {number} unix - possible value: 1552422242000.
     * @const {string} startDate - possible value: "2019-03-15 07:32".
     * @const {string} endDate - possible value: "2019-03-15 07:32".
    */
    const unix = moment(this.props.date).valueOf();
    const startDate = `${this.props.date} ${this.state.startTime}`;
    // TODO: is adding seconds to a date that contains only minutes will screw this up?
    const startUnix = moment(startDate, 'YYYY-MM-DD HH:mm:ss').valueOf();
    const endDate = `${this.props.date} ${this.state.endTime}`;
    const endUnix = moment(endDate, 'YYYY-MM-DD HH:mm:ss').valueOf();


    this.props.onClick({
      id: startUnix + this.state.text,
      text: this.state.text,
      unix,
      time: {
        start: this.state.startTime,
        end: this.state.endTime,
        startUnix,
        endUnix
      }
    });
  }

  updateText(event) {
    this.setState({ text: event.target.value });
  }

  updateClockTime(event) {
    if (!event.target.name) {
      return;
    }

    this.setState({
      userSetEndTime: event.target.name === 'endTime',
      [event.target.name]: event.target.value
    });
  }

  stopClock() {
    clearInterval(this.tickIntervalID);
  }

  startClock(event) {
    if (event && event.target.name === 'endTime' && this.state.userSetEndTime) {
      return;
    }

    if (this.props.last) {
      this.tickIntervalID = setInterval(this.tick, 1000);
    }
  }

  render() {
    const { last, first } = this.props;
    console.log(this.state.text, this.state.startTime);
    return (
      <div style={ style }>
        <Clock
          onFocus={ this.stopClock }
          onBlur={ this.startClock }
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
