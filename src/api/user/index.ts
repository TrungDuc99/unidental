import Toast from 'react-native-toast-message';

import type { Point } from '../auth/types';
import axiosClient from '../common/axios-client';
import type { User, UserAvatar } from './types';

export const userApi = {
  getInfo: (): Promise<User> => {
    return axiosClient.get('/customer/info');
  },
  updateUser: (params: User): Promise<User> => {
    return axiosClient.post('/customer/info', params);
  },
  getInfoPoint: (pageNumber: number): Promise<Point> => {
    return axiosClient.get(`/customer/points?pageNumber=${pageNumber}`);
  },
  getAvatar: (): Promise<UserAvatar> => {
    return axiosClient.get(`/customer/avatar`);
  },
};

const userService = {
  getInfo: async (): Promise<User | undefined> => {
    try {
      const res = await userApi.getInfo();
      if (res) {
        return res;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: `Đã xảy ra lỗi, không thể lấy thông tin người dùng ${
          error ? error : 'vui lòng thử lại sau'
        } `,
      });

      throw error;
    }
  },
  updateUser: async (params: User): Promise<User | undefined> => {
    try {
      const res = await userApi.updateUser(params);
      if (res) {
        return res;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: `Đã xảy ra lỗi, không thể cập nhật thông tin ${
          error ? error : 'vui lòng thử lại sau'
        } `,
      });

      throw error;
    }
  },
  getInfoPoint: async (pageNumber: number): Promise<any | undefined> => {
    try {
      const res = await userApi.getInfoPoint(pageNumber);

      if (res) {
        return res;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: `Đã xảy ra lỗi, không thể lấy thông tin ${
          error ? error : 'vui lòng thử lại sau'
        } `,
      });

      throw error;
    }
  },
  getAvatar: async (): Promise<UserAvatar | undefined> => {
    try {
      const res = await userApi.getAvatar();
      if (res) {
        return res;
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Thất bại',
        text2: `Đã xảy ra lỗi, không thể lấy thông tin người dùng ${
          error ? error : 'vui lòng thử lại sau'
        } `,
      });

      throw error;
    }
  },
};

export default userService;
