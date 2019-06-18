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

    this.onChange = this.onChange.bind(this);
  }

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value) {
      this.setState({ value }, this.getOptions);
    }
  }

  onChange() {
    const { value } = this.state;
    if (value && value.length > 1) this.getOptions();
  }

  getOptions() {
    const { value } = this.state;
    console.log('options', this.state.options);
    if (value) {
      Promise.resolve(this.props.getOptions(value)).then(data => this.setState({ options: data })).catch(err => console.error(err));
      // const { baseApi, optionValue, optionLabel } = this.props;
      // return getData(baseApi, { ...inputValue, limit: 10, order: optionLabel }).then(options => this.setState({ options }));
    }
    return [];
  }


  render() {
    const { options } = this.state;

    return (
      <Select
        {...this.props}
        options={options}
        onInputChange={value => this.setState({ value }, () => setTimeout(() => this.onChange(), 100))}
      />);
  }
}

Autocomplete.defaultProps = {
  options: [],
  value: '',
};

export default Autocomplete;
