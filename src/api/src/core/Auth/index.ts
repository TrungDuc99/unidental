/// Auth.tsx
import {InfoUserRes} from '@models';
import * as Keychain from 'react-native-keychain';
import SInfo from 'react-native-sensitive-info';
import create from 'zustand';
import {
  RememberType,
  TokenType,
  getRemember,
  getToken,
  removeRemember,
  removeToken,
  setPassword,
  setPhoneNumber,
  setRemember,
  setToken,
} from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  infoUser: InfoUserRes | null;
  summaryOrders: {
    'wc-pending': number;
    'wc-completed': number;
    'wc-on-hold': number;
    'wc-processing': number;
    'wc-refunded': number;
    'wc-cancelled': number;
    'wc-failed': number;
    'wc-checkout-draft': number;
    total: number;
  };
  signIn: (
    data: TokenType,
    remember: RememberType,
    phoneNumber?: string,
    password?: string
  ) => void;
  setSummaryOrders: (data: any) => void;
  signOut: () => void;
  loading: boolean;
  setLoadingDialog: (data: boolean) => void;
  hydrate: () => void;
  setInfoUser: (infoUser: InfoUserRes) => void;
}

export const useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  loading: false,
  summaryOrders: {
    'wc-pending': 0,
    'wc-completed': 0,
    'wc-on-hold': 0,
    'wc-processing': 0,
    'wc-refunded': 0,
    'wc-cancelled': 0,
    'wc-failed': 0,
    'wc-checkout-draft': 0,
    total: 0,
  },
  token: null,
  infoUser: null,
  setInfoUser: (infoUser: InfoUserRes) => {
    set({infoUser});
  },
  setSummaryOrders: data => {
    set({summaryOrders: data});
  },
  signIn: (token, remember, phoneNumber, password) => {
    setToken(token);
    setRemember(remember);
    set({status: 'signIn', token});
    if (phoneNumber && password) {
      setPhoneNumber(phoneNumber);

      setPassword(password);
      Keychain.setGenericPassword(phoneNumber, password);
      SInfo.setItem('accessToken', token.access, {
        sharedPreferencesName: 'mySharedPrefs',
        keychainService: 'myKeychain',
      });
    }
  },

  setLoadingDialog: isLoading => {
    set({loading: isLoading});
  },
  signOut: () => {
    removeToken();
    removeRemember();
    set({status: 'signOut', token: null});
    Keychain.resetGenericPassword();
    SInfo.deleteItem('accessToken', {
      sharedPreferencesName: 'mySharedPrefs',
      keychainService: 'myKeychain',
    });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      const remember = getRemember();

      if (userToken !== null && remember !== null) {
        get().signIn(userToken, remember);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));
export const signOut = () => useAuth.getState().signOut();
export const hydrateAuth = () => useAuth.getState().hydrate();
