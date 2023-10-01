// cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.item.id
      );

      if (existingItemIndex >= 0) {
        state.items[existingItemIndex].quantity += action.payload.quantity;
        // Recalculate the total price for this item
        state.items[existingItemIndex].totalPrice = (
          state.items[existingItemIndex].quantity *
          state.items[existingItemIndex].price
        ).toFixed(2); // Keeps the price in a string format with two decimal places
      } else {
        state.items.push({
          ...action.payload.item,
          quantity: action.payload.quantity,
          totalPrice: (
            action.payload.item.price * action.payload.quantity
          ).toFixed(2),
        });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
