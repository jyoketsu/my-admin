import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import { FieldData } from '../interfaces';

const { TextArea } = Input;

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

const ExpForm: React.FC<CustomizedFormProps> = ({ onChange, fields, form }) => {
  return (
    <Form
      {...layout}
      form={form}
      style={{ maxWidth: '500px' }}
      name="exp_form"
      fields={fields}
      onFieldsChange={(changedFields, allFields) => {
        onChange(allFields as FieldData[]);
      }}
    >
      <Form.Item
        name="company"
        label="公司名"
        rules={[{ required: true, message: '请输入公司名！' }]}
      >
        <Input placeholder="请输入公司名" />
      </Form.Item>
      <Form.Item name="position" label="职务" rules={[{ required: true, message: '请输入职务！' }]}>
        <Input placeholder="请输入职务" />
      </Form.Item>
      <Form.Item
        name="startTime"
        label="开始时间"
        rules={[{ required: true, message: '请输入开始时间！' }]}
      >
        <DatePicker placeholder="请输入开始时间" />
      </Form.Item>
      <Form.Item name="endTime" label="结束时间">
        <DatePicker placeholder="请输入结束时间" />
      </Form.Item>
      <Form.Item
        name="description"
        label="工作描述"
        rules={[{ required: true, message: '请输入工作描述！' }]}
      >
        <TextArea rows={4} placeholder="请输入工作描述" />
      </Form.Item>
    </Form>
  );
};

export default ExpForm;
