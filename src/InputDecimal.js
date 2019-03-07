import React from 'react';
import InputContainer from './InputContainer';
import CurrencyInput from 'react-currency-input';

const InputDecimal = ({ label, value, onChange, ...props }) => {

  return(
    <InputContainer label={label}>
      <CurrencyInput
        value={value || ''} 
        onChangeEvent={e => onChange({ id: e.target.id, value: e.target.value, e })} 
        {...props}

      />
    </InputContainer>
  )

}

export default InputDecimal;