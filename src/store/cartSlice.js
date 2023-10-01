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
        state.items[existingItemIndex].totalPrice = (
          state.items[existingItemIndex].quantity *
          state.items[existingItemIndex].price
        ).toFixed(2);
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
    increaseQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex >= 0) {
        state.items[itemIndex].quantity += 1;
        state.items[itemIndex].totalPrice = (
          state.items[itemIndex].quantity * state.items[itemIndex].price
        ).toFixed(2);
      }
    },
    decreaseQuantity: (state, action) => {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex >= 0 && state.items[itemIndex].quantity > 1) {
        state.items[itemIndex].quantity -= 1;
        state.items[itemIndex].totalPrice = (
          state.items[itemIndex].quantity * state.items[itemIndex].price
        ).toFixed(2);
      } else if (itemIndex >= 0 && state.items[itemIndex].quantity === 1) {
        state.items.splice(itemIndex, 1);
      }
    },
    clearCart: (state) => {
      state.items = []; // Set the items array to an empty array to clear the cart
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;
