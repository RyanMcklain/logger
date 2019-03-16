import React from 'react';
import moment from 'moment';

const style = {
  fontSize: '10vw'
};

const Date = ({ date, onChange }) => {
  let message = ''
  if (moment(date, 'YYYY-MM-DD').isAfter(moment(), 'days')) {
    message = 'are you seeing into the future?';
  }

  if (moment(date, 'YYYY-MM-DD').isBefore(moment(), 'days')) {
    message = 'you cannot change the past.';
  }

  return (
    <div>
      <input
        type="date"
        style={ style }
        value={ date }
        onChange={ onChange } />
      <div>{ message }</div>
    </div>
  );
};

Date.defaultProps = {
  date: moment().format('YYYY-MM-DD')
};

export default Date;
