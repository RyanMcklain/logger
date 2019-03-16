import React from 'react';
import moment from 'moment';
import { DATE_FORMAT } from '../constants/time';

const style = {
  fontSize: '10vw'
};

const Date = ({ date, onChange, onMessageClick }) => {
  let message = ''
  if (moment(date, DATE_FORMAT).isAfter(moment(), 'days')) {
    message = 'are you seeing into the future?';
  }

  if (moment(date, DATE_FORMAT).isBefore(moment(), 'days')) {
    message = 'The past is already gone. Forget about it. Focus on this day. Live it.';
  }

  return (
    <div>
      <input
        type="date"
        style={ style }
        value={ date }
        onChange={ onChange } />
      <div onClick={ onMessageClick }>{ message }</div>
    </div>
  );
};

Date.defaultProps = {
  date: moment().format(DATE_FORMAT)
};

export default Date;
