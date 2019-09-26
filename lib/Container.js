'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

require('./input.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var styles = {
  inputStyle: {
    paddingRight: 4,
    paddingLeft: 4
  }
};
var Label = function Label(_ref) {
  var children = _ref.children,
      htmlFor = _ref.htmlFor;
  return _react2.default.createElement(
    'label',
    { htmlFor: htmlFor, className: 'label' },
    children
  );
};

var Container = function Container(_ref2) {
  var children = _ref2.children,
      label = _ref2.label,
      id = _ref2.id,
      error = _ref2.error,
      info = _ref2.info,
      inputWidth = _ref2.inputWidth,
      inputStyle = _ref2.inputStyle,
      actions = _ref2.actions,
      submited = _ref2.submited,
      props = _objectWithoutProperties(_ref2, ['children', 'label', 'id', 'error', 'info', 'inputWidth', 'inputStyle', 'actions', 'submited']);

  return _react2.default.createElement(
    'div',
    { error: error, style: _extends({}, styles.inputStyle, inputStyle, { width: inputWidth }), className: 'input-container ' + (error ? 'input-error' : '') },
    label && _react2.default.createElement(
      Label,
      { htmlFor: id },
      label
    ),
    _react2.default.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center' } },
      _react2.default.createElement(
        'div',
        { style: { width: '100%' } },
        children
      ),
      actions.map(function (action) {
        return action;
      })
    ),
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

Container.propTypes = {
  children: _propTypes2.default.node.isRequired,
  label: _propTypes2.default.func,
  id: _propTypes2.default.array.isRequired,
  error: _propTypes2.default.string,
  info: _propTypes2.default.object,
  inputWidth: _propTypes2.default.func,
  inputStyle: _propTypes2.default.object,
  actions: _propTypes2.default.object,
  submited: _propTypes2.default.bool
};

Container.defaultProps = {
  label: null,
  error: null,
  info: null,
  submited: false,
  value: '',
  actions: [],
  inputWidth: '100%',
  inputStyle: {
    marginBottom: 16
  }
};

exports.default = Container;