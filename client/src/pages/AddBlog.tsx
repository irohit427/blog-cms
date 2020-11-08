import { Button, Modal } from 'antd';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';


export default function AddBlog() {
  const [ editorHtml, setEditorHtml ] = useState('');
  const [ preview, setPreview ] = useState(false);

  const handleModal = () => {
    setPreview(false);
  }

  const modules = {
    ImageResize: {
      modules: [ 'Resize', 'DisplaySize', 'Toolbar' ]
    }, 
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    }
  }

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  const handlePreview = () => {
    setPreview(true);
  }
  return (
    <div>
      Add Blog
      <div>
        <ReactQuill 
          theme='snow'
          onChange={setEditorHtml}
          value={editorHtml}
          modules={modules}
          formats={formats}
          placeholder='Write Something...'
         />
       </div>
       <Button type="primary" onClick={handlePreview}>Preview</Button>
       <Button>Save</Button>
       <Modal
          title="Preview"
          visible={preview}
          onOk={handleModal}
          onCancel={handleModal}
          closable={true}
          footer={null}
        >
          <div dangerouslySetInnerHTML={{__html: editorHtml}}></div>
        </Modal>
    </div>
  )
}
