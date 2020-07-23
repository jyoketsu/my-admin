import { Effect, Reducer, history } from 'umi';
import { message } from 'antd';
import { login, loginByToken, update, detail } from '@/services/user';

export interface User {
  _id: string;
  username: string;
  avatar: string;
  role: number;
  email: string;
  profile: string;
}

export interface UserModelState {
  user: User | null;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    login: Effect;
    loginByToken: Effect;
    update: Effect;
    detail: Effect;
  };
  reducers: {
    setUser: Reducer<UserModelState>;
    updateUser: Reducer<UserModelState>;
    clearUser: Reducer<UserModelState>;
  };
}

const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    user: null,
  },

  effects: {
    *login(action, { call, put }) {
      const response = yield call(login, action.username, action.password);
      if (response.status === 200) {
        window.localStorage.setItem('auth_token', response.token);
        yield put({
          type: 'setUser',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },

    *loginByToken(action, { call, put }) {
      const response = yield call(loginByToken, action.token);
      if (response.status === 200) {
        yield put({
          type: 'setUser',
          payload: response,
        });
      } else {
        message.error(response.msg);
        history.push('/user/login');
      }
    },

    *detail(action, { call, put }) {
      const response = yield call(detail, action.id);
      if (response.status === 200) {
        yield put({
          type: 'setUser',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },

    *update(action, { call, put }) {
      const response = yield call(
        update,
        action.id,
        action.username,
        action.avatar,
        action.role,
        action.email,
        action.profile,
      );
      if (response.status === 200) {
        message.success('信息更新成功！');
        yield put({
          type: 'updateUser',
          user: {
            username: action.username,
            avatar: action.avatar,
            email: action.email,
            profile: action.profile,
          },
        });
      } else {
        message.error(response.msg);
      }
    },
  },

  reducers: {
    setUser(state, action) {
      return {
        ...state,
        user: action.payload.result,
      };
    },
    updateUser(state, action) {
      return {
        ...state,
        user: { ...state?.user, ...action.user },
      };
    },
    clearUser(state) {
      window.localStorage.clear();
      history.push('/user/login');
      return {
        ...state,
        user: null,
      };
    },
  },
};

export default UserModel;
