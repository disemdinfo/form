import React from 'react';
import './Form.css';

const Label = ({ children, htmlFor, ...props }) => (
  <label htmlFor={htmlFor}>{children}</label>
);

const Container = ({ children, id, label, ...props }) => {

  return(
    <div className="Input-container">
      <Label htmlFor={id}>{label}</Label>
        {children}
    </div>
  )

}

export default Container;