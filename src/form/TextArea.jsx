import React from 'react';
import Container from './Container';

const TextArea = (props) => {
  const { maxLength, value, onChange, onBlur } = props;
  const info = maxLength ? `${value.length} / ${maxLength}` : null;
  return (
    <textarea
      {...inputProps}
      onChange={e => onChange({ e, id: e.target.id, value: e.target.value })}
      onBlur={e => onBlur({ e, id: e.target.id, value: e.target.value })}
      className="input"
      value={value}
    />);
};

TextArea.defaultProps = {
  value: '',
  onBlur: () => null,
  rows: 3,
  style: {
    height: 'auto',
  },
};

export default TextArea;
