import React from 'react';
import NumberInput from './NumberInput';

const DecimalInput = props => (
  <NumberInput
    {...props}
    decimalSeparator=","
    thousandSeparator="."
    precision={2}
  />);

export default DecimalInput;
