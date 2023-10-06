import Toast from 'react-native-toast-message';

import axiosClientChat from './axios-client';
export const userApi = {
  getChatRooms: (): Promise<any> => {
    return axiosClientChat.get('/chats');
  },
};

const chatService = {
  getChatRooms: async (): Promise<any | undefined> => {
    try {
      const res = await userApi.getChatRooms();
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

export default chatService;
