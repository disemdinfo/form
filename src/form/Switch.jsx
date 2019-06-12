import React from 'react';
import Container from './Container';
import Switch from "react-switch";

const SwitchInput = props => {  
  return(
    <Container {...props} >   
    {({ onChange, id, ...inputProps}) => 
    <Switch 
      {...inputProps}
      onChange={checked => onChange({ id, value: checked })} 
    />}
    </Container>   
  )
}

SwitchInput.defaultProps = {
    checked: false,
    checkedIcon: false,
    uncheckedIcon: false,
}

export default SwitchInput;