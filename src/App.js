import React, { Component } from 'react';
import Form from './form/Form.jsx';
import TextInput from './form/TextInput.jsx';
import NumberInput from './form/NumberInput.jsx';
import Select from './form/Select.jsx';
import DateInput from './form/DateInput.jsx';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      data: {
        // select: 1,
        // selectCheckbox: [2]
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

        <DateInput
          id="date"
          label="Date" 
          required         
          value={this.state.data.date} 
          onChange={this.onChange}
          min="2019-05-15"
        />

        <TextInput
          id="texto"
          label="Texto" 
          required 
          maxLength={5}         
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
          max={10}
          required
        />
        <Select
          id="select"
          label="Select" 
          value={this.state.data.select}          
          onChange={this.onChange}
          required
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
          required
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
