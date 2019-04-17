import React from 'react';
import Container from './Container'
const Text = ({ label, value, onChange, ...props }) => {

  return(
    <Container label={label}>
      <input 
        value={value || ''} 
        onChange={e => onChange({ id: e.target.id, value: e.target.value, e })}        
        {...props}        
      />
    </Container>
  )

}

export default Text;