import React from 'react';
import Container from './Container';
import Switch from 'react-switch';

const SwitchInput = ({ onChange, id, label, ...inputProps }) => (
  <Switch
    {...inputProps}
    id={id}
    label=""
    onChange={checked => onChange({ id, value: checked })}
    onColor="#1976d2"
  />
);

SwitchInput.defaultProps = {
  checked: false,
  checkedIcon: false,
  uncheckedIcon: false,
  width: 48,
  height: 24,
};

export default SwitchInput;
