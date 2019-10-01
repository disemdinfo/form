import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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

const Input = ({ children, id, error, info, inputStyle, submited, ...props }) => (
  <div error={error} style={inputStyle} className={`input-container ${error ? 'input-error' : ''}`} >               
    {children}          
    <div className="footer">
      {submited && <small className="error">{error}</small>}
      <small className="info">{info}</small>
    </div>
  </div>
);

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isValid: false,
      // submited: false,      
    };

    this.state.children = this.getInputs(props.children);    
  }

  componentDidMount() {
    this.props.isValid(isValidForm());
  }

  componentWillReceiveProps({ children, submited }) {
    if (children !== this.props.children) this.setInputs(children);    
    if(submited !== this.props.submited) this.setState({ submited }, () => this.setInputs(children));
  }

  setInputs(children){
    this.setState({ children: this.getInputs(children) }, () => {
      const isValid = isValidForm();        
      if (isValid !== this.state.isValid) {
        this.setState({ isValid }, () => this.props.isValid(isValid));
      }
    });
  }

  getInputs(children) {
    if (!isObject(children)) {
      return children;
    } else if (isArray(children)) {
      return children.map(c => this.getInputs(c));
    } else if (children.props.hide) {
      return null;
    } else if (children.props.children) {
      return { ...children, props: { ...children.props, children: this.getInputs(children.props.children) } };
    } else if (!children.props.id) {
      return children;
    }

    return (
      <Input
        {...children.props}
        inputStyle={this.props.inputStyle}        
        error={getError(children.props)}
        submited={this.state.submited}
      >
        {children}
      </Input>);
  }

  render() {
    const { actions, onSubmit, width, style, ...props } = this.props;
    const { children, isValid } = this.state;    
    return (
      <div className="container" style={{ width, ...style }} {...props}>
        <div className="form">
          {children}
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
  inputStyle: {
    width: '100%',
  },
};

// export default connect(() => {}, { msg })(Form);
export default (Form);


