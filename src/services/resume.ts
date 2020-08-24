import request from '@/utils/request';
import { API_URL } from './url';

export function get(lang: 'zh-Hans' | 'zh-Hant' | 'ja' | 'en') {
  return request.get(`${API_URL}/resume/lang`, {
    headers: {
      token: (localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : '') as string,
    },
    params: {
      lang,
    },
  });
}

export interface Profile {
  // 姓名
  name: string;
  // 自我介绍
  about: string;
  // 学历
  education: string;
  // 地点
  location: string;
  // 出生年份
  birthYear: string;
  // 职位
  position: string;
  // 邮箱
  email: string;
  // 电话
  phone: string;
  // 个人网站
  website: string;
  // github用户名
  githubName: string;
}

export interface Skill {
  name: string;
  level: number;
  iconUri: string;
}

export interface Experience {
  company: string;
  position: string;
  startTime: Date;
  endTime: Date;
  description: string;
}

export interface Project {
  name: string;
  platform: string;
  timeperiod: string[];
  description: string;
  url: string;
}

export function add(
  profile: Profile,
  skills: Skill[],
  knowledge: string,
  experience: Experience[],
  projects: Project[],
  lang: 'zh-Hans' | 'zh-Hant' | 'ja' | 'en',
  user: string,
) {
  return request.post(`${API_URL}/resume/create`, {
    headers: {
      token: (localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : '') as string,
    },
    data: {
      profile,
      skills,
      knowledge,
      experience,
      projects,
      lang,
      user,
    },
  });
}

export function update(
  _id: string,
  profile: Profile,
  skills: Skill[],
  knowledge: string,
  experience: Experience[],
  projects: Project[],
  lang: 'zh-Hans' | 'zh-Hant' | 'ja' | 'en',
  user: string,
) {
  return request.patch(`${API_URL}/resume/update`, {
    headers: {
      token: (localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : '') as string,
    },
    data: {
      _id,
      updater: { profile, skills, knowledge, experience, projects, lang, user },
    },
  });
}

export function remove(_id: string) {
  return request.delete(`${API_URL}/resume/delete`, {
    headers: {
      token: (localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : '') as string,
    },
    data: {
      _id,
    },
  });
}
