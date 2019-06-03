import React from 'react';
import DecimalInput from './DecimalInput';

const CurrencyInput = props => (
  <DecimalInput
    {...props}
    prefix={'R$ '}
    // suffix={field.percent ? ' %' : ''}
  />);

export default CurrencyInput;
