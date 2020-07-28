import React from 'react';
import { PageLoading } from '@ant-design/pro-layout';
import { Redirect, connect, ConnectProps, Dispatch } from 'umi';
import { stringify } from 'querystring';
import { ConnectState } from '@/models/connect';
import { User } from '@/models/user';

interface SecurityLayoutProps extends ConnectProps {
  loading?: boolean;
  user?: User | null;
  dispatch: Dispatch;
}

interface SecurityLayoutState {
  isReady: boolean;
}

class SecurityLayout extends React.Component<SecurityLayoutProps, SecurityLayoutState> {
  state: SecurityLayoutState = {
    isReady: false,
  };

  componentDidMount() {
    this.setState({
      isReady: true,
    });
    const { dispatch, user } = this.props;
    if (dispatch && !user) {
      dispatch({
        type: 'user/loginByToken',
      });
    }
  }

  render() {
    const { isReady } = this.state;
    const { children, user } = this.props;
    // You can replace it to your authentication rule (such as check token exists)
    // 你可以把它替换成你自己的登录认证规则（比如判断 token 是否存在）
    const token = window.localStorage.getItem('auth_token');
    const queryString = stringify({
      redirect: window.location.href,
    });

    if (!isReady) {
      return <PageLoading />;
    }

    if (!user) {
      if (token) {
        // 使用token登录
      } else {
        return <Redirect to={`/user/login?${queryString}`} />;
      }
    }
    return children;
  }
}

export default connect(({ user, loading }: ConnectState) => ({
  user: user.user,
  loading: loading.models.user,
}))(SecurityLayout);
