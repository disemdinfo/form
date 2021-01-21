import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import ComponentContainer from './ComponentContainer';

const DateInput = ({ label, onChange, id, value, closeOnSelect, timeFormat, isValidDate, minDate, maxDate, ...props }) => (
  <ComponentContainer label={label}>
    <Datetime
      {...props}
      // id={id}
      // value={value ? moment(value) : null}
      // closeOnSelect={closeOnSelect}
      // timeFormat={timeFormat}
      // isValidDate={(current) => {
      //   const isValidMin = minDate ? current > minDate : true;
      //   const isValidMax = maxDate ? current <= maxDate : true;

      //   return isValidDate(current) && isValidMin && isValidMax;
      // }}
      // onChange={date => onChange({ id, value: date })}
      inputProps={{ className: 'input input-date' }}
    />
  </ComponentContainer>
);

DateInput.defaultProps = {
  closeOnSelect: true,
  timeFormat: false,
  isValidDate: () => true,
};

export default DateInput;
