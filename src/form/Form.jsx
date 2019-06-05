import React, { Component } from 'react';
import './Form.css';
import Button from './Button.jsx';

function getError({ id, value, error, required, min, max }){
  
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

  if(error){
    return error()
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

    this.state = {};
  }

  render() {
    const { onSubimit, actions } = this.props;
    const children = getChildren(this.props.children);
    const isValid = children.every(c => !c.props.error);
    
    return (
      <div className="container" {...this.props}>
        <div className="form">
          {children}          
        </div>
        <div className="actions">
          <Button label="Salvar" disabled={!isValid} onClick={onSubimit} />
          {actions.map((action, key) => <Button key={key} {...action} />)}
        </div>
      </div>
    );
  }
}

Form.defaultProps = {
  actions: []
}

export default Form;
