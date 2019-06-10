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

function getErrors(children){
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
      children,
    };

    this.onSubimit = this.onSubimit.bind(this);
  }

  componentWillReceiveProps({ children }){
    if(children !== this.props.children){      
     this.setState({ children: this.state.submited ? getErrors(children) : children });
    }
  }

  onSubimit(){

    const children = getErrors(this.props.children);
    const isValid = children.every(c => !c.props.error);

    if(isValid){
      this.props.onSubimit();
    } else {
      this.setState({ children, submited: true });
    }
  }

  render() {
    const { actions, onSubimit, ...props } = this.props;
    const { children } = this.state;    
    
    return (
      <div className="container" {...props}>
        <div className="form">
          {children}          
        </div>
        <div className="actions">
          <Button label="Salvar" onClick={this.onSubimit} />
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
