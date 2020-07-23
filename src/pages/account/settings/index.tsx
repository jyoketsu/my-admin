import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { connect, ConnectProps, Dispatch } from 'umi';
import { Card } from 'antd';
import { User } from '@/models/user';
import styles from './index.less';
import { FieldData } from './interfaces';
import UserInfoForm from './components/UserInfoForm';
import Avatar from './components/Avatar';

interface Props extends ConnectProps {
  dispatch: Dispatch;
  user: User | null;
}

const Setting: React.FC<Props> = ({ dispatch, user }) => {
  const [fields, setFields] = useState([
    { name: ['username'], value: user ? user.username : '' },
    { name: ['avatar'], value: user ? user.avatar : '' },
    { name: ['email'], value: user ? user.email : '' },
    { name: ['profile'], value: user ? user.profile : '' },
  ]);

  useEffect(() => {
    if (dispatch) {
      dispatch({
        type: 'user/detail',
        id: user?._id,
      });
    }
  }, [dispatch]);

  useEffect(() => {
    setFields([
      { name: ['username'], value: user ? user.username : '' },
      { name: ['avatar'], value: user ? user.avatar : '' },
      { name: ['email'], value: user ? user.email : '' },
      { name: ['profile'], value: user ? user.profile : '' },
    ]);
  }, [user]);

  const onSubmit = (values: any) => {
    if (dispatch) {
      dispatch({
        type: 'user/update',
        id: user?._id,
        username: values.username,
        avatar: values.avatar,
        role: user?.role,
        email: values.email,
        profile: values.profile,
      });
    }
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
          <Avatar uri={user?.avatar} />
        </div>
      </Card>
    </PageContainer>
  );
};

export default connect(({ user }: ConnectState) => ({
  user: user.user,
}))(Setting);
