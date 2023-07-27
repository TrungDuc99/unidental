import { getItem, removeItem, setItem } from '@/core/storage';

const TOKEN = 'token';
const BOOKING_STATUS = 'bookingStatus';

export type TokenType = {
  access: string;
  refresh: string;
};
export type BookingStatusType =
  | 'confirmed'
  | 'pending'
  | 'cancelled'
  | 'completed'
  | 'inProgress';
export const getToken = () => getItem<TokenType>(TOKEN);
export const removeToken = () => removeItem(TOKEN);
export const setToken = (value: TokenType) => setItem<TokenType>(TOKEN, value);

export const getBookingStatus = () =>
  getItem<BookingStatusType>(BOOKING_STATUS);
export const removeBookingStatus = () => removeItem(BOOKING_STATUS);
export const setBookingStatus = (value: BookingStatusType) =>
  setItem<BookingStatusType>(BOOKING_STATUS, value);
