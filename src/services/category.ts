import request from '@/utils/request';
import { API_URL } from './url';

export function get() {
  return request.get(`${API_URL}/category`);
}

export function add(name: string) {
  return request.post(`${API_URL}/category/create`, {
    data: {
      name,
    },
  });
}

export function update(_id: string, name: string) {
  return request.patch(`${API_URL}/category/update`, {
    data: {
      _id,
      updater: { name },
    },
  });
}

export function remove(_id: string) {
  return request.delete(`${API_URL}/category/delete`, {
    data: {
      _id,
    },
  });
}
