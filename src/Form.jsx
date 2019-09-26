import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// import { teste } from '~/store/params';
import Container from './Container';
import Button from './Button';
import './form.css';

export const msg = text => dispatch => dispatch({ type: 'SUCCESS', msg: text });

function isObject(o) {
  return o && typeof o === 'object';
}
function isArray(a) {
  return a && Array.isArray(a);
}
function getError(props) {
  if (props) {
    const { id, value, error, required, min, max, minlength, maxlength } = props;
    if (id) {
      if (required && value !== 0) {
        const text = 'Campo obrigatório.';
        if (Array.isArray(value)) {
          if (!value.length) return text;
        } else if (!value) return text;
      }

      if (min && value < min) return `Mínimo ${min}.`;
      if (minlength && value && value.length < minlength) return `Mínimo de ${minlength} caracteres.`;

      if (max && value > max) return `Máximo ${max}.`;
      if (maxlength && value && value.length > maxlength) return `Máximo de ${maxlength} caracteres.`;

      if (error) {
        return typeof error === 'function' ? error() : error;
      }
    }
  }

  return null;
}
function isValidForm() {
  return !document.getElementsByClassName('input-error').length;
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: true,
      submited: false,
      message: '',
    };

    this.state.children = this.getElements(props.children);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickAction = this.onClickAction.bind(this);
  }

  componentDidMount() {
    this.props.isValid(isValidForm());
  }

  componentWillReceiveProps({ children }) {
    if (children !== this.props.children) {
      this.setState({ children: this.getElements(children) }, () => {
        const isValid = isValidForm();
        if (isValid !== this.state.isValid) {
          this.setState({ isValid }, () => this.props.isValid(isValid));
        }
      });
    }
  }

  onSubmit() {
    this.setState({ submited: true }, () => {
      this.setState({ children: this.getElements(this.props.children) }, () => {
        this.setState({ isValid: isValidForm() }, () => {
          if (this.state.isValid) {
            // this.props.onSubmit({ message: (message, callback) => this.setState({ message, showMessage: true }, () => (callback ? setTimeout(callback, 3000) : null)) });
            this.props.onSubmit({ message: (message, callback) => {
              this.props.msg(message);
              if (callback) callback();
            } });
          }
        });
      });
    });
  }

  onClickAction({ onClick, ...params }) {
    onClick({ ...params,
      message: (message, callback) => {
        if (message) this.props.msg(message);
        if (callback) callback();
      } });
  }

  getElements(children) {
    if (!isObject(children)) {
      return children;
    } else if (isArray(children)) {
      return children.map(c => this.getElements(c));
    } else if (children.props.hide) {
      return null;
    } else if (children.props.children) {
      return { ...children, props: { ...children.props, children: this.getElements(children.props.children) } };
    } else if (!children.props.id) {
      return children;
    }

    return (
      <Container
        {...children.props}
        inputStyle={this.props.inputStyle}
        // error={this.state.submited ? getError(children.props) : null}
        error={getError(children.props)}
        submited={this.state.submited}
      >
        {children}
      </Container>);
  }


  render() {
    const { actions, onSubmit, width, style, ...props } = this.props;
    const { children, isValid, submited } = this.state;

    return (
      <div className="container" style={{ width, ...style }} {...props}>
        <div className="form">
          {children}
        </div>
        <div className="actions">
          {onSubmit && <Button label="Salvar" onClick={onSubmit ? this.onSubmit : null} disabled={!isValid && submited} />}
          {actions.filter(a => a.hide !== true).map(({ id, ...actionProps }) => <Button {...actionProps} key={id} onClick={() => this.onClickAction({ id, ...actionProps })} />)}
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
  msg: PropTypes.func.isRequired,
  inputStyle: PropTypes.object,
};

Form.defaultProps = {
  onSubmit: null,
  actions: [],
  width: '100%',
  style: {},
  isValid: () => false,
};

// export default connect(() => {}, { msg })(Form);
export default (Form);


