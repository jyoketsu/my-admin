/* eslint-disable no-underscore-dangle */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { get, add, update, remove } from '@/services/tag';

export interface Tag {
  _id: string;
  name: string;
  count: number;
  color: string;
  updateTime: string;
}

export interface TagModelState {
  tags: Tag[];
}

export interface TagModelType {
  namespace: 'tag';
  state: TagModelState;
  effects: {
    getTags: Effect;
    addTag: Effect;
    updateTag: Effect;
    deleteTag: Effect;
  };
  reducers: {
    setTags: Reducer<TagModelState>;
    pushTags: Reducer<TagModelState>;
    updateTags: Reducer<TagModelState>;
    deleteTagState: Reducer<TagModelState>;
  };
}

const UserModel: TagModelType = {
  namespace: 'tag',

  state: {
    tags: [],
  },

  effects: {
    *getTags(action, { call, put }) {
      const response = yield call(get);
      if (response.status === 200) {
        yield put({
          type: 'setTags',
          payload: response,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *addTag(action, { call, put }) {
      const response = yield call(add, action.name, action.color);
      if (response.status === 200) {
        yield put({
          type: 'pushTags',
          payload: response,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *updateTag(action, { call, put }) {
      const response = yield call(update, action._id, action.name, action.color);
      if (response.status === 200) {
        yield put({
          type: 'updateTags',
          _id: action._id,
          name: action.name,
          color: action.color,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *deleteTag(action, { call, put }) {
      const response = yield call(remove, action._id);
      if (response.status === 200) {
        yield put({
          type: 'deleteTagState',
          _id: action._id,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },
  },

  reducers: {
    setTags(state, action) {
      return {
        ...state,
        tags: action.payload.result,
      };
    },
    pushTags(state, action) {
      const tags = state ? [...state.tags] : [];
      tags.unshift(action.payload.result);
      return {
        ...state,
        tags,
      };
    },
    updateTags(state, action) {
      const tags = state ? [...state.tags] : [];
      const index = tags.findIndex((tag) => tag._id === action._id);
      if (index !== -1) {
        tags[index].name = action.name;
        tags[index].color = action.color;
      }
      return {
        ...state,
        tags,
      };
    },
    deleteTagState(state, action) {
      const tags = state ? [...state.tags] : [];
      const index = tags.findIndex((tag) => tag._id === action._id);
      if (index !== -1) {
        tags.splice(index, 1);
      }
      return {
        ...state,
        tags,
      };
    },
  },
};

export default UserModel;
