// import accountApi from '@api/account-api';

import {venderApi} from '@api/vender-api';

export const getInfoUserDetail = async (id: number | string) => {
  try {
    const res = await venderApi.getInfoUserVender(id);
    const detailInfoUser = res;
    return detailInfoUser;
  } catch (err) {}
};
