import React from 'react';
import './Input.css';

const Label = ({ children, htmlFor, required, ...props }) => (
  <label htmlFor={htmlFor} className="label">{children} {required ? '*' : null}</label>
);

const Container = ({ children, label, id, value, required, ...props }) => {
  console.log('container', props)
  return(
    <div className="input-container">
      <Label htmlFor={id} required={required}>{label}</Label>
        {children({
          id,
          value: value || '',          
          ...props
        })}
    </div>
  )
}

export default Container;