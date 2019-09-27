'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _async = require('react-select/async');

var _async2 = _interopRequireDefault(_async);

var _ComponentContainer = require('./ComponentContainer');

var _ComponentContainer2 = _interopRequireDefault(_ComponentContainer);

require('./react-select.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function convertOptions(_ref) {
  var options = _ref.options,
      optionValue = _ref.optionValue,
      optionLabel = _ref.optionLabel,
      labelRenderer = _ref.labelRenderer;

  return options.map(function (option) {
    return { value: option[optionValue], label: labelRenderer ? labelRenderer(option) : option[optionLabel] };
  });
}

var SelectAsync = function (_PureComponent) {
  _inherits(SelectAsync, _PureComponent);

  function SelectAsync(props) {
    _classCallCheck(this, SelectAsync);

    var _this = _possibleConstructorReturn(this, (SelectAsync.__proto__ || Object.getPrototypeOf(SelectAsync)).call(this, props));

    _this.state = {
      value: props.value
    };

    _this.promiseOptions = _this.promiseOptions.bind(_this);
    return _this;
  }

  _createClass(SelectAsync, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var value = this.state.value;

      if (value) {
        this.setValue(value);
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref2) {
      var value = _ref2.value;

      if (value !== this.props.value) {
        this.setValue(value);
      }
    }
  }, {
    key: 'setValue',
    value: function setValue(value) {
      var _this2 = this;

      Promise.resolve(this.props.getOptions(value)).then(function (data) {
        _this2.setState({ value: data[0] });
      });
    }
  }, {
    key: 'promiseOptions',
    value: function promiseOptions(inputValue) {
      var _this3 = this;

      // if (inputValue) {
      return new Promise(function (resolve) {
        setTimeout(function () {
          resolve(_this3.props.getOptions(inputValue, _this3.props.params));
        }, 500);
      });
      // }
      // return Promise.resolve();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          label = _props.label,
          isMulti = _props.isMulti,
          value = _props.value,
          getOptions = _props.getOptions,
          _onChange = _props.onChange,
          id = _props.id,
          optionValue = _props.optionValue,
          optionLabel = _props.optionLabel,
          labelRenderer = _props.labelRenderer,
          style = _props.style,
          inputProps = _objectWithoutProperties(_props, ['label', 'isMulti', 'value', 'getOptions', 'onChange', 'id', 'optionValue', 'optionLabel', 'labelRenderer', 'style']);

      return _react2.default.createElement(
        _ComponentContainer2.default,
        { label: label },
        _react2.default.createElement(_async2.default, _extends({}, inputProps, {
          loadOptions: this.promiseOptions,
          value: this.state.value || '',
          cacheOptions: true,
          defaultOptions: true,
          onChange: function onChange(v) {
            return _onChange(_extends({}, v, { id: id }));
          },
          styles: { container: function container(provided) {
              return _extends({}, provided, style);
            }, menu: function menu(provided) {
              return _extends({}, provided, { zIndex: 999 });
            } }
        }))
      );
    }
  }]);

  return SelectAsync;
}(_react.PureComponent);

SelectAsync.defaultProps = {
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
  }
  // params: {
  //   limit: 10,
  // },
  // getOptionLabel: option => null,
};

exports.default = SelectAsync;