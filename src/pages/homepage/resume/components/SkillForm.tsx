import React from 'react';
import { Form, Input, InputNumber } from 'antd';
import { FieldData } from '../interfaces';

interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
  // onSubmit: (fields: any) => void;
  form: any;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SkillForm: React.FC<CustomizedFormProps> = ({ onChange, fields, form }) => {
  return (
    <Form
      {...layout}
      form={form}
      style={{ maxWidth: '500px' }}
      name="skill_form"
      fields={fields}
      onFieldsChange={(changedFields, allFields) => {
        onChange(allFields as FieldData[]);
      }}
    >
      <Form.Item name="name" label="技能名" rules={[{ required: true, message: '请输入技能名！' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="level"
        label="技能熟练度"
        rules={[{ type: 'number', message: '请输入数字！' }]}
      >
        <InputNumber placeholder="熟练度 0-100" max={100} min={0} style={{ width: '150px' }} />
      </Form.Item>
      <Form.Item
        name="iconUri"
        label="技能图标"
        rules={[{ pattern: new RegExp('[a-zA-z]+://[^s]*'), message: '请输入正确的地址！' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default SkillForm;
