import React from 'react';
import './Input.css';

const Label = ({ children, htmlFor, required, ...props }) => (
  <label htmlFor={htmlFor} className="label">{children} {required ? '*' : null}</label>
);

const Container = ({ children, label, id, value, error, info, required, validate, ...props }) => (
  <div className="input-container">
    {label && <Label htmlFor={id} required={required}>{label}</Label>}
    {children({
      id,
      value: value || '',
      ...props,
    })}
    <div className="footer">
      <small className="error">{error}</small>
      <small className="info">{info}</small>
    </div>
  </div>
);

Container.defaultProps = {
  value: '',
};

export default Container;
