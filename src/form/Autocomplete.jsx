import React, { Component } from 'react';
import { getData } from '~/lib/api';
import Select from './Select';

class Autocomplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      options: props.options,
    };

    this.getOptions = this.getOptions.bind(this);
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value) {
      this.setState({ value }, this.getOptions);
    }
  }


  getOptions() {
    const { baseApi, optionValue, optionLabel } = this.props;
    const { value } = this.state;

    if (value) {
      const inputValue = Number(value) ? { [optionValue]: value } : { [optionLabel]: { $iLike: `%${value}%`.toUpperCase() } };
      return setTimeout(() => getData(baseApi, { ...inputValue, limit: 10, order: optionLabel }).then(options => this.setState({ options })), 1000);
    }
    return [];
  }


  render() {
    const { options } = this.state;

    return (
      <Select
        {...this.props}
        options={options}
        onInputChange={value => this.setState({ value }, this.getOptions)}
      />);
  }
}

Autocomplete.defaultProps = {
  options: [],
  value: '',
};

export default Autocomplete;
