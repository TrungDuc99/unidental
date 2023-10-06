import {signOut} from '@core';
import {showErrorMessage} from '@utils';
import axios, {AxiosError, AxiosResponse} from 'axios';
import queryString from 'query-string';
// const API_URL = 'https://sandapps.f5seconds.vn';
// console.log(API_URL, 'd14252');
const axiosClientVender = axios.create({
  baseURL: `https://core-apps.f5seconds.vn/wp-json`,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: params => queryString.stringify(params),
  },
});

// axiosClientVender.interceptors.request.use(
//   async (config: AxiosRequestConfig | any) => {
//     const token = getToken()?.access;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
axiosClientVender.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      showErrorMessage('Phiên đăng nhập hết hạn');
      signOut();
    } else {
    }
    return Promise.reject(error?.response?.data ?? error);
  }
);
export default axiosClientVender;
