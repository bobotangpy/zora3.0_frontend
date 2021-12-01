import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import store from "store-js";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    total: null,
  },
  reducers: {
    updateCart: (state, action) => {
      state.cartItems = action.payload;
      // Update localStorage to persist data when page refresh
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
    updateTotal: (state) => {
      let prices = [];
      if (state.cartItems.length > 0) {
        _.forEach(state.cartItems, (item) => {
          prices.push(Number(item.price.split("$")[1].replaceAll(",", "")));
        });

        let t = _.reduce(
          prices,
          (sum, i) => {
            return sum + i;
          },
          0
        );

        state.total = t.toFixed(2);
      }
    },
  },
});

export const { updateCart, deleteItem, updateTotal } = cartSlice.actions;

export default cartSlice.reducer;
