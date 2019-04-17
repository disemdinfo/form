import React from 'react';
import Container from './Container';
import CurrencyInput from 'react-currency-input';

const Number = ({ label, value, onChange, ...props }) => {
  // console.log('value', value)
  return(
    <Container label={label}>
      <CurrencyInput
        value={value || ''} 
        precision={2}
        decimalSeparator=","
        thousandSeparator="."
        onChangeEvent={e => onChange ? onChange({ id: e.target.id, value: e.target.value, e }) : null} 
        {...props}
      />
    </Container>
  )

}

export default Number;