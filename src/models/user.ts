import { Effect, Reducer, history } from 'umi';
import { message } from 'antd';
import { login, loginByToken, update } from '@/services/user';

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
    updateUser: Effect;
  };
  reducers: {
    setUser: Reducer<UserModelState>;
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
    *updateUser(action, { call, put }) {
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
        yield put({
          type: 'setUser',
          payload: response,
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
