import React, { useState, useEffect } from 'react'
import "codemirror/lib/codemirror.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import { Editor } from "@toast-ui/react-editor";
const Markdown = () => {
  const [editorValue, setEditorValue] = useState('')
  return (
    <Editor
      initialValue='请填写内容'
      previewStyle="vertical"
      height="600px"
      initialEditType="markdown"
      useCommandShortcut={true}
      editorValue={editorValue}
      onChange={e=>console.log(editorValue)}
    />
  );
};

export default Markdown;
