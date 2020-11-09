import { Button, Input, Modal, Tag } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';
import Heading from '../components/Heading';
import axiosInstance from '../utils/api';
import './AddBlog.scss'


export default function AddBlog() {
  const [ editorHtml, setEditorHtml ] = useState('');
  const [title, setTitle] = useState('');
  const [ preview, setPreview ] = useState(false);
  const history = useHistory();
  const [ tags, setTags ] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('')

  const handleClose = (removedTag: any) => {
    const _tags = tags.filter(tag => tag !== removedTag);
    console.log(_tags);
    setTags(_tags);
  };

  const showInput = () => {
    setInputVisible(true)
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value)
  };

  const handleInputConfirm = () => {
    let _tags:any = tags;
    let input:string = inputValue
    if (inputValue && _tags.indexOf(input) === -1) {
      _tags = [...tags, inputValue];
    }
    console.log(tags);
    setInputValue('');
    setInputVisible(false);
    setTags(_tags);
    
  };

  const forMap = (tag: any) => {
    const tagElem = (
      <Tag
        closable
        onClose={e => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span key={tag} style={{ display: 'inline-block' }}>
        {tagElem}
      </span>
    );
  };

  const handleModal = () => {
    setPreview(false);
  }

  const handleSave = (e: any) => {
    axiosInstance.post('/api/admin/blog', {
      title,
      content: editorHtml
    }).then((res: any) => {
      console.log(res);
      history.push('/dashboard');
    }).catch(err => console.log(err));
  }

  const modules = { 
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
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ]

  const handlePreview = () => {
    setPreview(true);
  }

  const tagChild = tags.map(forMap);

  return (
    <div className="blog-container">
      <Heading text="Add Blog" size="36" weight="bold" />
      <div className="editor-section" style={{width: '700px'}}>
        <div className="editor" style={{width: '400px'}}>
          <Input type="text" placeholder="Title..." style={{width: '400px'}} onChange={ e =>setTitle(e.target.value) }/>
          <div style={{ marginBottom: 16 }}>
          <TweenOneGroup
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: e => {
                e.target.style.margin = '0';
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tagChild}
          </TweenOneGroup>
          {inputVisible && (
          <Input
            type="text"
            ref={input => input && input.focus()}
            size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputConfirm}
            onPressEnter={handleInputConfirm}
          />
        )}
        {!inputVisible && (
          <Tag onClick={showInput} className="site-tag-plus">
            + New Tag
          </Tag>
        )}
        </div>
          <ReactQuill 
            theme='snow'
            onChange={setEditorHtml}
            value={editorHtml}
            modules={modules}
            formats={formats}
            placeholder='Write Something...'
            style={{width: "400px", backgroundColor: 'green'}}
          />
        </div>
        <div className="preview" style={{width: "400px", wordWrap: 'break-word', backgroundColor: 'red'}}>
          <p dangerouslySetInnerHTML={{__html: editorHtml}}></p>
        </div>
      </div>

       {/* <Button type="primary" onClick={handlePreview}>Preview</Button> */}
       <Button onClick={handleSave} type="primary">Save</Button>
       {/* <Modal
          title="Preview"
          visible={preview}
          onOk={handleModal}
          onCancel={handleModal}
          closable={true}
          footer={null}
        >
          <div dangerouslySetInnerHTML={{__html: editorHtml}}></div>
        </Modal> */}
    </div>
  )
}
