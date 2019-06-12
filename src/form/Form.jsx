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

function getErrors(children, submited) {
  return children.map((c) => {
    const error = getError(c.props);
    return ({
      ...c,
      props: {
        ...c.props,
        isValid: !error,
        error: submited ? getError(c.props) : null,
      },
    });
  });
}

function isValidForm(children) {
  return children.every(c => !c.props.isValid);
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

  componentWillReceiveProps(nextProps) {
    const { submited } = this.state;
    
    if (nextProps.children !== this.props.children) {
      const children = getErrors(nextProps.children, submited);
      this.setState({ children }, () => {
        const isValid = isValidForm(children);
        if (isValid !== this.state.isValid) {
          this.setState({ isValid }, () => this.props.isValid(isValid));
        }
      });
    }
  }

  onSubmit() {    
    this.setState({ children: getErrors(this.props.children, true), submited: true }, () => {
      if (this.state.isValid) {
        this.props.onSubmit()
        ;
      }
    });
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
  isValid: PropTypes.func,
};

Form.defaultProps = {
  onSubmit: null,
  actions: [],
  width: '100%',
  style: {},
  isValid: () => false,
};

export default Form;
