import moment from 'moment';
import { Linking, Platform } from 'react-native';
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import Toast from 'react-native-toast-message';
import type { StoreApi, UseBoundStore } from 'zustand';
export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};
export function getDaysInMonth(month: any, year: any, dateCurrent) {
  var date = new Date(year, month, 1);
  var days = [];
  let index = 0;
  while (date.getMonth() === month) {
    days.push({
      id: index + 1,
      fullDate: moment(new Date(date)).format('DD/MM/YYYY'),
      date: new Date(date).getDate(),
      thu: moment(new Date(date)).format('ddd'),
      isSelected: new Date(date).getDate() === dateCurrent ? true : false,
    });
    date.setDate(date.getDate() + 1);
    index++;
  }
  return days;
}
export const checkPermissionsCamera = async () => {
  requestMultiple([
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  ])
    .then((result) => {})
    .catch((error) => {
      Toast.show({
        type: 'error',
        text1: 'Vui lòng cấp lại quyền trong cài đặt',
        text2: `Đã xảy ra lỗi ${
          error.Message
            ? error.Message
            : error.message
            ? error.message
            : 'Vui lòng thử lại sau'
        }`,
      });
    });
};
export const generateID = () => Math.random().toString(36).substring(2, 10);
