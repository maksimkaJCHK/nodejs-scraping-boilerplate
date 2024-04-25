import React, { forwardRef }  from 'react';

import './_input.scss';

const Input = forwardRef(({ value, onChange }, ref) => {
  return (
    <input
      type = "text"
      value = { value }
      className = "input"
      ref = { ref } 
      onChange = { onChange }
    />
  )
});

export default Input;