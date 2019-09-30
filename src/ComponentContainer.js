import React from 'react';
import Label from './Label';

const ComponentContainer = ({ children, label, style, ...props }) => {  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' , ...style }}>
        {label && <Label>{label}</Label>}
        {children}      
    </div>);
};

ComponentContainer.defaultProps = {};

export default ComponentContainer;
