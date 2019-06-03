import React from 'react';
import Container from './Container'

// {/* {...props} */}
const TextInput = ({ ...props }) => {  
  
  return(
    <Container
      {...props}       
      Component={e => {
        console.log('3', e)        
        return <input {...e}/>
      }}
    />      
  )
}

export default TextInput;