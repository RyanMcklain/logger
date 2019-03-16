import React from 'react';
import moment from 'moment';

const style = {
  fontSize: '10vw'
};

const Date = ({ date, onChange, onMessageClick }) => {
  let message = ''
  if (moment(date, 'YYYY-MM-DD').isAfter(moment(), 'days')) {
    message = 'are you seeing into the future?';
  }

  if (moment(date, 'YYYY-MM-DD').isBefore(moment(), 'days')) {
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
  date: moment().format('YYYY-MM-DD')
};

export default Date;
