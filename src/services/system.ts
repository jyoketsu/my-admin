import request from '@/utils/request';
import { API_URL } from './url';

export function getPm2List() {
  return request.post(`${API_URL}/system/listpm2`, {
    headers: {
      token: (localStorage.getItem('auth_token')
        ? localStorage.getItem('auth_token')
        : '') as string,
    },
  });
}

export function pm2Reload(name: string) {
  return request.post(`${API_URL}/system/reloadpm2`, {
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
