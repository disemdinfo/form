import React from 'react';
import Container from './Container'

const TextArea = props => {
  const { maxLength, value } = props;
  const info = maxLength ? `${value.length} / ${maxLength}` : null;
  return(
    <Container {...props} info={info} >   
    {({ value, onChange, onBlur, ...inputProps}) => {
        console.log('value', inputProps)
    return (
    <textarea 
      {...inputProps}      
      onChange={e => onChange({ e, id: e.target.id, value: e.target.value })}
      onBlur={e => onBlur({ e, id: e.target.id, value: e.target.value })}
      className="input textarea"
    >
    {value}
    </textarea>)}}
    </Container>   
  )
}

TextArea.defaultProps = {
  value: '',
  onBlur: () => null,
  style: { 
    minHeight: 72,    
  }  
}

export default TextArea;