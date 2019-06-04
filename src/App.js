import React, { Component } from 'react';
import Form from './form/Form.jsx';
import TextInput from './form/TextInput.jsx';
import NumberInput from './form/NumberInput.jsx';
import Select from './form/Select.jsx';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      data: {
        select: 1,
        selectCheckbox: [2]
      }
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange({ id, value }){      
    this.setState(({ data }) => ({ data: { ...data, [id]: value } }));
  }
  render() {
    return (
      <Form>
        <TextInput
          id="texto"
          label="Texto" 
          //required          
          value={this.state.data.texto} 
          onChange={this.onChange}
        />
        <NumberInput
          id="number"
          label="Number" 
          value={this.state.data.number}          
          onChange={this.onChange}
          prefix='R$ '
          suffix=" %"
        />
        <Select
          id="select"
          label="Select" 
          value={this.state.data.select}          
          onChange={this.onChange}
          options={[
            {
              value: 1,
              label: 'A'
            },
            {
              value: 2,
              label: 'B'
            },
            {
              value: 3,
              label: 'C'
            }
          ]}
        />
        <Select
          id="selectCheckbox"
          label="Select Checkbox" 
          multi
          value={this.state.data.selectCheckbox}          
          onChange={this.onChange}
          options={[
            {
              value: 1,
              label: 'A'
            },
            {
              value: 2,
              label: 'B'
            },
            {
              value: 3,
              label: 'C'
            }
          ]}
        />

      </Form>     
    );
  }
}

export default App;
