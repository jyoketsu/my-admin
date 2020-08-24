/* eslint-disable no-underscore-dangle */
import { Effect, Reducer } from 'umi';
import { message } from 'antd';
import { get, add, update, remove, Profile, Skill, Experience, Project } from '@/services/resume';

export interface Resume {
  _id: string;
  profile: Profile;
  skills: Skill[];
  knowledge: string;
  experience: Experience[];
  projects: Project[];
  lang: string;
}

export interface ResumeModelState {
  resume: Resume | null;
}

export interface ResumeModelType {
  namespace: 'resume';
  state: ResumeModelState;
  effects: {
    getResume: Effect;
    addResume: Effect;
    updateResume: Effect;
    deleteResume: Effect;
  };
  reducers: {
    setResume: Reducer<ResumeModelState>;
  };
}

const ResumeModel: ResumeModelType = {
  namespace: 'resume',

  state: {
    resume: null,
  },

  effects: {
    *getResume(action, { call, put }) {
      const response = yield call(get, action.lang);
      if (response.status === 200) {
        yield put({
          type: 'setResume',
          payload: response,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *addResume(action, { call, put }) {
      const response = yield call(
        add,
        action.profile,
        action.skills,
        action.knowledge,
        action.experience,
        action.projects,
        action.lang,
        action.user,
      );
      if (response.status === 200) {
        yield put({
          type: 'setResume',
          payload: response,
        });
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *updateResume(action, { call }) {
      const response = yield call(
        update,
        action._id,
        action.profile,
        action.skills,
        action.knowledge,
        action.experience,
        action.projects,
        action.lang,
        action.user,
      );
      if (response.status === 200) {
        message.success('保存成功');
      } else {
        message.error(response.msg || '服务出错');
      }
    },

    *deleteResume(action, { call }) {
      const response = yield call(remove, action._id);
      if (response.status === 200) {
        message.success('删除成功');
      } else {
        message.error(response.msg || '服务出错');
      }
    },
  },

  reducers: {
    setResume(state, action) {
      return {
        ...state,
        resume: action.payload.result,
      };
    },
  },
};

export default ResumeModel;
