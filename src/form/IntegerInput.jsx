import React from 'react';
import NumberInput from './NumberInput';

const IntegerInput = props => (
  <NumberInput
    {...props}
    thousandSeparator="."
    precision={0}
  />);

export default IntegerInput;
