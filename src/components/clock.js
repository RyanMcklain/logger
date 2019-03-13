import React from 'react';

const Clock = ({ start, end, onChange }) => {
  return (
    <span>
      <input type="text" value={ start } onChange={ onChange } />-
      <input type="text" value={ end } onChange={ onChange } />
    </span>
  );
};

export default Clock;
