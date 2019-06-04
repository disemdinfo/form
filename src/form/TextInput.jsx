import React from 'react';
import Container from './Container'

const TextInput = props => {    
  return(
    <Container {...props} >   
    {({ onChange, ...inputProps}) => 
    <input 
      {...inputProps}
      onChange={e => onChange({ e, id: e.target.id, value: e.target.value })}
      className="input"
    />}
    </Container>   
  )
}
export default TextInput;