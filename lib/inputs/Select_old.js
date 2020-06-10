'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _ComponentContainer = require('./ComponentContainer');

var _ComponentContainer2 = _interopRequireDefault(_ComponentContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import './react-select.css';

function convertOptions(_ref) {
  var options = _ref.options,
      optionValue = _ref.optionValue,
      optionLabel = _ref.optionLabel,
      labelRenderer = _ref.labelRenderer;

  return options.map(function (option) {
    return _extends({}, option, { value: option[optionValue], label: labelRenderer ? labelRenderer(option) : option[optionLabel] });
  });
}

var InputSelect = function (_PureComponent) {
  _inherits(InputSelect, _PureComponent);

  function InputSelect(props) {
    _classCallCheck(this, InputSelect);

    var _this = _possibleConstructorReturn(this, (InputSelect.__proto__ || Object.getPrototypeOf(InputSelect)).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(InputSelect, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          isMulti = _props.isMulti,
          value = _props.value,
          _onChange = _props.onChange,
          id = _props.id,
          optionValue = _props.optionValue,
          optionLabel = _props.optionLabel,
          labelRenderer = _props.labelRenderer,
          style = _props.style,
          inputProps = _objectWithoutProperties(_props, ['label', 'isMulti', 'value', 'onChange', 'id', 'optionValue', 'optionLabel', 'labelRenderer', 'style']);

      var options = convertOptions({ options: this.props.options, optionValue: optionValue, optionLabel: optionLabel, labelRenderer: labelRenderer });

      return _react2.default.createElement(
        _ComponentContainer2.default,
        { label: label },
        _react2.default.createElement(_reactSelect2.default, _extends({}, inputProps, {
          closeMenuOnSelect: !isMulti,
          value: (isMulti ? options.filter(function (o) {
            return (Array.isArray(value) ? value : [value]).includes(o.value);
          }) : options.find(function (o) {
            return o.value === value;
          })) || '',
          options: options,
          ignoreAccents: true,
          isMulti: isMulti,
          id: id,
          styles: {
            container: function container(provided) {
              return _extends({}, provided, style);
            },
            menu: function menu(provided) {
              return _extends({}, provided, { zIndex: 999 });
            }
            //control: provided => ({ ...provided, height: 18, minHeight: 18 }),
            //placeholder: provided => ({ ...provided, height: 18, minHeight: 18 }),
            //valueContainer: provided => ({ ...provided, height: 18, minHeight: 18 }),
            //singleValue: provided => ({ ...provided, height: 18, minHeight: 18 }),
            //input: provided => ({ ...provided, height: 18, minHeight: 18 }),										
          },
          onChange: function onChange(v) {
            var nextValueFormatted = null;
            var selected = null;
            var diff = 0;

            if (isMulti) {
              var nextValue = v || [];
              var previousValue = value || [];
              diff = nextValue.length - previousValue.length;
              nextValueFormatted = nextValue.map(function (i) {
                return i.value;
              });
              if (diff < 0) {
                selected = previousValue.filter(function (v) {
                  return !nextValueFormatted.includes(v);
                })[0];
              } else {
                selected = nextValueFormatted.filter(function (v) {
                  return !previousValue.includes(v);
                })[0];
              }
            } else {
              nextValueFormatted = (v || {}).value;
            }

            _onChange(_extends({}, v, { id: id, value: nextValueFormatted, selected: selected, diff: diff }));
          }
        }))
      );
    }
  }]);

  return InputSelect;
}(_react.PureComponent);

InputSelect.defaultProps = {
  options: [],
  searchable: true,
  isMulti: false,
  optionValue: 'value',
  optionLabel: 'label',
  clearAllText: 'Remover todos',
  placeholder: '',
  noResultsText: 'Nenhum resultado encontrado.',
  onChange: function onChange() {
    return console.log('onchange não definido');
  },
  autoFocus: false
  // getOptionLabel: option => null,
};

exports.default = InputSelect;