/* The component that is responsible for each log.
will contain the clock and the text field as inputs*/
import React from 'react';
import moment from 'moment';

import Clock from './clock';
import Text from './text';

import { DATE_FORMAT, HOUR_FORMAT } from '../constants/time';

const style = {
  display: 'inline-flex'
};

class Log extends React.Component {
  constructor(props) {
    super(props);

    // let endTime = props.time.end && moment(props.time.end).format(format);
    // let startTime = moment(props.time.start).format(format);
    // let endTime = props.time.end;
    // let startTime = props.time.start;

    let formattedTime = props.time;
    if (props.last || props.first) {
      formattedTime = moment().format(HOUR_FORMAT);
    }

    // if (props.first) {
    //   startTime = moment().format(format);
    // }

    this.state = {
      text: props.text,
      formattedTime,
      // endTime,
      // startTime,
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
    if (this.props.formattedTime !== prevProps.formattedTime) {
      // TODO: this is a case for just determining if a new log added.
      // clearer logic? also why is this not in the constructor?
      // I remember it has something to do with last/first props, but cannot
      // recall exactly what.
      const formattedTime = moment(this.props.time.start, HOUR_FORMAT).format(HOUR_FORMAT);
      console.log('formattedTime', formattedTime);
      this.setState({
        formattedTime,
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
      formattedTime: moment().format(HOUR_FORMAT)
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
    // const unix = moment(this.props.date).valueOf();
    // const startDate = `${this.props.date} ${this.state.startTime}`;
    // TODO: is adding seconds to a date that contains only minutes will screw this up?
    // const startUnix = moment(startDate, 'YYYY-MM-DD HH:mm:ss').valueOf();
    const date = `${this.props.date} ${this.state.formattedTime}`;
    const unix = moment(date, DATE_FORMAT).valueOf();


    this.props.onSaveClick({
      id: unix + this.state.text,
      text: this.state.text,
      formattedTime: this.state.formattedTime,
      unix,
      // time: {
      //   start: this.state.startTime,
      //   end: this.state.endTime,
      //   startUnix,
      //   endUnix
      // }
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
      userSetEndTime: true,
      [event.target.name]: event.target.value
    });
  }

  stopClock() {
    clearInterval(this.tickIntervalID);
  }

  startClock(event) {
    if (event && this.state.userSetEndTime) {
      return;
    }

    if (this.props.last) {
      this.tickIntervalID = setInterval(this.tick, 1000);
    }
  }

  render() {
    const { last, first } = this.props;
    return (
      <div style={ style }>
        <Clock
          onFocus={ this.stopClock }
          onBlur={ this.startClock }
          onChange={ this.updateClockTime }
          time={ this.state.formattedTime } />
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
