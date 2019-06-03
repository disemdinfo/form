import React, { Component } from 'react';
import Container from './Container'
import TextInput from './TextInput';
import NumberInput from './NumberInput';

class Form extends Component {

  constructor(props){
    super(props)

    const elements = {};
    props.children.forEach(c => elements[c.props.id] = { ...c.props });

    this.state = {      
      elements,
      data: props.data || {},
    }

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange({ id, value }){
    this.setState(({ data }) => ({ data: { ...data, [id]: value } }))
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { data, elements } = this.state;

    Object.keys(elements).forEach(key => {
      const error = this.getError(key);
      if(error) this.setState(({ elements }) => ({ elements: { ...elements, [key]: { ...elements[key], error } } }))
    })
   
    // event.target.elements.forEach(e => console.log(e))
  }

  getError(id){
    const { data, elements } = this.state;
    const value = data[id];
    const element = elements[id];
    const { required } = element;
    let error = null;
    console.log('id', id)
    console.log('element', element)
    console.log('value', value)

    if (required && !value) return 'Campo obrigatório';

    return error;
  }

  render() {
    const { children, ...props } = this.props;
    const { data } = this.state;

    return (
      <form
        {...props}
      >
        {children}
        {/* {children.map(c =>  React.cloneElement(c, { 
          // ...c,
          key: c.props.id,  
          onChange: this.onChange, 
          // value: data[c.props.id],          
        }))} */}
        <button id="submit" onClick={this.onSubmit}>Submit</button>
      </form>
    );
  }
}

Form.TextInput = Text;
Form.NumberInput = Number;

export default Form;
export { TextInput, NumberInput };
