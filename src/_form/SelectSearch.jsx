import React, { PureComponent } from 'react';
import Select from 'react-select/async';
import Container from './Container';

function convertOptions({ options, optionValue, optionLabel, labelRenderer }) {
  return options.map(option => ({ value: option[optionValue], label: labelRenderer ? labelRenderer(option) : option[optionLabel] }));
}

class SelectSearch extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };

    this.promiseOptions = this.promiseOptions.bind(this);
  }

  componentDidMount() {
    const { value } = this.state;
    if (value) {
      this.setValue(value);
    }
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value) {
      this.setValue(value);
    }
  }

  setValue(value) {
    Promise.resolve(this.props.getOptions(value)).then(data => this.setState({ value: data[0] }));
  }

  promiseOptions(inputValue) {
    if (inputValue && inputValue.length > 1) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(this.props.getOptions(inputValue));
        }, 500);
      });
    }
    return [];
  }

  render() {
    const { isMulti, value, getOptions, onChange, id, optionValue, optionLabel, labelRenderer, ...inputProps } = this.props;

    // const options = convertOptions({ options: props.options, optionValue, optionLabel, labelRenderer });
    return (

      <Select
        {...inputProps}
        // value={isMulti ? options.filter(o => value.includes(o.value)) : options.find(o => o.value === value)}
        loadOptions={this.promiseOptions}
        value={this.state.value}
        // ignoreAccents
        cacheOptions
        defaultOptions
        onChange={v => this.setState({ value: v })}
      />);
  }
}

SelectSearch.defaultProps = {
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

export default SelectSearch;
