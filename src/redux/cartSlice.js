import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import store from "store-js";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    updateCart: (state, action) => {
      state.cartItems = action.payload;
      store.set("cartItems", state.cartItems);
    },
    deleteItem: (state, action) => {
      _.remove(state.cartItems, (item) => {
        return (
          item.id === action.payload.id && item.size === action.payload.size
        );
      });
      store.set("cartItems", state.cartItems);
    },
  },
});

export const { updateCart, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
