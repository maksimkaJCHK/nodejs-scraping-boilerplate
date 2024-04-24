import React from 'react';

import './_input.scss';

const Input = ({ value, onChange }) => {
  return (
    <input
      type = "text"
      value = {value}
      className = "input"
      onChange = { onChange }
    />
  )
}

export default Input;