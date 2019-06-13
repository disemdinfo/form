import React from 'react';
import Container from './Container';

const TextInput = (props) => {
  const { maxLength, value } = props;
  const info = maxLength ? `${value.length} / ${maxLength}` : null;
  return (
    <Container {...props} info={info} >
      {({ onChange, onBlur, ...inputProps }) =>
        (<input
          {...inputProps}
          onChange={e => onChange({ e, id: e.target.id, value: e.target.value })}
          onBlur={e => onBlur({ e, id: e.target.id, value: e.target.value })}
          className="input"
        />)}
    </Container>
  );
};

TextInput.defaultProps = {
  value: '',
  onBlur: () => null,
};

export default TextInput;
