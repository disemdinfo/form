'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSwitch = require('react-switch');

var _reactSwitch2 = _interopRequireDefault(_reactSwitch);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  container: {
    display: 'flex',
    alignItems: 'center'
  },
  switch: {
    marginLeft: 10,
    marginRight: 10
  }
};
var SwitchInput = function SwitchInput(_ref) {
  var _onChange = _ref.onChange,
      id = _ref.id,
      width = _ref.width,
      leftLable = _ref.leftLable,
      rightLabel = _ref.rightLabel,
      label = _ref.label,
      inputProps = _objectWithoutProperties(_ref, ['onChange', 'id', 'width', 'leftLable', 'rightLabel', 'label']);

  var height = width * 0.4166;
  var handleDiameter = width * 0.625;
  return _react2.default.createElement(
    'label',
    { htmlFor: 'material-switch', style: styles.container },
    _react2.default.createElement(
      _Label2.default,
      null,
      leftLable
    ),
    _react2.default.createElement(
      'div',
      { style: styles.switch },
      _react2.default.createElement(_reactSwitch2.default, _extends({}, inputProps, {
        id: id,
        width: width,
        height: height,
        handleDiameter: handleDiameter,
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.6)',
        activeBoxShadow: '0px 0px 1px 10px rgba(0, 0, 0, 0.2)',
        onChange: function onChange(checked) {
          return _onChange({ id: id, value: checked });
        }
      }))
    ),
    _react2.default.createElement(
      _Label2.default,
      null,
      rightLabel || label
    )
  );
};

SwitchInput.defaultProps = {
  checked: false,
  checkedIcon: false,
  uncheckedIcon: false,
  width: 40,
  // height: 20,
  // handleDiameter: 30,
  onColor: '#86d3ff',
  onHandleColor: '#1976d2',
  className: 'react-switch',
  onChange: function onChange() {}
};

exports.default = SwitchInput;