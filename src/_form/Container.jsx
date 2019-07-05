import React from 'react';
import './Input.css';

const Label = ({ children, htmlFor, ...props }) => (
  <label htmlFor={htmlFor} className="label">{children}</label>
);

const Container = ({ children, label, id, error, info, styleInput, validate, ...props }) => (
  <div style={styleInput} className="input-container">
    {label && <Label htmlFor={id}>{label}</Label>}
    {children({
      id,
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
  styleInput: {
    marginTop: 20,
    marginBottom: 10,
  },
};

export default Container;
