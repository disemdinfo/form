import React from 'react';
import { Card, CardTitle, CardText, Grid, Cell, TextField } from 'react-md';
import CurrencyInput from 'react-currency-input';
import ButtonTemp from 'react-md/lib/Buttons/Button';
import InputText from './InputText';

const defaultStyle = {
  form: {
    maxWidth: '65%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  input: {
    container: {
      // marginTop: 12,
      // marginRight: 4,
    },
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
  },
  button: {
    text: {
      // color: 'rgba(0, 0, 0, 0.87)',
      // height: 32,
      // marginBottom: 0,
      // marginTop: 0,
      // fontSize: 14,
    },
    // cursor: 'pointer',
    // background: '#FFFFFF',
    // borderRadius: 'inherit',
  },
};

function convertToNumber(value) {
  const number = Number(
    value
      .toString()
      .replace(/\./g, '')
      .replace(',', '.')
      .replace('%', '')
      .replace('R$', ''),
  );
  return number;
}

export const FormCell = ({ children, ...props }) => (
  <Cell
    {...props}
  >
    {children}
  </Cell>
);

const InputContainer = ({ children, style }) => (
  <div style={{ ...defaultStyle.input.container, ...style }}>
    {children}
  </div >
);

const InputLabel = ({ children, id }) => (
  <div style={defaultStyle.input.label.container}>
    <label htmlFor={id} style={defaultStyle.input.label}>{children}</label>
  </div>
);

export const Input = ({ id, value, onChange, onBlur, label, style, ...props }) => (
  <InputContainer style={style}>
    {/* <InputLabel id={id}>{label}</InputLabel> */}
    <TextField
      id={id}
      refs={1}
      value={value || ''}
      label={label}
      onChange={(value, e) => onChange({ value: e.target.value, id: e.target.id })}
      onBlur={e => onChange({ value: e.target.value, id: e.target.id })}
      // style={defaultStyle.input}
      {...props}
    />
  </InputContainer>
);

export const InputInteger = ({ id, onChange, onBlur, value, label, style, ...props }) => (
  <InputContainer style={style}>
    <InputLabel id={id}>{label}</InputLabel>
    <CurrencyInput
      id={id}
      value={value.toString().replace('.', ',') || ''}
      onChangeEvent={e => onChange({ value: convertToNumber(e.target.value), id: e.target.id })}
      onBlur={e => onChange({ value: convertToNumber(e.target.value), id: e.target.id })}
      style={defaultStyle.input}
      allowNegative
      precision={0}
      thousandSeparator="."
      {...props}
    />
  </InputContainer>
);

export const InputDecimal = ({ ...props }) => (
  <InputInteger
    precision={2}
    decimalSeparator=","
    {...props}
  />
);

export const Button = ({ children, ...props }) => (
  <ButtonTemp
    raised
    style={defaultStyle.button}
    {...props}
  >
    <div style={defaultStyle.button.text}>{children}</div>
  </ButtonTemp>
);


const Form = ({ children, style, title, subtitle, ...props }) => (
  <Card
    {...props}
    style={{ ...defaultStyle.form, ...style }}
  >
    { (title || subtitle) && <CardTitle title={title} subtitle={subtitle} />}
    <CardText>
      <form style={{ width: '100%' }}>
        <Grid>
          {children}
        </Grid>
      </form>
    </CardText>
  </Card>
);

Form.defaultProps = {
};

Form.InputText = InputText;

export default Form;
export { InputText };
