import React from 'react';
import Datetime from 'react-datetime';
import moment from '~/lib/moment';
import 'react-datetime/css/react-datetime.css';

const DateInput = ({ onChange, id, value, closeOnSelect, timeFormat, isValidDate, minDate, maxDate, ...inputProps }) => (

  <Datetime
    id={id}
    value={value ? moment(value).utc() : null}
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
