import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { connect, ConnectProps } from 'umi';
import { Card } from 'antd';
import { User } from '@/models/user';
import styles from './index.less';
import { FieldData } from './interfaces';
import UserInfoForm from './components/UserInfoForm';
import Avatar from './components/Avatar';

interface Props extends ConnectProps {
  user: User | null;
}

const Setting: React.FC<Props> = ({ user }) => {
  // const { user } = props;
  const [fields, setFields] = useState([
    { name: ['username'], value: user ? user.username : '' },
    { name: ['email'], value: user ? user.email : '' },
    { name: ['profile'], value: user ? user.profile : '' },
  ]);

  const onSubmit = (values: any) => {
    console.log('---onsubmit---', values);
  };

  return (
    <PageContainer>
      <Card>
        <div className={styles.bascInfo}>
          <UserInfoForm
            fields={fields as FieldData[]}
            onChange={(newFields) => {
              setFields(newFields);
            }}
            onSubmit={onSubmit}
          />
          <Avatar />
        </div>
      </Card>
    </PageContainer>
  );
};

export default connect(({ user }: ConnectState) => ({
  user: user.user,
}))(Setting);
