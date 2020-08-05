import { Checkbox } from 'antd';
import React, { useState, useEffect } from 'react';
import { Link, connect, Dispatch, history } from 'umi';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import { User } from '@/models/user';
import LoginForm from './components/Login';

import styles from './style.less';

const { UserName, Password, Submit } = LoginForm;
interface LoginProps {
  dispatch: Dispatch;
  submitting?: boolean;
  user: User | null;
}

const Login: React.FC<LoginProps> = (props) => {
  const { submitting, user } = props;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>('account');

  useEffect(() => {
    if (user) {
      history.push('/welcome');
    }
  }, [user]);

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'user/login',
      ...values,
    });
  };

  return (
    <div className={styles.main}>
      <LoginForm activeKey={type} onTabChange={setType} onSubmit={handleSubmit}>
        <UserName
          name="username"
          placeholder="请输入用户名：guest"
          rules={[
            {
              required: true,
              message: '请输入用户名!',
            },
          ]}
        />
        <Password
          name="password"
          placeholder="请输入密码：guest"
          rules={[
            {
              required: true,
              message: '请输入密码！',
            },
          ]}
        />
        <div>
          <Checkbox checked={autoLogin} onChange={(e) => setAutoLogin(e.target.checked)}>
            自动登录
          </Checkbox>
          <a
            style={{
              float: 'right',
            }}
          >
            忘记密码
          </a>
        </div>
        <Submit loading={submitting}>登录</Submit>
        <div className={styles.other}>
          <Link className={styles.register} to="/user/register">
            注册账户
          </Link>
        </div>
      </LoginForm>
    </div>
  );
};

export default connect(({ user, loading }: ConnectState) => ({
  submitting: loading.effects['login/login'],
  user: user.user,
}))(Login);
