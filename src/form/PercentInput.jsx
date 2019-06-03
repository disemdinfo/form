import React from 'react';
import DecimalInput from './DecimalInput';

const PercentInput = props => (
  <DecimalInput
    {...props}
    suffix={' %'}
  />);

export default PercentInput;
