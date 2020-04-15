'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

require('./form.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function isObject(o) {
  return o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === 'object';
}
function isArray(a) {
  return a && Array.isArray(a);
}
function getError(props) {
  if (props) {
    var id = props.id,
        value = props.value,
        error = props.error,
        required = props.required,
        min = props.min,
        max = props.max,
        minlength = props.minlength,
        maxlength = props.maxlength;

    if (id) {
      if (required && value !== 0) {
        var text = 'Campo obrigatório.';
        if (Array.isArray(value)) {
          if (!value.length) return text;
        } else if (!value) return text;
      }

      if (min && value < min) return 'M\xEDnimo ' + min + '.';
      if (minlength && value && value.length < minlength) return 'M\xEDnimo de ' + minlength + ' caracteres.';

      if (max && value > max) return 'M\xE1ximo ' + max + '.';
      if (maxlength && value && value.length > maxlength) return 'M\xE1ximo de ' + maxlength + ' caracteres.';

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

var Input = function Input(_ref) {
  var children = _ref.children,
      id = _ref.id,
      error = _ref.error,
      info = _ref.info,
      inputStyle = _ref.inputStyle,
      submited = _ref.submited,
      props = _objectWithoutProperties(_ref, ['children', 'id', 'error', 'info', 'inputStyle', 'submited']);

  return _react2.default.createElement(
    'div',
    { error: error, style: inputStyle, className: 'input-container ' + (error ? 'input-error' : '') },
    children,
    _react2.default.createElement(
      'div',
      { className: 'footer' },
      submited && _react2.default.createElement(
        'small',
        { className: 'error' },
        error
      ),
      _react2.default.createElement(
        'small',
        { className: 'info' },
        info
      )
    )
  );
};

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.state = {
      isValid: false
      // submited: false,      
    };

    _this.state.children = _this.getInputs(props.children);
    return _this;
  }

  _createClass(Form, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.isValid(isValidForm());
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var _this2 = this;

      var children = _ref2.children,
          submited = _ref2.submited;

      if (children !== this.props.children) this.setInputs(children);
      if (submited !== this.props.submited) this.setState({ submited: submited }, function () {
        return _this2.setInputs(children);
      });
    }
  }, {
    key: 'setInputs',
    value: function setInputs(children) {
      var _this3 = this;

      this.setState({ children: this.getInputs(children) }, function () {
        var isValid = isValidForm();
        if (isValid !== _this3.state.isValid) {
          _this3.setState({ isValid: isValid }, function () {
            return _this3.props.isValid(isValid);
          });
        }
      });
    }
  }, {
    key: 'getInputs',
    value: function getInputs(children) {
      var _this4 = this;

      if (!isObject(children)) {
        return children;
      } else if (isArray(children)) {
        return children.map(function (c) {
          return _this4.getInputs(c);
        });
      } else if (children.props.hide) {
        return null;
      } else if (children.props.children) {
        return _extends({}, children, { props: _extends({}, children.props, { children: this.getInputs(children.props.children) }) });
      } else if (!children.props.id) {
        return children;
      }

      return _react2.default.createElement(
        Input,
        _extends({}, children.props, {
          inputStyle: this.props.inputStyle,
          error: getError(children.props),
          submited: this.state.submited
        }),
        children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          actions = _props.actions,
          onSubmit = _props.onSubmit,
          width = _props.width,
          style = _props.style,
          props = _objectWithoutProperties(_props, ['actions', 'onSubmit', 'width', 'style']);

      var _state = this.state,
          children = _state.children,
          isValid = _state.isValid;

      return _react2.default.createElement(
        'div',
        _extends({ className: 'container', style: _extends({ width: width }, style) }, props),
        _react2.default.createElement(
          'div',
          { className: 'form' },
          children
        )
      );
    }
  }]);

  return Form;
}(_react.Component);

Form.propTypes = {
  children: _propTypes2.default.node.isRequired,
  onSubmit: _propTypes2.default.func,
  actions: _propTypes2.default.array,
  width: _propTypes2.default.string,
  style: _propTypes2.default.object,
  isValid: _propTypes2.default.func,
  inputStyle: _propTypes2.default.object
};

Form.defaultProps = {
  onSubmit: null,
  actions: [],
  width: '100%',
  style: {},
  isValid: function isValid() {
    return false;
  },
  inputStyle: {
    width: '100%'
  }
};

exports.default = Form;