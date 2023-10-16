import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { Appointment } from '@/types';

export interface AppointmentState {
  data: Appointment | null;

  status: string;
  error: unknown;
}

const initialState: AppointmentState = {
  data: null,
  status: 'idle',
  error: null,
};

export const fetchAppointment = createAsyncThunk(
  'Appointment/fetchAppointment',
  async () => {
    return {};
  }
);
export const addNewAppointment = createAsyncThunk(
  'Appointment/addNewAppointment',
  async (initialPost: any) => {
    return {};
  }
);
export const AppointmentSlice = createSlice({
  name: 'Appointment',
  initialState,
  reducers: {
    addToAppointment: (state, action: PayloadAction<Appointment>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.Id === action.payload.Id
      );
      if (itemIndex === -1) {
        // Nếu sản phẩm chưa có trong giỏ hàng.
        state.items = [...state.items, action.payload];
      } else {
        // Nếu sản phẩm đã có trong giỏ hàng.
        state.items[itemIndex].Quantity += 1;
      }
    },
    removeFromAppointment: (state, action: PayloadAction<{ id: number }>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.Id === action.payload.id
      );
      if (itemIndex > -1) {
        // Check if item quantity is zero
        if (state.items[itemIndex].Quantity === 1) {
          // Remove item from Appointment
          state.items.splice(itemIndex, 1);
        } else {
          // Decrement item quantity
          state.items[itemIndex].Quantity -= 1;
        }
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAppointment.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAppointment.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.concat(action.payload.Items);
      })
      .addCase(fetchAppointment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewAppointment.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
export const { addToAppointment, removeFromAppointment } =
  AppointmentSlice.actions;

export const selectAppointmentItems = (state: any) => state.Appointment.items;
export const selectAppointmentItemsWithId = (state: any, id: number) =>
  state.Appointment?.items.filter(
    (item: ItemAppointment) => Number(item.Id) === Number(id)
  )[0];
export const selectProductQuantity = (state: any) =>
  state.Appointment.items.reduce(
    (total: number, item: ItemAppointment) => total + item.Quantity,
    0
  );

export const selectAppointmentTotalPrice = (state: any): number =>
  state.Appointment.items.reduce(
    (total: number, item: ItemAppointment) =>
      total + item.UnitPriceValue * item.Quantity,
    0
  );
export default AppointmentSlice.reducer;
