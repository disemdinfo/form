import React, { Component } from 'react';
import Container from './Container';

class TextInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
    };
  }

  render() {
    const { maxLength, value } = this.props;
    const info = maxLength ? `${value.length} / ${maxLength}` : null;
    return (
      <Container {...this.props} info={info} error={this.props.error || this.state.error} >
        {({ onChange, onBlur, ...inputProps }) =>
          (<input
            {...inputProps}
            onChange={e => onChange({ e, id: e.target.id, value: e.target.value })}
            onBlur={(e) => {
              onBlur({ e, id: e.target.id, value: e.target.value, error: error => this.setState({ error }) });
            }
            }
            className="input"
          />)}
      </Container>
    )
    ;
  }
}

TextInput.defaultProps = {
  value: '',
  onBlur: () => null,
};

export default TextInput;
