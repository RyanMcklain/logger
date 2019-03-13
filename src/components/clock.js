import React from 'react';

const Clock = ({ start, end, onChange }) => {
  return (
    <span>
      <input name="startTime" type="text" value={ start } onChange={ onChange } />-
      <input name="endTime" type="text" value={ end } onChange={ onChange } />
    </span>
  );
};

export default Clock;
