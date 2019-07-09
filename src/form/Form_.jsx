import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import SnackBar from './SnackBar.jsx';
import './Form.css';


function isObject(o) {
  return typeof o === 'object' && !Array.isArray(o);
}
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
      return typeof error === 'function' ? error() : error;
    }
  }

  return null;
}

function getErrors(children, submited) {
  return children.map((c) => {
    if (!isObject(c)) return c;
    const error = c.props ? getError(c.props) : null;
    return ({
      ...c,
      props: {
        ...c.props,
        isValid: !error,
        error: submited ? error : null,
      },
    });
  });
}


function getChildren(children) {
  return Array.isArray(children) ? children : [children];
}
function isValidForm(children) {
  return children.filter(c => isObject(c)).every(c => c.props.isValid);
}

class Form extends Component {
  constructor(props) {
    super(props);

    const { children } = props;

    this.state = {
      children: getChildren(children),
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { submited } = this.state;
    console.log('******');
    if (nextProps.children !== this.props.children) {
      let children = getChildren(nextProps.children);

      children = getErrors(children, submited);

      this.setState({ children }, () => {
        const isValid = isValidForm(children);
        if (isValid !== this.state.isValid) {
          this.setState({ isValid }, () => this.props.isValid(isValid));
        }
      });
    }
  }

  onSubmit() {
    this.setState({ children: getErrors(this.state.children, true), submited: true }, () => {
      if (this.state.isValid) {
        this.props.onSubmit({ message: message => this.setState({ message, showMessage: true }) });
      }
    });
  }

  render() {
    const { actions, onSubmit, width, style, isValid, ...props } = this.props;
    const { children, message } = this.state;

    return (
      <div className="container" style={{ width, ...style }} {...props}>
        <div className="form">
          {children}
        </div>
        <div className="actions">
          <Button label="Salvar" onClick={onSubmit ? this.onSubmit : null} />
          {actions.map((action, key) => <Button key={key} {...action} />)}
        </div>
        <SnackBar
          show={this.state.showMessage}
          onHide={() => this.setState({ showMessage: false })}
        >
          {message}
        </SnackBar>
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
