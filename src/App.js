import React, { Component } from 'react';
import Form, { Text, Number } from './Form';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      value: ['lime']
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange(e){
    console.log(e.target.value)
    this.setState({ value: e.target.value })
  }
  render() {
    return (
      <Form 
        data={{ texto: 'teste' }}
      >
        <Text
          id="texto"
          label="texto" 
          required          
          // onChange={({ id, value}) => console.log(id, value)}
        />
        <Number
          id="decimal"
          label="Decimal" 
          // value={this.state.value}
          onChangeEvent={this.onChange}
          // onChange={({ id, value}) => console.log(id, value)}
        />

      </Form>     
    );
  }
}

export default App;
