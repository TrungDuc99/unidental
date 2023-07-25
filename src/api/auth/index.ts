import Toast from 'react-native-toast-message';

import axiosClient from '../common/axios-client';
import type {
  AuthenticateBySocialReq,
  AuthenticateReq,
  AuthenticateResponse,
} from './types';

const accountApi = {
  login: ({ email, password }: AuthenticateReq): Promise<any> => {
    return axiosClient.post('/login', {
      email: email,
      password: password,
    });
  },
  loginBySocial: ({ id, data }: AuthenticateBySocialReq): Promise<any> => {
    return axiosClient.post('/loginbysocial', {
      id: id,
      data: data,
    });
  },
};

const authenticateService = {
  authenticate: async (
    data: AuthenticateReq
  ): Promise<AuthenticateResponse | undefined> => {
    try {
      const res = await accountApi.login(data);

      if (res) {
        return res;
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: `Đã xảy ra lỗi, không thể đăng nhập ${
          error ? error : 'vui lòng thử lại sau'
        } 👋`,
      });

      throw error;
    }
  },
  authenticateBySocial: async (
    data: AuthenticateBySocialReq
  ): Promise<AuthenticateResponse | undefined> => {
    try {
      const res = await accountApi.loginBySocial(data);

      if (res) {
        return res;
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: `Đã xảy ra lỗi, không thể đăng nhập ${
          error ? error : 'vui lòng thử lại sau'
        } 👋`,
      });

      throw error;
    }
  },
};

export default authenticateService;
