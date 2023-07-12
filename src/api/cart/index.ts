import Toast from 'react-native-toast-message';

import { showErrorMessage } from '@/ui';

import axiosClient from '../common/axios-client';
import type { CartAddResponse, CartReq, CartResponse } from './types';
export const cartApi = {
  getOne: (): Promise<CartResponse> => {
    return axiosClient.get('/shoppingcart/items/mini');
  },
  addToCart: (params: CartReq): Promise<any> => {
    const url = `/shoppingcart/add?productId=${params.productId}&shoppingCartTypeId=${params.shoppingCartTypeId}&quantity=${params.quantity}&forceredirection=false`;
    return axiosClient.post(url, params);
  },
};

const cartService = {
  getAll: async (): Promise<CartResponse | undefined> => {
    try {
      const res = await cartApi.getOne();
      if (res) {
        return res;
      }
    } catch (error: any) {
      showErrorMessage(
        `Đã xảy ra lỗi,  không thể lấy danh mục ${
          error?.error
            ? error?.error
            : error?.message
            ? error?.message
            : 'vui lòng thử lại sau'
        }`
      );

      throw error;
    }
  },
  addToCart: async (param: CartReq): Promise<CartAddResponse | undefined> => {
    try {
      const res = await cartApi.addToCart(param);

      if (res.success) {
        return res;
      } else {
        Toast.show({
          type: 'error',
          text1: `Đã xảy ra lỗi" ${res.message}
            'vui lòng thử lại sau'
          }`,
        });
      }
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: `Đã xảy ra lỗi ${
          error?.error
            ? error?.error
            : error?.message
            ? error?.message
            : 'vui lòng thử lại sau'
        }`,
      });

      throw error;
    }
  },
};

export default cartService;
