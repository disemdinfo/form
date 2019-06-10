import React from 'react';
import Container from './Container'

const TextArea = props => {
  const { maxLength, value } = props;
  const info = maxLength ? `${value.length} / ${maxLength}` : null;
  return(
    <Container {...props} info={info} >   
    {({ value, onChange, onBlur, rows, style, ...inputProps}) => {
        let minHeight = 48;
        if(rows > 2){
            minHeight = minHeight + (rows - 2) * 18;
        }
    return (
    <textarea 
      {...inputProps}      
      onChange={e => onChange({ e, id: e.target.id, value: e.target.value })}
      onBlur={e => onBlur({ e, id: e.target.id, value: e.target.value })}
      className="input"
      style={{ ...style, minHeight }}
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
    rows: 2,    
    paddingTop: 8,    
    lineHeight: 1.25
  }  
}

export default TextArea;