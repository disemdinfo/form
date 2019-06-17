import React, { PureComponent } from 'react';
import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';
import Container from './Container';


function convertOptions({ options, optionValue, optionLabel, labelRenderer }) {
  return options.map(option => ({ value: option[optionValue], label: labelRenderer ? labelRenderer(option) : option[optionLabel] }));
}

class InputSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { multi, value } = this.props;

    return (
      <Container {...this.props} >
        {({ options, onChange, id, optionValue, optionLabel, labelRenderer, ...inputProps }) => (
          <Select
            {...inputProps}
            value={value}
            options={convertOptions({ options, optionValue, optionLabel, labelRenderer })}
            ignoreAccents
            onChange={(nextValue) => {
              let nextValueFormatted = null;
              let selected = null;
              let diff = 0;
              if (multi) {
                diff = nextValue.length - value.length;
                nextValueFormatted = nextValue.map(i => i.value);
                if (diff < 0) {
                  selected = value.filter(v => !nextValueFormatted.includes(v))[0];
                } else {
                  selected = nextValueFormatted.filter(v => !value.includes(v))[0];
                }
              } else {
                nextValueFormatted = (nextValue || {}).value;
              }

              onChange({ id, value: nextValueFormatted, selected, diff });
            }}
          />)}
      </Container>);
  }
}

InputSelect.defaultProps = {
  options: [],
  searchable: true,
  multi: false,
  optionValue: 'value',
  optionLabel: 'label',
  clearAllText: 'Remover todos',
  placeholder: 'Digite o que procura',
  noResultsText: 'Nenhum resultado encontrado.',
  onChange: () => console.log('onchange não definido'),
  // getOptionLabel: option => null,
};

export default InputSelect;
