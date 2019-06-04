import React, { Component } from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';

class Form extends Component {

  constructor(props){
    super(props)

    const { children } = props;

    this.state = {      
      children      
    }
  }

  getChildrens(children){
    return children.map(c => ({
      ...c,
      props: { ...c.props, error: 'true' }      
    }));
  }

  render() {
    // const { children, ...props } = this.props;    
    const children = this.getChildrens(this.props.children);
    console.log('children', children)
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
