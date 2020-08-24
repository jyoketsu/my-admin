import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import { FieldData } from '../interfaces';

const { TextArea } = Input;

interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
  form: any;
  // onSubmit: (fields: any) => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const ProfileForm: React.FC<CustomizedFormProps> = ({ onChange, fields, form }) => {
  return (
    <Form
      {...layout}
      form={form}
      style={{ maxWidth: '500px' }}
      name="profile_form"
      fields={fields}
      onFieldsChange={(changedFields, allFields) => {
        onChange(allFields as FieldData[]);
      }}
      // onFinish={(values) => onSubmit(values)}
    >
      <Form.Item name="name" label="姓名" rules={[{ required: true, message: '请输入姓名！' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="about"
        label="自我介绍"
        rules={[
          { required: true, message: '请输入自我介绍！' },
          {
            max: 500,
            message: '不超过500个字符！',
          },
        ]}
      >
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item
        name="education"
        label="学历"
        rules={[{ required: true, message: '请输入学历！' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="location" label="地点" rules={[{ required: true, message: '请输入地点！' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="birthYear"
        label="出生日期"
        rules={[{ required: true, message: '请输入出生日期！' }]}
      >
        <DatePicker />
      </Form.Item>
      <Form.Item name="position" label="职位" rules={[{ required: true, message: '请输入职位！' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱！' },
          {
            type: 'email',
            message: '请输入正确的邮箱地址！',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="电话" rules={[{ required: true, message: '请输入电话！' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="website"
        label="个人网站"
        rules={[
          { required: true, message: '请输入个人网站！' },
          { pattern: new RegExp('[a-zA-z]+://[^s]*'), message: '请输入正确的地址！' },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="githubName"
        label="github用户名"
        rules={[{ required: true, message: '请输入github用户名！' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ProfileForm;
