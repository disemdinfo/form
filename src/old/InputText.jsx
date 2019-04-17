import React from 'react';
import { TextField } from 'react-md';
import Container from './Container';

const defaultStyle = {

  display: 'inline-block',
  width: '100%',
  height: 28,
  borderTop: '0px',
  borderLeft: '0px',
  borderRight: '0px',
  borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  color: 'rgba(0, 0, 0, 0.87)',
  label: {
    container: {
      height: 18,
    },
    color: 'rgba(0, 0, 0, 0.42)',
  },

};


export const Text = ({ id, value, onChange, onBlur, label, style, ...props }) => (
  <Container style={style}>
    {/* <InputLabel id={id}>{label}</InputLabel> */}
    <TextField
      id={id}
      refs={1}
      value={value || ''}
      label={label}
      onChange={(value, e) => onChange({ value: e.target.value, id: e.target.id })}
      onBlur={e => onChange({ value: e.target.value, id: e.target.id })}
      // style={defaultStyle}
      {...props}
    />
  </Container>
);


Text.defaultProps = {
};

export default Text;
