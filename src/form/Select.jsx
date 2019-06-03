import React from 'react';
import './Input.scss';

const Select = ({ options, value, id, onChange, style, ...props }) => (
  <select
    {...props}
    style={{
      textAlignLast: 'right',
      background: '#FFFFFF',
      ...style,
    }}
    className="input"
    onChange={e => onChange({ id, value: e.target.value })}
  >
    <option value={null} />
    {options.map((option) => {
      let optionValue = null;
      let label = null;
      let selected = null;
      if (typeof option === 'object') {
        optionValue = option.optionValue;
        label = option.label;
      } else {
        optionValue = option;
        label = option;
      }
      if (optionValue == value) selected = true;
      return (
        <option value={optionValue} selected={selected}>{label}</option>
      )
      ;
    })}
  </select>
)
  ;

Select.defaultProps = {
  options: [],
};

export default Select;
