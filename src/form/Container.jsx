import React from 'react';
import './Form.css';

const Label = ({ children, htmlFor, ...props }) => (
  <label htmlFor={htmlFor}>{children}</label>
);

const Container = ({ Component, label, id, value, onChange, ...props }) => {  
  console.log('2', id)
  return(
    <div className="input-container">
      <Label htmlFor={id}>{label}</Label>
        <Component 
        id={id} 
        onChange={onChange}
        //onChange={e => {
        //  e.preventDefault();          
        //  onChange();
        //}} 
        {...props}/>
    </div>
  )
}

export default Container;

// {<Component 
//           id={id}
//           value={value || ''}
//           onChange={e => onChange({ id: e.target.id, value: e.target.value, e })}
//           {...props}
//         />} 