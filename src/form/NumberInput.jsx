import React from 'react';
import PropTypes from 'prop-types';
import Container from './Container'
import CurrencyInput from 'react-currency-input';


const NumberInput = ({ onChange, value, allowNegative, ...props }) => (
  <Container       
      {...props}
      Component={() => 
        <CurrencyInput          
          value={(value || '').toString().replace('.', ',')}
          onChangeEvent={(e) => {            
            onChange({ id: e.target.id, value: Number(e.target.value.toString().replace(/\./g, '').replace(',', '.').replace('%', '').replace('R$', '')) });
          }}
          allowNegative={allowNegative}    
        />
      }
    /> 
  );

NumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  allowNegative: PropTypes.bool,
};

NumberInput.defaultProps = {
  allowNegative: true,
};

export default NumberInput;
