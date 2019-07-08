import React, { PureComponent } from 'react';
import Select from 'react-select';
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
    const { isMulti, value } = this.props;

    return (
      <Container {...this.props} >
        {(props) => {
          const { onChange, id, optionValue, optionLabel, labelRenderer, ...inputProps } = props;
          const options = convertOptions({ options: props.options, optionValue, optionLabel, labelRenderer });

          return (
            <Select
              {...inputProps}
              value={isMulti ? options.filter(o => value.includes(o.value)) : options.find(o => o.value === value)}
              options={options}
              ignoreAccents
              onChange={(nextValue) => {
                let nextValueFormatted = null;
                let selected = null;
                let diff = 0;
                if (isMulti) {
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
            />);
        }}
      </Container>);
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
