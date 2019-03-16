import React from 'react';

const Clock = ({ time, onChange, onFocus, onBlur }) => {
  return (
    <span>
      <input
        name="formattedTime"
        type="text"
        value={ time }
        onFocus={ onFocus }
        onBlur={ onBlur }
        onChange={ onChange } />
      {/* <input
        name="endTime"
        type="text"
        value={ end }
        onFocus={ onFocus }
        onBlur={ onBlur }
        onChange={ onChange } /> */}
    </span>
  );
};

export default Clock;
