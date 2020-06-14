import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onEditorStateChange = this.onEditorStateChange.bind(this);
    this.getBase64 = this.getBase64.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }

  componentWillMount() {
    if (this.props.editMode && this.props.contentToEdit) {
      const blocksFromHtml = htmlToDraft(this.props.contentToEdit);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);

      this.setState({ editorState });
    }
  }

  getBase64(file, callback) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => {};
  }

  uploadFile(file) {
    return new Promise((resolve, reject) => {
      this.getBase64(file, (data) => resolve({ data: { link: data } }));
    });
  }

  customizeToolbar() {
    return {
      inline: { inDropdown: true },
      list: { inDropdown: true },
      textAlign: { inDropdown: true },
      links: { inDropdown: true },
      history: { inDropdown: true },
      image: {
        uploadCallback: this.uploadFile,
        alt: { present: true, mandatory: false },
        previewImage: true,
        inputAccept: "image/gif,image/jpg,image/jpeg,image/png,image/svg",
      },
    };
  }

  onEditorStateChange(editorState) {
    this.setState(
      { editorState },
      this.props.handleRichTextEditorChange(
        draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
      )
    );
  }

  render() {
    return (
      <div className="rich-text-editor">
        <Editor
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={this.customizeToolbar()}
        />
      </div>
    );
  }
}
