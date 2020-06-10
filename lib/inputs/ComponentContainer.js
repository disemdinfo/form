'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Label = require('./Label');

var _Label2 = _interopRequireDefault(_Label);

require('./input.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var ComponentContainer = function ComponentContainer(_ref) {
    var children = _ref.children,
        label = _ref.label,
        style = _ref.style,
        info = _ref.info,
        props = _objectWithoutProperties(_ref, ['children', 'label', 'style', 'info']);

    return _react2.default.createElement(
        'div',
        { className: 'input-container', style: style },
        label && _react2.default.createElement(
            _Label2.default,
            null,
            label
        ),
        children,
        info && _react2.default.createElement(
            'div',
            { className: 'input-container-info' },
            info
        )
    );
};

ComponentContainer.defaultProps = {};

exports.default = ComponentContainer;