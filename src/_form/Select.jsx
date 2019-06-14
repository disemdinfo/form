import React, { PureComponent } from 'react';
import Container from './Container';
import Select from 'react-virtualized-select';
import 'react-select/dist/react-select.css';
import 'react-virtualized-select/styles.css';


function convertOptions({ options, optionValue, optionLabel }) {
  return options.map(option => ({ value: option[optionValue], label: option[optionLabel] }));
}

class SelectCheckbox extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }


  render() {
    const { multi, value } = this.props;

    return (
      <Container {...this.props} >
        {({ options, onChange, id, optionValue, optionLabel, ...inputProps }) => (<Select
          {...inputProps}
          value={value}
          options={convertOptions({ options, optionValue, optionLabel })}
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

SelectCheckbox.defaultProps = {
  options: [],
  searchable: true,
  multi: false,
  optionValue: 'value',
  optionLabel: 'label',
  clearAllText: 'Remover todos',
  placeholder: 'Digite o que procura',
  noResultsText: 'Nenhum resultado encontrado.',
};

export default SelectCheckbox;
