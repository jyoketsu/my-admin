import React from 'react';
import { Form, Input } from 'antd';
import { FieldData } from '../interfaces';

const { TextArea } = Input;

interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
  form: any;
}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const OtherSkillForm: React.FC<CustomizedFormProps> = ({ onChange, fields, form }) => {
  return (
    <Form
      {...layout}
      form={form}
      style={{ maxWidth: '500px' }}
      name="other_skill_form"
      fields={fields}
      onFieldsChange={(changedFields, allFields) => {
        onChange(allFields as FieldData[]);
      }}
    >
      <Form.Item name="knowledge" label="其他技能">
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default OtherSkillForm;
