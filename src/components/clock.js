import React from 'react';

const Clock = ({ start, end, onChange, onFocus, onBlur }) => {
  return (
    <span>
      <input
        name="startTime"
        type="text"
        value={ start }
        onFocus={ onFocus }
        onBlur={ onBlur }
        onChange={ onChange } />-
      <input
        name="endTime"
        type="text"
        value={ end }
        onFocus={ onFocus }
        onBlur={ onBlur }
        onChange={ onChange } />
    </span>
  );
};

export default Clock;
