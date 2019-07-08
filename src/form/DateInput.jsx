import React from 'react';
import Container from './Container';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const DateInput = ({ onChange, id, value, closeOnSelect, timeFormat, isValidDate, minDate, maxDate, ...inputProps }) => (

  <Datetime
    id={id}
    value={value}
    closeOnSelect={closeOnSelect}
    timeFormat={timeFormat}
    isValidDate={(current) => {
      const isValidMin = minDate ? current > minDate : true;
      const isValidMax = maxDate ? current <= maxDate : true;

      return isValidDate(current) && isValidMin && isValidMax;
    }}
    onChange={date => onChange({ id, value: date })}
    inputProps={{ className: 'input', ...inputProps }}
  />
);

DateInput.defaultProps = {
  closeOnSelect: true,
  timeFormat: false,
  isValidDate: () => true,
};

export default DateInput;
