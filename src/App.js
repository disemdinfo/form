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
        // number: null
        // select: 1,
        // selectCheckbox: [2]
      }
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange({ id, value }){    
    this.setState(({ data }) => ({ data: { ...data, [id]: value } }), () => console.log(this.state.data));
    // this.setState(({ data }) => ({ data: { ...data, [id]: value } }));
  }

  render() {
    const { date, text, number, select, selectCheckbox } = this.state.data;

    return (
      <Form 
        style={{ width: '50%' }}
        actions={
          [{
            label: 'Voltar',
            onClick: () => console.log('voltar'),
            disabled: !text
          }]
        }>

        <DateInput
          id="date"
          label="Date" 
          required         
          value={date} 
          onChange={this.onChange}
          // isValidDate={current => current < new Date('2019-06-20')}
          min={new Date('2019-06-20')}
          max={new Date('2019-06-25')}
        />

        <TextInput
          id="text"
          label="Texto" 
          required 
          maxLength={5}         
          value={text} 
          onChange={this.onChange}
          error={() => number > 5 ? 'Number tem que ser menor que 5' : null}
        />
        <NumberInput
          id="number"
          label="Number" 
          value={number}          
          onChange={this.onChange}
          prefix='R$ '
          suffix=" %"
          max={10}
          required
        />
        <Select
          id="select"
          label="Select" 
          value={select}          
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
          value={selectCheckbox}          
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
