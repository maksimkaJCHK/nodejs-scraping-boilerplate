import React from 'react';
import './_button.scss';

const Button = (props) => {
  const { children, onClick } = props;

  return (
    <button
      onClick = { onClick }
      className = 'btn'
    >
      { children }
    </button>
  )
}

export default Button;