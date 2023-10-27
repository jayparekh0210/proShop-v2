import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { items: [] };

const cartSlice = createSlice({
  name: "Cart",
  initialState: initialState,
  reducers: {
    addProduct: (state, action) => {
      const item = action.payload;
      const exisitingItem = [];

      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i]._id === item._id) {
          exisitingItem.push(item);
        }
      }
      console.log(exisitingItem);
      if (exisitingItem.length !== 0) {
        state.items = state.items.map((x) => {
          return x._id === exisitingItem[0]._id ? item : x;
        });
      } else {
        state.items.push(item);
      }
      return updateCart(state);
    },
    removeProduct: (state, action) => {
      const exisitingItem = [];

      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i]._id !== action.payload) {
          exisitingItem.push(state.items[i]);
        }
      }
      state.items = exisitingItem;
    },
    clearCart: (state, action) => {
      state.items = [];
    },
  },
});

export default cartSlice.reducer;
export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
