import Toast from 'react-native-toast-message';

import axiosClient from '../common/axios-client';
import type { ResponseData } from '../types';
import type { User, UserAvatar } from './types';

export const userApi = {
  getInfo: (): Promise<ResponseData<User>> => {
    return axiosClient.get('/me');
  },
  searchUser: (searchValue: string): Promise<ResponseData<User>> => {
    return axiosClient.get(`/user/search/${searchValue}`);
  },
  updateUser: (params: User): Promise<ResponseData<User>> => {
    return axiosClient.post('/user/', params);
  },
  getInfoPoint: (pageNumber: number): Promise<ResponseData<User>> => {
    return axiosClient.get(`/user/points?pageNumber=${pageNumber}`);
  },
  getAvatar: (): Promise<UserAvatar> => {
    return axiosClient.get(`/user/avatar`);
  },
};

const userService = {
  getInfo: async (): Promise<ResponseData<User> | undefined> => {
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
  searchUser: async (
    searchValue: string
  ): Promise<ResponseData<User> | undefined> => {
    try {
      const res = await userApi.searchUser(searchValue);

      if (res.succeeded) {
        return res.data;
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
