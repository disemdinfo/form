import React from 'react';
import PropTypes from 'prop-types';
import { EditorState, ContentState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
// import htmlToDraft from 'html-to-draftjs';
import { uploadApi } from '~/lib/api';
import { ARQUIVO_URL } from '~/lib/constants';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './Editor.scss';

const styles = {
  editor: {
    // border: '1px solid rgba(0, 0, 0, 0.12)',
    marginTop: 33,
    // minHeight: '12em',
  },
};

function createMarkup(text) {
  return { __html: text };
}

function uploadFile(file) {
  const formData = new FormData();
  formData.append('file', file);

  return uploadApi.post('/upload/1', formData).then((response) => {
    const { data } = response;
    return { data: { id: 1, nome: file.name, link: `${ARQUIVO_URL}/${data.id}` } };
  });
}

function isRaw(value) {
  return /entityMap/g.test(value);
}

// suport html and draft string {"entityMap"...}
function toContentState(value) {
  if (!value) return null;
  if (isRaw(value)) {
    return convertFromRaw(JSON.parse(value));
  }
  // const contentBlock = htmlToDraft(value);
  // return contentBlock ? ContentState.createFromBlockArray(contentBlock.contentBlocks) : null;
  return null;
}

function toEditorState(value) {
  const contentState = toContentState(value);
  return contentState ? EditorState.createWithContent(contentState) : null;
}

function toContentString(editorState) {
  const content = convertToRaw(editorState.getCurrentContent());
  return JSON.stringify(content);
}

function toHtml(editorState) {
  return createMarkup(draftToHtml(convertToRaw(editorState.getCurrentContent())));
}

function toText(editorState) {
  return convertToRaw(editorState.getCurrentContent()).blocks.reduce((a, b) => a.concat(`${b.text}\n`), '');
}

const toolbarOptions = {
  image: {
    uploadCallback(file) {
      return uploadFile(file);
    },
    previewImage: true,
  },
  blockType: {
    inDropdown: true,
    options: ['Normal', 'Blockquote', 'Code'],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  options: [
    'inline',
    'blockType',
    'fontSize',
    'fontFamily',
    'list',
    'textAlign',
    'colorPicker',
    'link',
    'embedded',
    'emoji',
    'image',
    'remove',
    'history',
  ],
};

class DraftJs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: toEditorState(props.value),
      new: true,
    };

    this.onChange = editorState => this.setState({ editorState }, () => props.onChange({
      content: toContentString(this.state.editorState),
      html: toHtml(this.state.editorState),
      text: toText(this.state.editorState),
    }));

    this.setEditor = (editor) => {
      this.editor = editor;
    };

    this.focusEditor = () => {
      if (this.editor) {
        this.editor.focus();
      }
    };
  }

  // static getDerivedStateFromProps(props, state) {
  //   const { value } = props;

  //   //   console.log('state', state.prevValue);
  //   if (value !== state.prevValue && !state.prevValue) {
  //     console.log('value', value);
  //     //   console.log('value', value);
  //     //   console.log('state', state.prevValue);
  //     //   const editorState = toEditorState(value);
  //     //   console.log('editorState', editorState);
  //     return {
  //       prevValue: value,
  //       value,
  //       // editorState: editorState || state.editorState,
  //     };
  //   }
  //   return null;
  // }

  componentWillReceiveProps({ value }) {
    if (value !== this.props.value && this.state.new) {
      this.setState({ editorState: toEditorState(value), new: false });
    }
  }

  render() {
    return (
      <div style={styles.editor}>
        {/* <pre>{this.props.value}</pre> */}
        <Editor
          ref={this.setEditor}
          editorState={this.state.editorState}
          onEditorStateChange={this.onChange}
          handlePastedText={this.handlePastedText}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbar={toolbarOptions}
          style={{ height: 500 }}
        />
      </div>
    );
  }
}

DraftJs.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
};

DraftJs.defaultProps = {
  value: null,
};


export default DraftJs;
