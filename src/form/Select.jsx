import React, { PureComponent } from 'react';
import Select from 'react-select';

function convertOptions({ options, optionValue, optionLabel, labelRenderer }) {
  return options.map(option => ({ value: option[optionValue], label: labelRenderer ? labelRenderer(option) : option[optionLabel] }));
}

class InputSelect extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isMulti, value, onChange, id, optionValue, optionLabel, labelRenderer, ...inputProps } = this.props;
    const options = convertOptions({ options: this.props.options, optionValue, optionLabel, labelRenderer });

    return (
      <Select
        {...inputProps}
        value={isMulti ? options.filter(o => value.includes(o.value)) : options.find(o => o.value === value)}
        options={options}
        ignoreAccents
        isMulti={isMulti}
        id={id}
        onChange={(v) => {
          let nextValueFormatted = null;
          let selected = null;
          let diff = 0;

          if (isMulti) {
            const nextValue = v || [];
            const previousValue = value || [];
            diff = nextValue.length - previousValue.length;
            nextValueFormatted = nextValue.map(i => i.value);
            if (diff < 0) {
              selected = previousValue.filter(v => !nextValueFormatted.includes(v))[0];
            } else {
              selected = nextValueFormatted.filter(v => !previousValue.includes(v))[0];
            }
          } else {
            nextValueFormatted = (v || {}).value;
          }

          onChange({ id, value: nextValueFormatted, selected, diff });
        }}
      />);
  }
}

InputSelect.defaultProps = {
  options: [],
  searchable: true,
  isMulti: false,
  optionValue: 'value',
  optionLabel: 'label',
  clearAllText: 'Remover todos',
  placeholder: 'Pesquisar...',
  noResultsText: 'Nenhum resultado encontrado.',
  onChange: () => console.log('onchange não definido'),
  // getOptionLabel: option => null,
};

export default InputSelect;
