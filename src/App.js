import React, { Component } from 'react';
import Form from './form/Form.jsx';
import TextInput from './form/TextInput.jsx';
import NumberInput from './form/NumberInput.jsx';
import Select from './form/Select.jsx';
import DateInput from './form/DateInput.jsx';
import Switch from './form/Switch.jsx';
import TextArea from './form/TextArea.jsx';

class App extends Component {

  constructor(props){
    super(props)

    this.state = {
      data: {
        // number: null
        // select: 1,
        // selectCheckbox: [2],
        text: 'Teste',
        textarea: 'The Switch component in the above example is nested inside a label tag. This makes sure that the label text is read out to people with reduced sight who use screen readers and enables users to click on the text to toggle the switch. If you would only put some text next to the switch but not inside a label element, the screen reader will just read out "switch off" and the user will have no idea what it is for.'
      }
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange({ id, value }){  
    console.log(id, value)     
    this.setState(({ data }) => ({ data: { ...data, [id]: value } }));
    
  }

  render() {
    const { date, text, textarea, number, select, selectCheckbox } = this.state.data;

    return (
      <Form 
        style={{ width: '50%' }}
        onSubimit={data => console.log(this.state.data)}
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
          maxLength={50}         
          value={text} 
          onChange={this.onChange}
          onBlur={this.onChange}
          error={() => number > 5 ? 'Number tem que ser menor que 5' : null}
        />

        <TextArea
          id="textarea"
          label="Text Area" 
          required 
          // maxLength={100}         
          value={textarea} 
          onChange={this.onChange}
          onBlur={this.onChange}
          // error={() => number > 5 ? 'Number tem que ser menor que 5' : null}
        />

        <NumberInput
          id="number"
          label="Number" 
          value={number}          
          onChange={this.onChange}  
          max={10}
          required
        />
        <Select
          id="select"
          label="Select" 
          value={select}          
          onChange={this.onChange}
          required
          options={Array(100).fill().map((d, i) => ({ value: i, label: i }))}
        />
        <Select
          id="selectCheckbox"
          label="Select Checkbox" 
          multi
          value={selectCheckbox}          
          onChange={this.onChange}
          required
          options={Array(10).fill().map((d, i) => ({ value: i, label: i }))}
        />

          <Switch 
            id="selectCheckbox"
            label="Switch"           
            value={selectCheckbox}          
            onChange={this.onChange}
          />
        

      </Form>     
    );
  }
}

export default App;
