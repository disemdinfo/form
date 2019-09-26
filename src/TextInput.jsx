import React, { Component } from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  render() {
    const { maxLength, value, onChange, onBlur, style, ...props } = this.props;
    const info = maxLength ? `${value.length} / ${maxLength}` : null;
    return (
      <input
        {...props}
        value={value}
        maxLength={maxLength}
        onChange={e => onChange({ e, id: e.target.id, value: e.target.value })}
        onBlur={e => onBlur({ e, id: e.target.id, value: e.target.value, error: error => this.setState({ error }) })}
        info={info}
        className="input"
        style={{ width: '100%', ...style }}
      />);
  }
}

TextInput.defaultProps = {
  value: '',
  onBlur: () => null,
  type: 'text',
};

export default TextInput;
