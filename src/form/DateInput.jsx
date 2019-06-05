import React from 'react';
import Container from './Container'

const DateInput = props => {
  return(
    <Container {...props} >   
    {({ onChange, ...inputProps}) => 
    <input 
      type="date"
      {...inputProps}
      onChange={e => onChange({ e, id: e.target.id, value: e.target.value })}
      className="input"
    />}
    </Container>   
  )
}

DateInput.defaultProps = {}

export default DateInput;