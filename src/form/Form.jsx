import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Form.css';
import Button from './Button.jsx';

function getError({ id, value, error, required, min, max }) {
  if (id) {
    if (required && value !== 0) {
      const text = 'Campo obrigatório.';
      if (Array.isArray(value)) {
        if (!value.length) return text;
      } else if (!value) return text;
    }

    if (min) {
      if (value < min) return `Mínimo ${min}.`;
    }

    if (max) {
      if (value > max) return `Máximo ${max}.`;
    }

    if (error) {
      return error();
    }
  }

  return null;
}

function getErrors(children) {
  return children.map(c => ({
    ...c,
    props: {
      ...c.props,
      error: getError(c.props),
    },
  }));
}

class Form extends Component {
  constructor(props) {
    super(props);

    const { children } = props;

    this.state = {
      children,
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps({ children }) {
    if (children !== this.props.children) {
      this.setState({ children: this.state.submited ? getErrors(children) : children });
    }
  }

  onSubmit() {
    const children = getErrors(this.props.children);
    const isValid = children.every(c => !c.props.error);
    this.setState({ children, submited: true }, () => this.props.onSubmit({ isValid }));
  }

  render() {
    const { actions, onSubmit, width, style, ...props } = this.props;
    const { children } = this.state;

    return (
      <div className="container" style={{ width, ...style }} {...props}>
        <div className="form">
          {children}
        </div>
        <div className="actions">
          <Button label="Salvar" onClick={onSubmit ? this.onSubmit : null} />
          {actions.map((action, key) => <Button key={key} {...action} />)}
        </div>
      </div>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func,
  actions: PropTypes.array,
  width: PropTypes.string,
  style: PropTypes.object,
};

Form.defaultProps = {
  onSubmit: null,
  actions: [],
  width: '100%',
  style: {},
};

export default Form;
