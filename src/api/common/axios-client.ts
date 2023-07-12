import { Env } from '@env';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import queryString from 'query-string';
import Toast from 'react-native-toast-message';

import { signOut } from '@/core';
import { getToken } from '@/core/auth/utils';
import { showErrorMessage } from '@/ui';

console.log('url:', Env.API_URL);
const axiosClient = axios.create({
  baseURL: `${Env.API_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params),
  },
});

axiosClient.interceptors.request.use(
  async (config: AxiosRequestConfig | any) => {
    const token = getToken()?.access;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    console.log('error:', error);

    if (error.response?.status === 401) {
      showErrorMessage('401');
      // signOut();
    } else if (error.response?.status === 403) {
      Toast.show({
        type: 'error',
        text1: 'Phiên đăng nhập hết hạn',
      });
      signOut();
    }
    return Promise.reject(error?.response?.data ?? error);
  }
);

export default axiosClient;
