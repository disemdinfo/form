import React from 'react';
import './form.css';

function isJson(str) {
  if (Number(str)) return false;
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

const styles = {
  container: {
    display: 'flex',
    padding: 6,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#212529',
  },
};
const Radio = ({ id, value, label, options, onChange, ...props }) => (
  <div style={styles.container}>
    {options.map(option => (
      <label htmlFor={id} style={{ display: 'flex', marginLeft: 6, marginRight: 6 }}>
        <input
          {...props}
          type="radio"
          id={id}
          name={id}
          value={option.value}
          checked={value == option.value}
          onChange={(e) => {
            let v = e.target.value;
            if (isJson(v)) v = JSON.parse(v);
            onChange({ id, value: v });
          }}
        />
        <span>{option.label}</span>
      </label>),
    )}
  </div>
)
  ;

Radio.defaultProps = {
  options: [],
};

export default Radio;
