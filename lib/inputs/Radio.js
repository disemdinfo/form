'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ComponentContainer = require('./ComponentContainer');

var _ComponentContainer2 = _interopRequireDefault(_ComponentContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function isJson(str) {
  if (Number(str)) return false;
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

var Radio = function Radio(_ref) {
  var id = _ref.id,
      value = _ref.value,
      label = _ref.label,
      options = _ref.options,
      _onChange = _ref.onChange,
      props = _objectWithoutProperties(_ref, ['id', 'value', 'label', 'options', 'onChange']);

  return _react2.default.createElement(
    _ComponentContainer2.default,
    { label: label },
    _react2.default.createElement(
      'div',
      { className: 'input-radio-container' },
      options.map(function (option) {
        return _react2.default.createElement(
          'label',
          { htmlFor: id, className: 'input-radio' },
          _react2.default.createElement('input', _extends({}, props, {
            type: 'radio',
            id: id,
            name: id,
            value: option.value,
            checked: value == option.value,
            onChange: function onChange(e) {
              var v = e.target.value;
              if (isJson(v)) v = JSON.parse(v);
              _onChange({ id: id, value: v });
            }
          })),
          _react2.default.createElement(
            'span',
            null,
            option.label
          )
        );
      })
    )
  );
};

Radio.defaultProps = {
  options: []
};

exports.default = Radio;