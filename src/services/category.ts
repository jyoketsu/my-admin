import request from '@/utils/request';
import { API_URL } from './url';

export function get() {
  return request.get(`${API_URL}/category`, {
    headers: {
      token: (localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : '') as string,
    },
  });
}

export function add(name: string) {
  return request.post(`${API_URL}/category/create`, {
    headers: {
      token: (localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : '') as string,
    },
    data: {
      name,
    },
  });
}

export function update(_id: string, name: string) {
  return request.patch(`${API_URL}/category/update`, {
    headers: {
      token: (localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : '') as string,
    },
    data: {
      _id,
      updater: { name },
    },
  });
}

export function remove(_id: string) {
  return request.delete(`${API_URL}/category/delete`, {
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
