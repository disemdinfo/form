'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%'
  }
};
var Grid = function Grid(_ref) {
  var children = _ref.children,
      style = _ref.style;
  return _react2.default.createElement(
    'div',
    { className: 'grid', style: _extends({}, style, styles.container) },
    children
  );
};

Grid.defaultProps = {};

exports.default = Grid;