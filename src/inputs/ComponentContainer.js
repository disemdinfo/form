import React from 'react';
import Label from './Label';

const ComponentContainer = ({ children, label, style, info, ...props }) => {  
  return (
    <div style={{ display: 'flex', flexDirection: 'column' , ...style }}>
        {label && <Label>{label}</Label>}
        {children} 
	    {info && <div className="input-info">{info}</div>}
    </div>);
};

ComponentContainer.defaultProps = {};

export default ComponentContainer;
