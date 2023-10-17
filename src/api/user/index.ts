import Toast from 'react-native-toast-message';

import axiosClient from '../common/axios-client';
import type { ResponseData } from '../types';
import type { User } from './types';

export const userApi = {
  getInfo: (): Promise<ResponseData<User>> => {
    return axiosClient.get('/user/info');
  },
  searchUser: (searchValue: string): Promise<ResponseData<User>> => {
    return axiosClient.get(`/user/search/${searchValue}`);
  },
  updateUser: (params: User): Promise<ResponseData<User>> => {
    return axiosClient.post('/user', params);
  },
  createUser: (params: User): Promise<ResponseData<User>> => {
    return axiosClient.post('/user', params);
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
  updateUser: async (params: User): Promise<User> => {
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
  createUser: async (params: User): Promise<User | undefined> => {
    try {
      const res = await userApi.createUser(params);
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
};

export default userService;
