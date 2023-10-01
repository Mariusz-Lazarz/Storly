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
      // Check if the item is already in the cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.item.id
      );

      if (existingItemIndex >= 0) {
        // If the item is already in the cart, update its quantity
        state.items[existingItemIndex].quantity += action.payload.quantity;
      } else {
        // If the item is not in the cart, add it with the specified quantity
        state.items.push({
          ...action.payload.item,
          quantity: action.payload.quantity,
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
