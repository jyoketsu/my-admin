import React from 'react';
import { Form, Input, Button } from 'antd';
import { FieldData } from '../interfaces';
import styles from './UserInfoForm.less';

const {TextArea} = Input;

interface CustomizedFormProps {
  onChange: (fields: FieldData[]) => void;
  fields: FieldData[];
  onSubmit: (fields: any) => void;
}

const UserInfoForm: React.FC<CustomizedFormProps> = ({ onChange, fields, onSubmit }) => {
  return (
    <Form
      className={styles.userInfoForm}
      name="user_info_form"
      layout="vertical"
      fields={fields}
      onFieldsChange={(changedFields, allFields) => {
        onChange(allFields as FieldData[]);
      }}
      onFinish={(values) => onSubmit(values)}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名！' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="avatar"
        label="头像地址"
        rules={[{ pattern: new RegExp('[a-zA-z]+://[^s]*'), message: '请输入正确的地址！' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: '请输入正确的邮箱地址！',
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="profile"
        label="个人简介"
        rules={[
          {
            max: 500,
            message: '不超过500个字符！',
          },
        ]}
      >
        <TextArea rows={3} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          更新基本信息
        </Button>
      </Form.Item>
    </Form>
  );
};

export default UserInfoForm;
