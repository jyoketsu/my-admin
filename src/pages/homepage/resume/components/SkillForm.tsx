import React from 'react';
import { Form, Input, Button } from 'antd';
import { FieldData } from '../interfaces';

interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
  onSubmit: (fields: any) => void;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SkillForm: React.FC<CustomizedFormProps> = ({ onChange, fields, onSubmit }) => {
  return (
    <Form
      {...layout}
      style={{ width: '500px' }}
      name="user_info_form"
      fields={fields}
      onFieldsChange={(changedFields, allFields) => {
        onChange(allFields as FieldData[]);
      }}
      onFinish={(values) => onSubmit(values)}
    >
      <Form.Item
        name="username"
        label="技能名"
        rules={[{ required: true, message: '请输入用户名！' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="avatar"
        label="技能熟练度"
        rules={[{ pattern: new RegExp('[a-zA-z]+://[^s]*'), message: '请输入正确的地址！' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="技能图标"
        rules={[{ pattern: new RegExp('[a-zA-z]+://[^s]*'), message: '请输入正确的地址！' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          更新基本信息
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SkillForm;
