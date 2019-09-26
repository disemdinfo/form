'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.msg = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
// import { teste } from '~/store/params';


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

require('./form.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var msg = exports.msg = function msg(text) {
  return function (dispatch) {
    return dispatch({ type: 'SUCCESS', msg: text });
  };
};

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

var Form = function (_Component) {
  _inherits(Form, _Component);

  function Form(props) {
    _classCallCheck(this, Form);

    var _this = _possibleConstructorReturn(this, (Form.__proto__ || Object.getPrototypeOf(Form)).call(this, props));

    _this.state = {
      isValid: true,
      submited: false,
      message: ''
    };

    _this.state.children = _this.getElements(props.children);
    _this.onSubmit = _this.onSubmit.bind(_this);
    _this.onClickAction = _this.onClickAction.bind(_this);
    return _this;
  }

  _createClass(Form, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.props.isValid(isValidForm());
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var _this2 = this;

      var children = _ref.children;

      if (children !== this.props.children) {
        this.setState({ children: this.getElements(children) }, function () {
          var isValid = isValidForm();
          if (isValid !== _this2.state.isValid) {
            _this2.setState({ isValid: isValid }, function () {
              return _this2.props.isValid(isValid);
            });
          }
        });
      }
    }
  }, {
    key: 'onSubmit',
    value: function onSubmit() {
      var _this3 = this;

      this.setState({ submited: true }, function () {
        _this3.setState({ children: _this3.getElements(_this3.props.children) }, function () {
          _this3.setState({ isValid: isValidForm() }, function () {
            if (_this3.state.isValid) {
              // this.props.onSubmit({ message: (message, callback) => this.setState({ message, showMessage: true }, () => (callback ? setTimeout(callback, 3000) : null)) });
              _this3.props.onSubmit({ message: function message(_message, callback) {
                  _this3.props.msg(_message);
                  if (callback) callback();
                } });
            }
          });
        });
      });
    }
  }, {
    key: 'onClickAction',
    value: function onClickAction(_ref2) {
      var _this4 = this;

      var onClick = _ref2.onClick,
          params = _objectWithoutProperties(_ref2, ['onClick']);

      onClick(_extends({}, params, {
        message: function message(_message2, callback) {
          if (_message2) _this4.props.msg(_message2);
          if (callback) callback();
        } }));
    }
  }, {
    key: 'getElements',
    value: function getElements(children) {
      var _this5 = this;

      if (!isObject(children)) {
        return children;
      } else if (isArray(children)) {
        return children.map(function (c) {
          return _this5.getElements(c);
        });
      } else if (children.props.hide) {
        return null;
      } else if (children.props.children) {
        return _extends({}, children, { props: _extends({}, children.props, { children: this.getElements(children.props.children) }) });
      } else if (!children.props.id) {
        return children;
      }

      return _react2.default.createElement(
        _Container2.default,
        _extends({}, children.props, {
          inputStyle: this.props.inputStyle
          // error={this.state.submited ? getError(children.props) : null}
          , error: getError(children.props),
          submited: this.state.submited
        }),
        children
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _this6 = this;

      var _props = this.props,
          actions = _props.actions,
          onSubmit = _props.onSubmit,
          width = _props.width,
          style = _props.style,
          props = _objectWithoutProperties(_props, ['actions', 'onSubmit', 'width', 'style']);

      var _state = this.state,
          children = _state.children,
          isValid = _state.isValid,
          submited = _state.submited;


      return _react2.default.createElement(
        'div',
        _extends({ className: 'container', style: _extends({ width: width }, style) }, props),
        _react2.default.createElement(
          'div',
          { className: 'form' },
          children
        ),
        _react2.default.createElement(
          'div',
          { className: 'actions' },
          onSubmit && _react2.default.createElement(_Button2.default, { label: 'Salvar', onClick: onSubmit ? this.onSubmit : null, disabled: !isValid && submited }),
          actions.filter(function (a) {
            return a.hide !== true;
          }).map(function (_ref3) {
            var id = _ref3.id,
                actionProps = _objectWithoutProperties(_ref3, ['id']);

            return _react2.default.createElement(_Button2.default, _extends({}, actionProps, { key: id, onClick: function onClick() {
                return _this6.onClickAction(_extends({ id: id }, actionProps));
              } }));
          })
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
  msg: _propTypes2.default.func.isRequired,
  inputStyle: _propTypes2.default.object
};

Form.defaultProps = {
  onSubmit: null,
  actions: [],
  width: '100%',
  style: {},
  isValid: function isValid() {
    return false;
  }
};

// export default connect(() => {}, { msg })(Form);
exports.default = Form;