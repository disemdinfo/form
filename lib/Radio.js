'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./form.css');

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

var styles = {
  container: {
    display: 'flex',
    padding: 6,
    fontSize: '1rem',
    fontWeight: 400,
    lineHeight: 1.5,
    color: '#212529'
  }
};
var Radio = function Radio(_ref) {
  var id = _ref.id,
      value = _ref.value,
      label = _ref.label,
      options = _ref.options,
      _onChange = _ref.onChange,
      props = _objectWithoutProperties(_ref, ['id', 'value', 'label', 'options', 'onChange']);

  return _react2.default.createElement(
    'div',
    { style: styles.container },
    options.map(function (option) {
      return _react2.default.createElement(
        'label',
        { htmlFor: id, style: { display: 'flex', marginLeft: 6, marginRight: 6 } },
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
  );
};

Radio.defaultProps = {
  options: []
};

exports.default = Radio;