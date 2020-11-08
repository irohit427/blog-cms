import React, { useState } from 'react'
import { Button, Card, Form, Image, Input, Modal, Select } from 'antd';
import Meta from 'antd/lib/card/Meta';

export default function Users() {
  const [ visibility, setVisibility ] = useState(false);
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };
  const { Option } = Select;

  function openAddUserModal() {
    setVisibility(true);
  }
  function handleOk() {
    setVisibility(false)
  }
  const handleCancel = () => {
    setVisibility(false);
  }
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo:any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="container">
      <h4>Users</h4>
      <Button type="primary" shape="circle" onClick={openAddUserModal}>
        <i className="fas fa-plus"></i>
      </Button>
      <Modal
          title="Add User"
          visible={visibility}
          onOk={handleOk}
          onCancel={handleCancel}
          closable={true}
          footer={null}
        >
          <Form {...layout}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            initialValues={{
              ['role']: 'moderator'
            }}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input user\'s email!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: 'Choose a role' }]}
            >
              <Select style={{ width: 120 }} >
                <Option value="admin">Admin</Option>
                <Option value="moderator">Moderator</Option>
              </Select>
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Button danger type="primary" onClick={handleCancel} >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" >
                Submit
              </Button>
            </Form.Item>
    </Form>
        </Modal>
      <br />
      <div>
        <h3>
          All Users
        </h3>
        <div>
          <Card
            style={{ width: 200 }}
            cover={
              <Image
                alt="user"
                width={160}
                src={window.location.origin + '/assets/images/user.svg'}
              />
            }
          >
            <Meta
              title="User 1"
            />
          </Card>
        </div>
      </div>
    </div>
  )
}
