/* eslint-disable no-underscore-dangle */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { get, getById, add, update, remove } from '@/services/article';

export interface Article {
  _id: string;
  title: string;
  cover: string;
  content: string;
  category: string;
  tags: string[];
  viewCount: number;
  auth: string;
  snippet: string;
  updateTime: string;
  createTime: string;
}

export interface ArticleModelState {
  articles: Article[];
  total: number;
  article: Article;
}

export interface ArticleModelType {
  namespace: 'article';
  state: ArticleModelState;
  effects: {
    getArticles: Effect;
    getArticleById: Effect;
    addArticle: Effect;
    updateArticle: Effect;
    deleteArticle: Effect;
  };
  reducers: {
    setArticles: Reducer<ArticleModelState>;
    setArticle: Reducer<ArticleModelState>;
    pushArticles: Reducer<ArticleModelState>;
    deleteArticleState: Reducer<ArticleModelState>;
    clearArticle: Reducer<ArticleModelState>;
  };
}

const ArticleModel: ArticleModelType = {
  namespace: 'article',

  state: {
    articles: [],
    total: 0,
    article: {
      _id: '',
      title: '',
      cover: '',
      content: '',
      category: '',
      tags: [],
      viewCount: 0,
      auth: '',
      snippet: '',
      updateTime: '',
      createTime: '',
    },
  },

  effects: {
    *getArticles(action, { call, put }) {
      const response = yield call(get, action.current, action.pageSize);
      if (response.status === 200) {
        yield put({
          type: 'setArticles',
          payload: response,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *getArticleById(action, { call, put }) {
      const response = yield call(getById, action._id);
      if (response.status === 200) {
        yield put({
          type: 'setArticle',
          payload: response,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *addArticle(action, { call, put }) {
      const response = yield call(
        add,
        action.title,
        action.cover,
        action.snippet,
        action.content,
        action.auth,
        action.category,
        action.tags,
        action.articleType,
      );
      if (response.status === 200) {
        message.success('创建成功！');
        yield put({
          type: 'pushArticles',
          payload: response,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *updateArticle(action, { call }) {
      const response = yield call(
        update,
        action._id,
        action.title,
        action.cover,
        action.snippet,
        action.content,
        action.category,
        action.tags,
      );
      if (response.status === 200) {
        message.success('保存成功！');
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *deleteArticle(action, { call, put }) {
      const response = yield call(remove, action._id);
      if (response.status === 200) {
        yield put({
          type: 'deleteArticleState',
          _id: action._id,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },
  },

  reducers: {
    setArticles(state, action) {
      return {
        ...state,
        articles: action.payload.result.array,
        total: action.payload.result.count,
      } as ArticleModelState;
    },
    setArticle(state, action) {
      return {
        ...state,
        article: action.payload.result,
      } as ArticleModelState;
    },
    pushArticles(state, action) {
      const articles = state ? [...state.articles] : [];
      articles.unshift(action.payload.result);
      return {
        ...state,
        articles,
        total: state ? state.total + 1 : 0,
        article: action.payload.result,
      } as ArticleModelState;
    },
    deleteArticleState(state, action) {
      const articles = state ? [...state.articles] : [];
      const index = articles.findIndex((article) => article._id === action._id);
      if (index !== -1) {
        articles.splice(index, 1);
      }
      return {
        ...state,
        articles,
      } as ArticleModelState;
    },
    clearArticle(state) {
      return {
        ...state,
        article: {
          _id: '',
          title: '',
          cover: '',
          content: '',
          category: '',
          tags: [],
          viewCount: 0,
          auth: '',
          snippet: '',
          updateTime: '',
          createTime: '',
        },
      } as ArticleModelState;
    },
  },
};

export default ArticleModel;
