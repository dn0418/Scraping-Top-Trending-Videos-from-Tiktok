import { Form } from "antd";
import React from "react";

const Agent3Form = ({handleSave}) => {
  return (
    <Form
      layout="vertical"
      onFinish={(values) => {}}
      className="mt-6 mb-10 flex flex-col items-center"
    >
      <img src={logoImage} className="mb-2 w-[4rem]" />
      <LogoText />
      <Form.Item
        label="Post Title"
        name="title"
        rules={[
          {
            required: true,
            min: 3,
          },
        ]}
        className="mb-1 mt-5 w-full"
      >
        <Input placeholder="Post Title..." />
      </Form.Item>
      <Form.Item
        label="Post Description"
        name="description"
        className="mb-5 w-full"
        rules={[
          {
            required: true,
            min: 5,
          },
        ]}
      >
        <Input placeholder="Post Descriptioni..." />
      </Form.Item>

      <Dragger
        name="image"
        multiple={false}
        beforeUpload={() => false}
        listType="picture-card"
        accept="image/*"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from
          uploading company data or other banned files.
        </p>
      </Dragger>
      <Row justify="end" className="gap-4">
        <Button>Cancel</Button>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="bg-[#3636f8] hover:bg-[#2828df]"
          >
            Create
          </Button>
        </Form.Item>
      </Row>
    </Form>
  );
};

export default Agent3Form;
