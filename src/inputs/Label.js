import React from 'react';
import './input.css';

const Label = ({ id, children, ...props }) => {  
  return <label htmlFor={id} className="label">{children}</label>;
};

Label.defaultProps = {

};

export default Label;
