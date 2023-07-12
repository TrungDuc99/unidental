import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { userApi } from '@/api/user';
import type { User } from '@/api/user/types';

export interface UserState {
  data: User | {};
  status: string;
  error: any;
}

// const initialState = {};
const initialState: UserState = {
  data: {},
  status: 'idle',
  error: null,
};
export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await userApi.getInfo();

  return response;
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  // extraReducers(builder) {
  //   builder.addCase(fetchUser.fulfilled, (state, action) => {
  //     const fieldNeeded = 'AvailableTimeZones';
  //     const filteredObj = Object.fromEntries(
  //       Object.entries(action.payload).filter(
  //         ([key, value]) => key !== fieldNeeded
  //       )
  //     );
  //     return filteredObj;
  //   });
  // },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';

        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions;
export const selectUserInfo = (state: any) => state.user.data;
export default userSlice.reducer;
