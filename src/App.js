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
        date: new Date(),
        number: 5,
        select: 1,
        switchInput: true,
        selectCheckbox: [2],
        text: 'Teste',
        textarea: 'The Switch component in the above example is nested inside a label tag. This makes sure that the label text is read out to people with reduced sight who use screen readers and enables users to click on the text to toggle the switch. If you would only put some text next to the switch but not inside a label element, the screen reader will just read out "switch off" and the user will have no idea what it is for. The Switch component in the above example is nested inside a label tag. This makes sure that the label text is read out to people with The Switch component in the above example is nested inside a label tag. This makes sure that the label text is read out to people with reduced sight who use screen readers and enables users to click on the text to toggle the switch. If you would only put some text next to the switch but not inside a label element, the screen reader will just read out "switch off" and the user will have no idea what it is for. The Switch component in the above example is nested inside a label tag. This makes sure that the label text is read out to people with'
      }
    }

    this.onChange = this.onChange.bind(this)
  }

  onChange({ id, value }){  
    this.setState(({ data }) => ({ data: { ...data, [id]: value } }));    
  }

  render() {
    const { date, text, textarea, number, select, selectCheckbox, switchInput } = this.state.data;

    return (
      <Form 
        width='50%'
        isValid={isValid => this.setState({ isValid }, () => console.log('isValid', isValid))}
        onSubmit={({ message }) => {
          message('salvou')
        }}
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
          minDate={new Date('2019-06-20')}
          maxDate={new Date('2019-06-25')}
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
          // rows={3}
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
            id="switchInput"
            label="Switch"           
            checked={switchInput}          
            onChange={this.onChange}
          />
        

      </Form>     
    );
  }
}

export default App;
