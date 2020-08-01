import request from '@/utils/request';
import { API_URL } from './url';

export function get(current: number, pageSize: number) {
  return request.get(`${API_URL}/article`, { params: { current, pageSize } });
}

export function getById(_id: string) {
  return request.get(`${API_URL}/article/findById`, {
    params: { _id },
  });
}

export function add(
  title: string,
  cover: string,
  snippet: string,
  content: string,
  auth: string,
  category: string,
  tags: string[],
  type: number,
) {
  return request.post(`${API_URL}/article/create`, {
    data: {
      title,
      cover,
      snippet,
      content,
      auth,
      category,
      tags,
      type,
    },
  });
}

export function update(
  _id: string,
  title: string,
  cover: string,
  snippet: string,
  content: string,
  category: string,
  tags: string[],
) {
  return request.patch(`${API_URL}/article/update`, {
    data: {
      _id,
      updater: {
        title,
        content,
        category,
        tags,
        cover,
        snippet,
      },
    },
  });
}

export function remove(_id: string) {
  return request.delete(`${API_URL}/article/delete`, {
    data: {
      _id,
    },
  });
}
