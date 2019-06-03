import React, { Component } from 'react';
import Form from './form/Form.jsx';
import TextInput from './form/TextInput.jsx';
import NumberInput from './form/NumberInput.jsx';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      data: {}
    }

    this.onChange = this.onChange.bind(this)
  }

  // onChange({ value, id }){
  //   console.log(id, value)
  //   this.setState(({ data }) => ({ data: { ...data, [id]: value } }));
  // }

  onChange({ id, value }){  
    console.log('4', id, value)
    this.setState(({ data }) => ({ data: { ...data, [id]: value } }));
  }
  render() {
    return (
      <div>
        <TextInput
          id="text"
          label="texto" 
          required          
          value={this.state.data.text} 
          onChange={e => this.onChange({ id: e.target.id, value: e.target.value })}
        />
        {/* <NumberInput
          id="decimal"
          label="Decimal" 
          value={this.state.data.number}          
          onChange={this.onChange}
        /> */}

      </div>     
    );
  }
}

export default App;
