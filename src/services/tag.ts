import request from '@/utils/request';
import { API_URL } from './url';

export function get() {
  return request.get(`${API_URL}/tag`, {
    headers: {
      token: (localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : '') as string,
    },
  });
}

export function add(name: string, color: string) {
  return request.post(`${API_URL}/tag/create`, {
    headers: {
      token: (localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : '') as string,
    },
    data: {
      name,
      color,
    },
  });
}

export function update(_id: string, name: string, color: string) {
  return request.patch(`${API_URL}/tag/update`, {
    headers: {
      token: (localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : '') as string,
    },
    data: {
      _id,
      updater: { name, color },
    },
  });
}

export function remove(_id: string) {
  return request.delete(`${API_URL}/tag/delete`, {
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
