import React, { Component } from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';


function getError({ id, value, required, min, max }){
  
  if(required && value !== 0){
    const text = 'Campo obrigatório.';
    if(Array.isArray(value)){
      if(!value.length) return text;     
    } else {
      if(!value) return text;
    }   
  }

  if(min){
    if(value < min) return `Mínimo ${min}.`;  
  }

  if(max){
    if(value > max) return `Máximo ${max}.`;  
  }


  return null;
}

function getChildren(children){
  return children.map(c => ({
    ...c,
    props: { 
      ...c.props, 
      error: getError(c.props) 
    }      
  }));
}

class Form extends Component {

  constructor(props){
    super(props)

    const { children } = props;

    this.state = {      
      children      
    }
  }  

  

  render() {   
    const children = getChildren(this.props.children);

    return (
      <div>
        {children}     
        <button id="submit" onClick={this.onSubmit}>Submit</button>
      </div>
    );
  }
}

Form.TextInput = Text;
Form.NumberInput = Number;

export default Form;
export { TextInput, NumberInput };
