// Cart.js
import React from "react";
import { useSelector } from "react-redux";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id} className="mb-4">
              <div className="flex justify-between items-center">
                <span className="text-lg">{item.title}</span>
                <span>Quantity: {item.quantity}</span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
