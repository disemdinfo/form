import React from 'react';
import Container from './Container';
import Switch from 'react-switch';

const SwitchInput = ({ onChange, id, ...inputProps }) => (
  <Switch
    {...inputProps}
    onChange={checked => onChange({ id, value: checked })}
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
