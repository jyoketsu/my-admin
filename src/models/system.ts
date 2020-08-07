/* eslint-disable no-underscore-dangle */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { getPm2List, pm2Reload } from '@/services/system';

export interface SystemModelState {
  pm2List: any[];
}

export interface SystemModelType {
  namespace: 'system';
  state: SystemModelState;
  effects: {
    getPm2List: Effect;
    reloadPm2: Effect;
  };
  reducers: {
    setPm2List: Reducer<SystemModelState>;
  };
}

const SystemModel: SystemModelType = {
  namespace: 'system',

  state: {
    pm2List: [],
  },

  effects: {
    *getPm2List(action, { call, put }) {
      const response = yield call(getPm2List);
      if (response.status === 200) {
        yield put({
          type: 'setPm2List',
          payload: response,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },
    *reloadPm2(action, { call }) {
      const response = yield call(pm2Reload, action.name);
      if (response.status === 200) {
        message.success(`${action.name}重启成功！`);
      } else {
        message.error(response.msg || '服务出错');
      }
    },
  },

  reducers: {
    setPm2List(state, action) {
      return {
        ...state,
        pm2List: action.payload.result,
      };
    },
  },
};

export default SystemModel;
