import { Button, Input, Modal, Popover, Tag, Tooltip, Upload } from 'antd';
import { title } from 'process';
import { TweenOneGroup } from 'rc-tween-one';
import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css';
import { useHistory } from 'react-router-dom';
import MiniDrawer from '../components/AppBar/AppBar';
import Heading from '../components/Heading';
import axiosInstance from '../utils/api';
// import S3FileUpload from 'react-s3';
import S3 from 'react-aws-s3';


import './AddBlog.scss'


export default function AddBlog() {
  const [ editorHtml, setEditorHtml ] = useState('');
  const [title, setTitle] = useState('');
  const [ preview, setPreview ] = useState(false);
  const history = useHistory();
  const [ tags, setTags ] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('')
  const config = {
    bucketName: 'ir-blog-cms',
    dirName: 'photos', /* optional */
    region: 'us-east-2',
    accessKeyId: 'AKIATKLQCRDAHIY3UZGJ',
    secretAccessKey: '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',
  }

  const ReactS3Client = new S3(config);


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

  let token:string = localStorage.getItem('token') || "";
  token = token.replace(/"/g, "");

  const handleSave = (e: any) => {
    e.preventDefault();
    axiosInstance.post('/api/v1/admin/blog',  
    {
      title,
      content: editorHtml,
      tags: tags.join(',')
    },
    {headers: {
      "Authorization" : token
    }}).then((res: any) => {
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

  // const [ fileList, setFileList ] = useState([]);
  
  const handleChange = ( e: any) => {
    e.preventDefault();
    let file = e.target.files[0];
    ReactS3Client
    .uploadFile(file)
    .then(data => console.log(data))
    .catch(err => console.error(err))

    // setFileList(fileList);
  }

  const tagChild = tags.map(forMap);
  // const uploadButton = (
  //   <div>
  //     +
  //     <div style={{ marginTop: 8 }}>Upload</div>
  //   </div>
  // );
  return (
    <div className="blog-container">
      <Heading text="Add Blog" size="36" weight="bold" />
      <div className="editor-section" style={{width: '90%'}}>
        <Input className="title" type="text" placeholder="Title..." style={{width: '600px'}} bordered={false} onChange={ e =>setTitle(e.target.value) }/>
        <div className="covers">
          <input type="file" onChange={handleChange} />

        {/* <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload> */}
          {/* <Tooltip title="Cover">
            <Button shape="circle">+</Button>
          </Tooltip> */}

        </div>
        <div className="tags">
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
      <div className="editor">
        <ReactQuill 
          theme='snow'
          onChange={setEditorHtml}
          value={editorHtml}
          modules={modules}
          formats={formats}
          placeholder='Write Something...'
        />
      </div>
    </div>
    <div className="button-bar">
      <Button type="primary" onClick={handlePreview}>Preview</Button>
      <Button onClick={handleSave} type="primary">Save</Button>
      <Button onClick={handleSave} type="primary">Save & Publish</Button>
    </div>
    <Modal
      title="Preview"
      visible={preview}
      onOk={handleModal}
      onCancel={handleModal}
      closable={true}
      footer={null}
      width={'90%'}
    >
      <div dangerouslySetInnerHTML={{__html: editorHtml}}></div>
    </Modal>
  </div>)
}
