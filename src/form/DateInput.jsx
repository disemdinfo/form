import React from 'react';
import Container from './Container'
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const DateInput = props => {
  return(
    <Container {...props} >   
    {({ onChange, id, value, closeOnSelect, timeFormat, isValidDate, min, max, ...inputProps}) =>       
        <Datetime                   
          id={id}            
          value={value} 
          closeOnSelect={closeOnSelect}
          timeFormat={timeFormat}
          isValidDate={current => {
            const isValidMin = min ? current > min : true;
            const isValidMax = max ? current <= max : true;

            return isValidDate(current) && isValidMin && isValidMax;
          }}
          onChange={date => onChange({ id, value: date })}                        
          inputProps={{ className: "input", ...inputProps }}      
        />}
      </Container>   
  )
}

DateInput.defaultProps = {
  closeOnSelect: true,
  timeFormat: false,
  isValidDate: () => true
}

export default DateInput;