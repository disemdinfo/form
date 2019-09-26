import React from 'react';
import Container from './Container';
import Switch from 'react-switch';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  switch: {
    marginLeft: 10,
    marginRight: 10,
  },
};
const SwitchInput = ({ onChange, id, width, leftLable, rightLabel, ...inputProps }) => {
  const height = width * 0.4166;
  const handleDiameter = width * 0.625;
  return (
    <label htmlFor="material-switch" style={styles.container}>
      {leftLable}
      <div style={styles.switch}>
        <Switch
          {...inputProps}
          id={id}
          width={width}
          height={height}
          handleDiameter={handleDiameter}
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
          onChange={checked => onChange({ id, value: checked })}
        />
      </div>
      {rightLabel}
    </label>
  );
};

SwitchInput.defaultProps = {
  checked: false,
  checkedIcon: false,
  uncheckedIcon: false,
  width: 40,
  // height: 20,
  // handleDiameter: 30,
  onColor: '#86d3ff',
  onHandleColor: '#1976d2',
  className: 'react-switch',
};

export default SwitchInput;
