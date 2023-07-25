import moment from 'moment';
import { Linking } from 'react-native';
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
