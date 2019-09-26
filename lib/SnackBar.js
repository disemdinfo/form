'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SnackBar = function (_Component) {
  _inherits(SnackBar, _Component);

  function SnackBar(props) {
    _classCallCheck(this, SnackBar);

    var _this = _possibleConstructorReturn(this, (SnackBar.__proto__ || Object.getPrototypeOf(SnackBar)).call(this, props));

    _this.state = {
      showSnackBar: _this.props.show,
      timer: _this.props.timer
    };
    return _this;
  }

  _createClass(SnackBar, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this2 = this;

      var _state = this.state,
          showSnackBar = _state.showSnackBar,
          timer = _state.timer;

      if (showSnackBar !== nextProps.show) {
        this.setState({
          showSnackBar: nextProps.show,
          timer: nextProps.timer
        }, function () {
          setTimeout(function () {
            _this2.setState({ showSnackBar: false });
            _this2.props.onHide();
          }, timer);
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var showSnackBar = this.state.showSnackBar;


      var container = {
        position: 'fixed',
        left: '0px',
        bottom: '20px',
        width: '100%',
        WebkitTransition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
        transition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
        fontWeight: '500',
        textTransform: 'initial',
        willChange: 'transform',
        whiteSpace: 'nowrap',
        transform: 'translateY(20px)',
        WebkitTransform: 'translateY(20px)',
        fontSize: '14px',
        display: 'none',
        // opacity: 0,
        // display: '-webkit-box',
        // display: '-ms-flexbox',
        // display: 'flex',
        WebkitBoxAlign: 'center',
        msFlexAlign: 'center',
        alignItems: 'center',
        WebkitBoxPack: 'justify',
        msFlexPack: 'justify',
        justifyContent: 'space-between',
        lineHeight: '20px'
      };

      var snackbarStyle = {
        background: '#404040',
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: '3px',
        color: '#fff',
        paddingRight: '24px',
        paddingLeft: '24px',
        paddingTop: '24px',
        paddingBottom: '24px',
        textAlign: 'center',
        boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
        minWidth: 200
      };

      if (showSnackBar) {
        container.display = 'flex';
        // container.opacity = 1;
        container.transform = 'translateY(0)';
      }

      return _react2.default.createElement(
        'div',
        { style: container },
        _react2.default.createElement(
          'div',
          { style: snackbarStyle },
          this.props.children
        )
      );
    }
  }]);

  return SnackBar;
}(_react.Component);

exports.default = SnackBar;


SnackBar.propTypes = {
  show: _propTypes2.default.bool,
  timer: _propTypes2.default.number
};

SnackBar.defaultProps = {
  timer: 3000,
  show: false
};