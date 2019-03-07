import React, { Component } from 'react';
import Form, { InputText, InputDecimal } from './Form';

class App extends Component {
  render() {
    return (
      <Form 
        data={{ texto: 'teste' }}
      >
        <InputText
          id="texto"
          label="texto" 
          required          
          // onChange={({ id, value}) => console.log(id, value)}
        />
        <InputDecimal
          id="decimal"
          label="Decimal" 
          // onChange={({ id, value}) => console.log(id, value)}
        />
      </Form>     
    );
  }
}

export default App;
