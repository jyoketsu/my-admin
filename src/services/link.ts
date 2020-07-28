import request from '@/utils/request';
import { API_URL } from './url';

export function get() {
  return request.get(`${API_URL}/link`);
}

export function add(name: string, icon: string, uri: string) {
  return request.post(`${API_URL}/link/create`, {
    data: {
      name,
      icon,
      uri,
    },
  });
}

export function update(_id: string, name: string, icon: string, uri: string) {
  return request.patch(`${API_URL}/link/update`, {
    data: {
      _id,
      updater: {
        name,
        icon,
        uri,
      },
    },
  });
}

export function updateOrder(_id: string, order: number) {
  return request.patch(`${API_URL}/link/update`, {
    data: {
      _id,
      updater: {
        order,
      },
    },
  });
}

export function remove(_id: string) {
  return request.delete(`${API_URL}/link/delete`, {
    data: {
      _id,
    },
  });
}
