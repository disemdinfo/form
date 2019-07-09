import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Container from './Container';
import Button from './Button';
import SnackBar from './SnackBar.jsx';
import './Form.css';

function isObject(o) {
  return o && typeof o === 'object';
}
function isArray(o) {
  return o && Array.isArray(o);
}
function getError(props) {
  if (props) {
    const { id, value, error, required, min, max } = props;
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
  }

  return null;
}
function isValidForm() {
  // console.log(document.getElementsByClassName('input-error'));
  return !document.getElementsByClassName('input-error').length;
}

function getElements(children, props = {}) {
  if (!isObject(children)) {
    return children;
  } else if (isArray(children)) {
    return children.map(c => getElements(c, props));
  } else if (children.props.children) {
    return { ...children, props: { ...children.props, children: getElements(children.props.children, props) } };
  } else if (!children.props.id) {
    return children;
  }

  return <Container {...children.props} error={props.submited ? getError(children.props) : null} >{children}</Container>;
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      submited: false,
      message: '',
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  // static getDerivedStateFromProps(props, state) {
  //   console.log(props.children, state.children);
  // }

  componentWillReceiveProps() {
    const isValid = isValidForm();
    if (isValid !== this.state.isValid) {
      this.setState({ isValid }, () => this.props.isValid(isValid));
    }
  }

  onSubmit() {
    this.setState({ submited: true }, () => {
      this.setState({ isValid: isValidForm() }, () => {
        if (this.state.isValid) {
          this.props.onSubmit({ message: (message, callback) => this.setState({ message, showMessage: true }, () => (callback ? setTimeout(callback, 3000) : null)) });
        }
      });
    });
  }


  render() {
    const { actions, onSubmit, width, style, ...props } = this.props;
    const { message, submited, isValid } = this.state;

    return (
      <div className="container" style={{ width, ...style }} {...props}>
        <div className="form">
          {getElements(this.props.children, { submited })}
        </div>
        <div className="actions">
          <Button label="Salvar" onClick={onSubmit ? this.onSubmit : null} disabled={!isValid} />
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
