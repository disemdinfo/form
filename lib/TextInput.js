'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComponentContainer = require('./ComponentContainer');

var _ComponentContainer2 = _interopRequireDefault(_ComponentContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextInput = function (_Component) {
  _inherits(TextInput, _Component);

  function TextInput(props) {
    _classCallCheck(this, TextInput);

    var _this = _possibleConstructorReturn(this, (TextInput.__proto__ || Object.getPrototypeOf(TextInput)).call(this, props));

    _this.state = {
      error: null
    };
    return _this;
  }

  _createClass(TextInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          label = _props.label,
          maxLength = _props.maxLength,
          value = _props.value,
          _onChange = _props.onChange,
          _onBlur = _props.onBlur,
          style = _props.style,
          props = _objectWithoutProperties(_props, ['label', 'maxLength', 'value', 'onChange', 'onBlur', 'style']);

      var info = maxLength ? value.length + ' / ' + maxLength : null;
      return _react2.default.createElement(
        _ComponentContainer2.default,
        { label: label },
        _react2.default.createElement('input', _extends({}, props, {
          value: value,
          maxLength: maxLength,
          onChange: function onChange(e) {
            return _onChange({ e: e, id: e.target.id, value: e.target.value });
          },
          onBlur: function onBlur(e) {
            return _onBlur({ e: e, id: e.target.id, value: e.target.value, error: function error(_error) {
                return _this2.setState({ error: _error });
              } });
          },
          info: info,
          className: 'input',
          style: _extends({ width: '100%' }, style)
        }))
      );
    }
  }]);

  return TextInput;
}(_react.Component);

TextInput.defaultProps = {
  value: '',
  onBlur: function onBlur() {
    return null;
  },
  type: 'text'
};

exports.default = TextInput;