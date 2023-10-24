import { Env } from '@env';
import axios from 'axios';
import queryString from 'query-string';

console.log(Env.API_URL);
const axiosClientVerify = axios.create({
  baseURL: `https://server.ducdt.online/api/sms/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  paramsSerializer: {
    serialize: (params) => queryString.stringify(params),
  },
});

// axiosClientVerify.interceptors.request.use(
//   async (config: AxiosRequestConfig | any) => {
//     const token = getToken()?.access;
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     // Do something with request error
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
// axiosClientVerify.interceptors.response.use(
//   (response: AxiosResponse) => {
//     return response.data;
//   },
//   (error: AxiosError) => {
//     console.log('error:', error);

//     if (error.response?.status === 401) {
//       showErrorMessage('401');
//       // signOut();
//     } else if (error.response?.status === 403) {
//       Toast.show({
//         type: 'error',
//         text1: 'Phiên đăng nhập hết hạn',
//       });
//       signOut();
//     }
//     return Promise.reject(error?.response?.data ?? error);
//   }
// );

export default axiosClientVerify;
