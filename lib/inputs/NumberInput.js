'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactCurrencyInput = require('react-currency-input');

var _reactCurrencyInput2 = _interopRequireDefault(_reactCurrencyInput);

var _ComponentContainer = require('./ComponentContainer');

var _ComponentContainer2 = _interopRequireDefault(_ComponentContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var NumberInput = function NumberInput(_ref) {
  var label = _ref.label,
      onChange = _ref.onChange,
      _onBlur = _ref.onBlur,
      value = _ref.value,
      prefix = _ref.prefix,
      suffix = _ref.suffix,
      inputProps = _objectWithoutProperties(_ref, ['label', 'onChange', 'onBlur', 'value', 'prefix', 'suffix']);

  return _react2.default.createElement(
    _ComponentContainer2.default,
    { label: label },
    _react2.default.createElement(_reactCurrencyInput2.default, _extends({}, inputProps, {
      value: (value || '').toString().replace('.', ','),
      prefix: prefix,
      suffix: suffix,
      onChangeEvent: function onChangeEvent(e) {
        return onChange({ e: e, id: e.target.id, value: Number(e.target.value.replace(/\./g, '').replace(',', '.').replace(prefix, '').replace(suffix, '')) });
      },
      onBlur: function onBlur(e) {
        return _onBlur({ e: e, id: e.target.id, value: Number(e.target.value.replace(/\./g, '').replace(',', '.').replace(prefix, '').replace(suffix, '')) });
      },
      className: 'input input-number'
    }))
  );
};

NumberInput.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.number
};

NumberInput.defaultProps = {
  value: undefined,
  decimalSeparator: ',',
  thousandSeparator: '.',
  precision: 2,
  prefix: undefined,
  suffix: undefined,
  onChange: function onChange() {
    return console.log('onChange não definido');
  },
  onBlur: function onBlur() {
    return null;
  }
};

exports.default = NumberInput;