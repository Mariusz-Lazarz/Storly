// Cart.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../store/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  // Calculate the total amount of the cart
  const totalAmount = cartItems
    .reduce((total, item) => {
      return total + parseFloat(item.totalPrice);
    }, 0)
    .toFixed(2);

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cartItems.length > 0 && (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg">{item.title}</span>
                  <div className="flex items-center gap-2">
                    {" "}
                    <button
                      onClick={() => dispatch(increaseQuantity(item.id))}
                      className="bg-blue-500 text-white rounded-full w-8 h-8 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
                    >
                      +
                    </button>
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="bg-red-500 text-white rounded-full w-8 h-8 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                    >
                      -
                    </button>
                    <span>Quantity: {item.quantity}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <div className="mt-4 font-semibold text-lg">
            Total Amount: ${totalAmount}
          </div>
        )}
      </div>
      <div className="w-full md:w-1/2 md:pl-4">
        <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
        <form>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="text"
              id="name"
              name="name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="text"
              id="address"
              name="address"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="city"
            >
              City
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="text"
              id="city"
              name="city"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="zip"
            >
              ZIP Code
            </label>
            <input
              className="mt-1 p-2 w-full border rounded-md"
              type="text"
              id="zip"
              name="zip"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-light-pink text-white py-2 px-4 rounded-full"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cart;
