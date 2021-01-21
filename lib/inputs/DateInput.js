'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDatetime = require('react-datetime');

var _reactDatetime2 = _interopRequireDefault(_reactDatetime);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

require('react-datetime/css/react-datetime.css');

var _ComponentContainer = require('./ComponentContainer');

var _ComponentContainer2 = _interopRequireDefault(_ComponentContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var DateInput = function DateInput(_ref) {
  var label = _ref.label,
      onChange = _ref.onChange,
      id = _ref.id,
      value = _ref.value,
      closeOnSelect = _ref.closeOnSelect,
      timeFormat = _ref.timeFormat,
      isValidDate = _ref.isValidDate,
      minDate = _ref.minDate,
      maxDate = _ref.maxDate,
      props = _objectWithoutProperties(_ref, ['label', 'onChange', 'id', 'value', 'closeOnSelect', 'timeFormat', 'isValidDate', 'minDate', 'maxDate']);

  return _react2.default.createElement(
    _ComponentContainer2.default,
    { label: label },
    _react2.default.createElement(_reactDatetime2.default, _extends({}, props, {
      // id={id}
      // value={value ? moment(value) : null}
      // closeOnSelect={closeOnSelect}
      // timeFormat={timeFormat}
      // isValidDate={(current) => {
      //   const isValidMin = minDate ? current > minDate : true;
      //   const isValidMax = maxDate ? current <= maxDate : true;

      //   return isValidDate(current) && isValidMin && isValidMax;
      // }}
      // onChange={date => onChange({ id, value: date })}
      inputProps: { className: 'input input-date' }
    }))
  );
};

DateInput.defaultProps = {
  closeOnSelect: true,
  timeFormat: false,
  isValidDate: function isValidDate() {
    return true;
  }
};

exports.default = DateInput;