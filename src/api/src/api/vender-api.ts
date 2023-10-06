import {showSuccessMessage} from '@utils';
import {useMutation} from 'react-query';
import axiosClientVender from './axios-client-vender';
import {QueryParams} from '@models';
import axiosClientVenderBearer from './axios-client-vender-bearer';
const consumer_key = 'ck_b054990b93a75672042f57d652686177f68dca0e';
const consumer_secret = 'cs_039a80da6a7a3e4b2cff7857db7727645b302646';
export const venderApi = {
  loginVender: (data: any): Promise<any> => {
    //----------Auth & User --------
    const url = '/jwt-auth/v1/token';
    return axiosClientVender.post(url, data);
  },
  getInfoUserVender: (id: string | number): Promise<any> => {
    const url = `/wc/v3/customers/${id}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`;
    return axiosClientVender.get(url);
  },
  updateUserInfo: (params: any): Promise<any> => {
    const {id, data} = params;

    const url = `/wc/v3/customers/${id}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`;
    return axiosClientVender.put(url, data);
  },
  //--------Oder-------------
  getAllOder: (params: QueryParams): Promise<any> => {
    const url = `/wc/v3/orders?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}&customer=${params.customer}&status=${params.status}`;
    return axiosClientVender.get(url);
  },
  getOderInfo: (id: string | number): Promise<any> => {
    const url = `/wc/v3/orders/${id}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`;
    return axiosClientVender.get(url);
  },
  update: (id: string, data: Partial<any>): Promise<any> => {
    const url = `/wc/v3/orders/${id}?consumer_key=${consumer_key}&consumer_secret=${consumer_secret}`;
    return axiosClientVender.put(url, data);
  },
  updateValidId: (data: Partial<any>): Promise<any> => {
    const url = `/api/v1/order/vendor/valid`;

    return axiosClientVenderBearer.post(url, data);
  },
  getOrdersSummary: (): Promise<any> => {
    const url = `/dokan/v1/orders/summary`;
    return axiosClientVenderBearer.get(url);
  },
  //-----------Product-------------
  //https://core-apps.f5seconds.vn/wp-json/dokan/v1/orders/summary
  getAllProduct: (params: QueryParams): Promise<any> => {
    const url = `/dokan/v1/products`;
    return axiosClientVenderBearer.get(url);
  },
};

export const useAuthenticateVender = () => {
  return useMutation(venderApi.loginVender);
};
export const useUpdateUser = () => {
  return useMutation(venderApi.updateUserInfo);
};
export const useUpdateValidId = () => {
  return useMutation(venderApi.updateValidId);
};

export const useUpdateOderVender = () => {
  return useMutation(
    ({id, data}: {id: string; data: Partial<any>}) => {
      return venderApi.update(id, data);
    },
    {
      onSuccess: () => {
        showSuccessMessage('Cập nhật thông tin thành công');
      },
    }
  );
};
