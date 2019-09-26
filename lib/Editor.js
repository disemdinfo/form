'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _draftJs = require('draft-js');

var _reactDraftWysiwyg = require('react-draft-wysiwyg');

var _draftjsToHtml = require('draftjs-to-html');

var _draftjsToHtml2 = _interopRequireDefault(_draftjsToHtml);

var _api = require('~/lib/api');

var _constants = require('~/lib/constants');

require('react-draft-wysiwyg/dist/react-draft-wysiwyg.css');

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
// import htmlToDraft from 'html-to-draftjs';


function createMarkup(text) {
  return { __html: text };
}

function uploadFile(file) {
  var formData = new FormData();
  formData.append('file', file);

  return _api.uploadApi.post('/upload/1', formData).then(function (response) {
    var data = response.data;

    return { data: { id: 1, nome: file.name, link: _constants.ARQUIVO_URL + '/' + data.id } };
  });
}

function isRaw(value) {
  return (/entityMap/g.test(value)
  );
}

// suport html and draft string {"entityMap"...}
function toContentState(value) {
  if (!value) return null;
  if (isRaw(value)) {
    return (0, _draftJs.convertFromRaw)(JSON.parse(value));
  }
  // const contentBlock = htmlToDraft(value);
  // return contentBlock ? ContentState.createFromBlockArray(contentBlock.contentBlocks) : null;
  return null;
}

function toEditorState(value) {
  var contentState = toContentState(value);
  return contentState ? _draftJs.EditorState.createWithContent(contentState) : null;
}

function toContentString(editorState) {
  var content = (0, _draftJs.convertToRaw)(editorState.getCurrentContent());
  return JSON.stringify(content);
}

function toHtml(editorState) {
  return createMarkup((0, _draftjsToHtml2.default)((0, _draftJs.convertToRaw)(editorState.getCurrentContent())));
}

function toText(editorState) {
  return (0, _draftJs.convertToRaw)(editorState.getCurrentContent()).blocks.reduce(function (a, b) {
    return a.concat(b.text + '\n');
  }, '');
}

var toolbarOptions = {
  image: {
    uploadCallback: function uploadCallback(file) {
      return uploadFile(file);
    },

    previewImage: true
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'Blockquote', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined
  },
  options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history']
};

var DraftJs = function (_React$Component) {
  _inherits(DraftJs, _React$Component);

  function DraftJs(props) {
    _classCallCheck(this, DraftJs);

    var _this = _possibleConstructorReturn(this, (DraftJs.__proto__ || Object.getPrototypeOf(DraftJs)).call(this, props));

    _this.state = {
      editorState: toEditorState(props.value),
      new: true
    };

    _this.onChange = function (editorState) {
      return _this.setState({ editorState: editorState }, function () {
        return props.onChange({
          content: toContentString(_this.state.editorState),
          html: toHtml(_this.state.editorState),
          text: toText(_this.state.editorState)
        });
      });
    };

    _this.setEditor = function (editor) {
      _this.editor = editor;
    };

    _this.focusEditor = function () {
      if (_this.editor) {
        _this.editor.focus();
      }
    };
    return _this;
  }

  _createClass(DraftJs, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(_ref) {
      var value = _ref.value;

      if (value !== this.props.value && this.state.new) {
        this.setState({ editorState: toEditorState(value), new: false });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { style: this.props.style },
        _react2.default.createElement(_reactDraftWysiwyg.Editor, {
          ref: this.setEditor,
          editorState: this.state.editorState,
          onEditorStateChange: this.onChange,
          handlePastedText: this.handlePastedText,
          toolbar: toolbarOptions
        })
      );
    }
  }]);

  return DraftJs;
}(_react2.default.Component);

DraftJs.propTypes = {
  onChange: _propTypes2.default.func.isRequired,
  value: _propTypes2.default.string
};

DraftJs.defaultProps = {
  value: null,
  style: {
    border: '1px solid rgba(0, 0, 0, 0.12)',
    borderRadius: 4,
    background: 'white',
    minHeight: 300
  }
};

exports.default = DraftJs;