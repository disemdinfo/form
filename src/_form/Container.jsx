import React from 'react';
import './Input.css';

const Label = ({ children, htmlFor, ...props }) => (
  <label htmlFor={htmlFor} className="label">{children}</label>
);

const Container = ({ children, label, id, error, info, styleInput, validate, actions, ...props }) => (
  <div style={styleInput} className="input-container">
    {label && <Label htmlFor={id}>{label}</Label>}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%', marginRight: 5 }}>
        {children({
          id,
          ...props,
        })}
      </div>
      <div>
        {actions.map(action => <div>{action}</div>)}
      </div>
    </div>
    <div className="footer">
      <small className="error">{error}</small>
      <small className="info">{info}</small>
    </div>
  </div>
);

Container.defaultProps = {
  value: '',
  actions: [],
  styleInput: {
    marginTop: 20,
    marginBottom: 10,
  },
};

export default Container;
