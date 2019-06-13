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
          onChange={(i) => {
            const item = multi ? i || [] : i || {};
            onChange({ id, value: multi ? item.map(i => i.value) : item.value });
          }}
          clearAllText="Remover todos"
          searchPromptText="Digite o que procura"
          noResultsText="Nenhum resultado encontrado."
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
};

export default SelectCheckbox;
