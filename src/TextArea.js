import React from 'react';
import ComponentContainer from './ComponentContainer';

const TextArea = (props) => {
  const { label, maxLength, value, onChange, onBlur, style, ...inputProps } = props;
  const info = maxLength ? `${value.length} / ${maxLength}` : null;
  return (
    <ComponentContainer label={label}>
      <textarea
        {...inputProps}
        onChange={e => onChange({ e, id: e.target.id, value: e.target.value })}
        onBlur={e => onBlur({ e, id: e.target.id, value: e.target.value })}
        className="input"
        value={value}
        style={{ width: '100%', ...style }}
      />
    </ComponentContainer>);
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
