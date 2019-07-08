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

function getErrors(children, submited) {
  return children.map((c) => {
    if (!isObject(c) || !isArray(c)) return c;

    const props = c.props.children.props;
    const error = props ? getError(props) : null;

    const element = {
      ...c,
      props: {
        ...c.props,
        isValid: !error,
        error: submited ? error : null,
      },
    };
    return element;
  });
}

function getElements(children, props = {}) {
  if (!isObject(children)) {
    return children;
  } else if (isArray(children)) {
    return children.map(c => getElements(c, props));
  } else if (children.props.children) {
    return getElements(children.props.children, props);
  }

  const error = getError(children.props);
  const isValid = !error;

  return (
    <Container
      {...children.props}
      isValid={isValid}
      error={props.submited ? error : null}
    >
      {{ ...children }}
    </Container>);
}

function getInputs(children, props = {}) {
  const retorno = [];
  if (!isObject(children)) {
    console.log('1', children);
    // return null;
  } else if (isArray(children)) {
    console.log('2', children);
    // return children.map(c => getInputs(c, props));
  } else if (children.props.children) {
    console.log('3', children);
    // return getInputs(children.props.children, props);
  }
  console.log('4', children);
  return retorno;
}

function isValidForm(children) {
  return children.filter(c => isObject(c)).every(c => c.props.isValid);
}

class Form extends Component {
  constructor(props) {
    super(props);

    const { children } = props;

    this.state = {
      children: getElements(children),
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // const { submited } = this.state;

    // if (nextProps.children !== this.props.children) {
    //   let children = getElements(nextProps.children);

    //   children = getErrors(children, submited);

    //   this.setState({ children }, () => {
    //     const isValid = isValidForm(children);
    //     if (isValid !== this.state.isValid) {
    //       this.setState({ isValid }, () => this.props.isValid(isValid));
    //     }
    //   });
    // }
  }

  onSubmit() {
    console.log('getInputs', getInputs(this.state.children));

    this.setState({ submited: true, children: getElements(this.state.children, { submited: true }) }, () => {
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
