import { create } from 'zustand';

import { createSelectors } from '../utils';
import type { BookingStatusType, TokenType } from './utils';
import { getBookingStatus, getToken, removeToken, setToken } from './utils';

interface AuthState {
  token: TokenType | null;
  loading: boolean;
  status: 'idle' | 'signOut' | 'signIn';

  signIn: (data: TokenType) => void;
  signOut: () => void;
  setLoading: (data: boolean) => void;
  hydrate: () => void;
}
interface LoadingState {
  loading: boolean;
  setLoading: (data: boolean) => void;
}

interface BookingState {
  bookingStatus:
    | 'confirmed'
    | 'pending'
    | 'cancelled'
    | 'completed'
    | 'inProgress';
  setBookingStatus: (
    data: 'confirmed' | 'pending' | 'cancelled' | 'completed' | 'inProgress'
  ) => void;
  hydrate: () => void;
}
const _useAuth = create<AuthState>((set, get) => ({
  loading: false,
  status: 'idle',
  token: null,
  signIn: (token) => {
    setToken(token);
    set({ status: 'signIn', token });
  },
  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },
  setLoading: (isLoading) => {
    set({ loading: isLoading });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));
const _useLoading = create<LoadingState>((set) => ({
  loading: false,
  setLoading: (isLoading) => {
    set({ loading: isLoading });
  },
}));
const _useBooking = create<BookingState>((set, get) => ({
  bookingStatus: 'completed',
  setBookingStatus: (data) => {
    set({ bookingStatus: data });
  },
  hydrate: () => {
    try {
      const bookingStatus = getBookingStatus();

      if (bookingStatus !== null) {
        get().setBookingStatus(bookingStatus);
      } else {
        get().setBookingStatus('completed');
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
    }
  },
}));

export const useAuth = createSelectors(_useAuth);
export const useBooking = createSelectors(_useBooking);
export const useLoading = createSelectors(_useLoading);
export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType) => _useAuth.getState().signIn(token);
export const setBookingStatus = (data: BookingStatusType) =>
  _useBooking.getState().setBookingStatus(data);
export const setLoading = (data: boolean) =>
  _useLoading.getState().setLoading(data);
export const hydrateAuth = () => _useAuth.getState().hydrate();
