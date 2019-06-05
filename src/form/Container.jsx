import React from 'react';
import './Input.css';

const Label = ({ children, htmlFor, required, ...props }) => (
  <label htmlFor={htmlFor} className="label">{children} {required ? '*' : null}</label>
);

const Container = ({ children, label, id, error, info, required, ...props }) => {
 
  return(
    <div className="input-container">
      <Label htmlFor={id} required={required}>{label}</Label>
        {children({
          id,      
          ...props
        })}
        <div className="footer">
          <small className="error">{error}</small>
          <small className="info">{info}</small>
        </div>
    </div>
  )
}

Container.defaultProps = {
  value: ''
}

export default Container;