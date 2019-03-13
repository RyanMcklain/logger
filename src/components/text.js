import React from 'react';

const style = {
  width: '60vw',
  margin: '10px'
};

const Text = ({ text, onChange }) => {
  return (
    <textarea
      maxLength="140"
      style={ style }
      value={ text }
      onChange={ onChange } />
  )
};

export default Text;
