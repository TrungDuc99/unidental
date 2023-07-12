import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { cartApi } from '@/api/cart';
import type { ItemCart } from '@/types';

export interface CartState {
  items: ItemCart[];

  status: string;
  error: any;
}

const initialState: CartState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const response = await cartApi.getOne();
  return response;
});
export const addNewCart = createAsyncThunk(
  'cart/addNewCart',
  async (initialPost: any) => {
    const response = await cartApi.addToCart(initialPost);
    return response;
  }
);
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<ItemCart>) => {
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
    removeFromCart: (state, action: PayloadAction<{ id: number }>) => {
      const itemIndex = state.items.findIndex(
        (item) => item.Id === action.payload.id
      );
      if (itemIndex > -1) {
        // Check if item quantity is zero
        if (state.items[itemIndex].Quantity === 1) {
          // Remove item from cart
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
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.concat(action.payload.Items);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addNewCart.fulfilled, (state, action) => {
        state.items.push(action.payload);
      });
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: any) => state.cart.items;
export const selectCartItemsWithId = (state: any, id: number) =>
  state.cart?.items.filter(
    (item: ItemCart) => Number(item.Id) === Number(id)
  )[0];
export const selectProductQuantity = (state: any) =>
  state.cart.items.reduce(
    (total: number, item: ItemCart) => total + item.Quantity,
    0
  );

export const selectCartTotalPrice = (state: any): number =>
  state.cart.items.reduce(
    (total: number, item: ItemCart) =>
      total + item.UnitPriceValue * item.Quantity,
    0
  );
export default cartSlice.reducer;
