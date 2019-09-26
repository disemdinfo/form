'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  container: {
    border: '1px solid rgba(0,0,0,0.125)',
    borderRadius: 4,
    background: '#FFF',
    marginBottom: 16
  },
  header: {
    padding: 20,
    borderBottom: '1px solid rgba(0,0,0,0.125)',
    color: '#212529',
    fontSize: 15
  },
  body: {
    padding: 20
  }

};
var Section = function Section(_ref) {
  var children = _ref.children,
      title = _ref.title,
      props = _objectWithoutProperties(_ref, ['children', 'title']);

  return _react2.default.createElement(
    'div',
    { style: styles.container },
    _react2.default.createElement(
      'div',
      { style: styles.header },
      title
    ),
    _react2.default.createElement(
      'div',
      { style: styles.body },
      children
    )
  );
};

Section.defaultProps = {};

exports.default = Section;