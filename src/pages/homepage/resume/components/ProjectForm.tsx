import React from 'react';
import { Form, Input, DatePicker } from 'antd';
import { FieldData } from '../interfaces';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

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

const ProjectForm: React.FC<CustomizedFormProps> = ({ onChange, fields, form }) => {
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
      <Form.Item name="name" label="项目名" rules={[{ required: true, message: '请输入项目名！' }]}>
        <Input />
      </Form.Item>
      <Form.Item
        name="platform"
        label="所用技能"
        rules={[{ required: true, message: '请输入所用技能！' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="timeperiod"
        label="时间段"
        rules={[{ required: true, message: '请输入时间！' }]}
      >
        <RangePicker />
      </Form.Item>
      <Form.Item
        name="description"
        label="项目描述"
        rules={[{ required: true, message: '请输入项目描述！' }]}
      >
        <TextArea rows={4} />
      </Form.Item>
      <Form.Item
        name="url"
        label="项目地址"
        rules={[{ pattern: new RegExp('[a-zA-z]+://[^s]*'), message: '请输入正确的地址！' }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default ProjectForm;
