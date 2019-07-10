import React from 'react';
import './Input.css';

const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="label">{children}</label>
);

const Container = ({ children, label, id, error, info, inputStyle, actions, ...props }) => (
  <div error={error} style={inputStyle} className={`input-container ${error ? 'input-error' : ''}`} >
    {label && <Label htmlFor={id}>{label}</Label>}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%', marginRight: 5 }}>
        {children}
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
  inputStyle: {
    marginTop: 20,
    marginBottom: 10,
  },
};

export default Container;
