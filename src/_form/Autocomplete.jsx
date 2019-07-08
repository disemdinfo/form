import React, { Component } from 'react';
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

  componentDidMount() {
    if (this.state.value) this.getOptions();
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

    if (value) {
      Promise.resolve(this.props.getOptions(value)).then(data => this.setState({ options: data })).catch(err => console.error(err));
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
      />
    );
  }
}

Autocomplete.defaultProps = {
  options: [],
  value: '',
};

export default Autocomplete;
