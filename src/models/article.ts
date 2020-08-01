/* eslint-disable no-underscore-dangle */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { get, add, update, remove } from '@/services/article';

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
    updateArticles: Reducer<ArticleModelState>;
    deleteArticleState: Reducer<ArticleModelState>;
    clearArticle: Reducer<ArticleModelState>;
  };
}

const UserModel: ArticleModelType = {
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
      const response = yield call(get, action._id);
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
        action.type,
      );
      if (response.status === 200) {
        yield put({
          type: 'pushArticles',
          payload: response,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *updateArticle(action, { call, put }) {
      const response = yield call(
        update,
        action._id,
        action.title,
        action.content,
        action.category,
        action.tags,
        action.cover,
        action.snippet,
      );
      if (response.status === 200) {
        yield put({
          type: 'updateArticles',
          _id: action._id,
          title: action.title,
          content: action.content,
          category: action.category,
          tags: action.tags,
          cover: action.cover,
          snippet: action.snippet,
        });
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
      } as ArticleModelState;
    },
    updateArticles(state, action) {
      // 更新articles
      const articles = state ? [...state.articles] : [];
      const index = articles.findIndex((article) => article._id === action._id);
      const current = articles[index];
      if (index !== -1) {
        current.title = action.title;
        current.content = action.content;
        current.category = action.category;
        current.tags = action.tags;
        current.cover = action.cover;
        current.snippet = action.snippet;
      }
      // 更新article
      let article = { ...state?.article };
      article = {
        ...article,
        ...{
          content: action.content,
          category: action.category,
          tags: action.tag,
          updateTime: new Date(),
        },
      };
      return {
        ...state,
        articles,
        article,
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

export default UserModel;
