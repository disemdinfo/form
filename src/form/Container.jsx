import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

const styles = {
  inputStyle: {
    paddingRight: 4,
    paddingLeft: 4,
  },
};
const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="label">{children}</label>
);

const Container = ({ children, label, id, error, info, inputWidth, inputStyle, actions, submited, ...props }) => (
  <div error={error} style={{ ...styles.inputStyle, ...inputStyle, width: inputWidth }} className={`input-container ${error ? 'input-error' : ''}`} >
    {label && <Label htmlFor={id}>{label}</Label>}
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ width: '100%' }}>
        {children}
      </div>
      {actions.map(action => action)}
    </div>
    <div className="footer">
      {submited && <small className="error">{error}</small>}
      <small className="info">{info}</small>
    </div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
  label: PropTypes.func,
  id: PropTypes.array.isRequired,
  error: PropTypes.string,
  info: PropTypes.object,
  inputWidth: PropTypes.func,
  inputStyle: PropTypes.object,
  actions: PropTypes.object,
  submited: PropTypes.bool,
};

Container.defaultProps = {
  label: null,
  error: null,
  info: null,
  submited: false,
  value: '',
  actions: [],
  inputWidth: '100%',
  inputStyle: {
    marginBottom: 16,
  },
};


export default Container;
