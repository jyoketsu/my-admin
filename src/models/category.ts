/* eslint-disable no-underscore-dangle */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { get, add, update, remove } from '@/services/category';

export interface Category {
  _id: string;
  name: string;
  count: number;
  updateTime: string;
}

export interface CategoryModelState {
  categories: Category[];
}

export interface CategoryModelType {
  namespace: 'category';
  state: CategoryModelState;
  effects: {
    getCategories: Effect;
    addCategory: Effect;
    updateCategory: Effect;
    deleteCategory: Effect;
  };
  reducers: {
    setCategories: Reducer<CategoryModelState>;
    pushCategories: Reducer<CategoryModelState>;
    updateCategories: Reducer<CategoryModelState>;
    deleteCategoryState: Reducer<CategoryModelState>;
  };
}

const CategoryModel: CategoryModelType = {
  namespace: 'category',

  state: {
    categories: [],
  },

  effects: {
    *getCategories(action, { call, put }) {
      const response = yield call(get);
      if (response.status === 200) {
        yield put({
          type: 'setCategories',
          payload: response,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *addCategory(action, { call, put }) {
      const response = yield call(add, action.name);
      if (response.status === 200) {
        yield put({
          type: 'pushCategories',
          payload: response,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *updateCategory(action, { call, put }) {
      const response = yield call(update, action._id, action.name);
      if (response.status === 200) {
        yield put({
          type: 'updateCategories',
          _id: action._id,
          name: action.name,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *deleteCategory(action, { call, put }) {
      const response = yield call(remove, action._id);
      if (response.status === 200) {
        yield put({
          type: 'deleteCategoryState',
          _id: action._id,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },
  },

  reducers: {
    setCategories(state, action) {
      return {
        ...state,
        categories: action.payload.result,
      };
    },
    pushCategories(state, action) {
      const categories = state ? [...state.categories] : [];
      categories.unshift(action.payload.result);
      return {
        ...state,
        categories,
      };
    },
    updateCategories(state, action) {
      const categories = state ? [...state.categories] : [];
      const index = categories.findIndex((category) => category._id === action._id);
      if (index !== -1) {
        categories[index].name = action.name;
      }
      return {
        ...state,
        categories,
      };
    },
    deleteCategoryState(state, action) {
      const categories = state ? [...state.categories] : [];
      const index = categories.findIndex((category) => category._id === action._id);
      if (index !== -1) {
        categories.splice(index, 1);
      }
      return {
        ...state,
        categories,
      };
    },
  },
};

export default CategoryModel;
