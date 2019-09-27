import React from 'react';
import Label from './Label';
import ComponentContainer from './ComponentContainer';

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
  options: {
    display: 'flex',
    padding: 6,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#212529',
  },
  option: {
    display: 'flex',
    marginRight: 6,
    alignItems: 'center'
  },
};
const Radio = ({ id, value, label, options, onChange, ...props }) => (
  <ComponentContainer label={label}>
    <div style={styles.options}>
      {options.map(option => (
        <label htmlFor={id} style={styles.option}>          
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
  </ComponentContainer>
)
  ;

Radio.defaultProps = {
  options: [],
};

export default Radio;
