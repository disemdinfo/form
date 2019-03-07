import React from 'react';
import InputContainer from './InputContainer'
const InputText = ({ label, value, onChange, ...props }) => {

  return(
    <InputContainer label={label}>
      <input 
        value={value || ''} 
        onChange={e => onChange({ id: e.target.id, value: e.target.value, e })}        
        {...props}        
      />
    </InputContainer>
  )

}

export default InputText;