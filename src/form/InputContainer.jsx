import React from 'react';
import './input.css';

const InputContainer = ({ children, ...props }) => {  
  return (
    <div>
        {children}      
    </div>);
};

InputContainer.defaultProps = {

};

export default InputContainer;
