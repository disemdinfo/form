'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Cell = function Cell(_ref) {
  var children = _ref.children,
      style = _ref.style,
      width = _ref.width;
  return _react2.default.createElement(
    'div',
    { className: 'cell', style: _extends({ width: width }, style) },
    children
  );
};

Cell.defaultProps = {
  width: '100%',
  style: {
    marginTop: 8,
    marginBottom: 8,
    paddingRight: 4,
    paddingLeft: 4
  }
};

exports.default = Cell;