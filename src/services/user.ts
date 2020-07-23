import request from '@/utils/request';
import { API_URL } from './url';

export function login(username: string, password: string) {
  return request.get(`${API_URL}/user/login`, {
    params: {
      username,
      password,
    },
  });
}

export function register(username: string, password: string) {
  return request.post(`${API_URL}/user/register`, {
    data: {
      username,
      password,
    },
  });
}

export function loginByToken() {
  return request.get(`${API_URL}/user/loginByToken`);
}

export function update(
  _id: string,
  username: string,
  avatar: string,
  role: number,
  email: string,
  profile: string,
) {
  return request.patch(`${API_URL}/user/update`, {
    data: {
      _id,
      updater: {
        username,
        avatar,
        role,
        email,
        profile,
      },
    },
  });
}
