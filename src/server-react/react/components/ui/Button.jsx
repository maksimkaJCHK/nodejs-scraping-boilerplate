import React from 'react';
import './_button.scss';

const Button = (props) => {
  const { children, onClick, disabled } = props;

  return (
    <button
      disabled = { disabled }
      className = 'btn'
      onClick = { onClick }
    >
      { children }
    </button>
  )
}

export default Button;