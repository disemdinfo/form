import React from 'react';
import './Form.css';

const Label = ({ children, ...props }) => (
  <label>{children}</label>
);

const InputContainer = ({ children, id, label, ...props }) => {

  return(
    <div className="Input-container">
      <Label for={id}>
        {label}
        {children}
      </Label>
    </div>
  )

}

export default InputContainer;