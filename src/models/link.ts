import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { get, add, update, remove, updateOrder } from '@/services/link';

export interface Link {
  _id: string;
  order: number;
  name: string;
  icon: string;
  uri: number;
}

export interface LinkModelState {
  links: Link[];
}

export interface LinkModelType {
  namespace: 'link';
  state: LinkModelState;
  effects: {
    getLinks: Effect;
    addLink: Effect;
    updateLink: Effect;
    deleteLink: Effect;
    changeOrder: Effect;
  };
  reducers: {
    setLinks: Reducer<LinkModelState>;
    pushLinks: Reducer<LinkModelState>;
    updateLinks: Reducer<LinkModelState>;
    deleteLinkState: Reducer<LinkModelState>;
    updateStateOrder: Reducer<LinkModelState>;
  };
}

const UserModel: LinkModelType = {
  namespace: 'link',

  state: {
    links: [],
  },

  effects: {
    *getLinks(action, { call, put }) {
      const response = yield call(get);
      if (response.status === 200) {
        yield put({
          type: 'setLinks',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },

    *addLink(action, { call, put }) {
      const response = yield call(add, action.name, action.icon, action.uri);
      if (response.status === 200) {
        yield put({
          type: 'pushLinks',
          payload: response,
        });
      } else {
        message.error(response.msg);
      }
    },

    *updateLink(action, { call, put }) {
      const response = yield call(update, action.id, action.name, action.icon, action.uri);
      if (response.status === 200) {
        yield put({
          type: 'updateLinks',
          id: action.id,
          name: action.name,
          icon: action.icon,
          uri: action.uri,
        });
      } else {
        message.error(response.msg);
      }
    },

    *deleteLink(action, { call, put }) {
      const response = yield call(remove, action.id);
      if (response.status === 200) {
        yield put({
          type: 'deleteLinkState',
          id: action.id,
        });
      } else {
        message.error(response.msg);
      }
    },

    *changeOrder(action, { call, put }) {
      const { currentIndex, currentId, currentOrder, targetIndex, targetId, targetOrder } = action;
      const res1 = yield call(updateOrder, currentId, targetOrder);
      const res2 = yield call(updateOrder, targetId, currentOrder);
      if (res1.status === 200 && res2.status === 200) {
        yield put({
          type: 'updateStateOrder',
          currentIndex,
          currentId,
          currentOrder,
          targetIndex,
          targetId,
          targetOrder,
        });
      } else {
        message.error(res1.msg || res2.msg);
      }
    },
  },

  reducers: {
    setLinks(state, action) {
      return {
        ...state,
        links: action.payload.result,
      };
    },
    pushLinks(state, action) {
      const links = state ? [...state.links] : [];
      links.push(action.payload.result);
      return {
        ...state,
        links,
      };
    },
    updateLinks(state, action) {
      const links = state ? [...state.links] : [];
      // eslint-disable-next-line no-underscore-dangle
      const index = links.findIndex((link) => link._id === action.id);
      if (index !== -1) {
        links[index].name = action.name;
        links[index].icon = action.icon;
        links[index].uri = action.uri;
      }
      return {
        ...state,
        links,
      };
    },
    deleteLinkState(state, action) {
      const links = state ? [...state.links] : [];
      // eslint-disable-next-line no-underscore-dangle
      const index = links.findIndex((link) => link._id === action.id);
      if (index !== -1) {
        links.splice(index, 1);
      }
      return {
        ...state,
        links,
      };
    },
    updateStateOrder(state, action) {
      const { currentIndex, currentOrder, targetIndex, targetOrder } = action;
      const links = state ? [...state.links] : [];
      links[currentIndex].order = targetOrder;
      links[targetIndex].order = currentOrder;
      [links[currentIndex], links[targetIndex]] = [links[targetIndex], links[currentIndex]];
      return {
        ...state,
        links,
      };
    },
  },
};

export default UserModel;
