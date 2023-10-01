import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../store/cartSlice";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  // Delivery details state
  const [deliveryDetails, setDeliveryDetails] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Calculate the total amount of the cart
  const totalAmount = cartItems
    .reduce((total, item) => {
      return total + parseFloat(item.totalPrice);
    }, 0)
    .toFixed(2);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      // Prevent placing an order if the cart is empty
      alert("Your cart is empty. Please add items to your cart.");
    } else {
      // Simulate placing an order (you can replace this with your actual order logic)
      // For demonstration purposes, we'll use a setTimeout to simulate an order being placed.
      setIsOrderPlaced(true);
      setTimeout(() => {
        setIsOrderPlaced(false);
        dispatch(clearCart()); // Clear the cart after the order is successfully placed
        alert("Thank you for your purchase!");

        // Clear the delivery details fields by resetting the state
        setDeliveryDetails({
          name: "",
          address: "",
          city: "",
          zip: "",
        });
      }, 2000); // Simulated 2-second delay for the order process
    }
  };

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
        {isOrderPlaced && (
          <div className="mt-2 text-green-600">
            Thank you for your purchase! Your order is being processed.
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
              value={deliveryDetails.name}
              onChange={handleInputChange}
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
              value={deliveryDetails.address}
              onChange={handleInputChange}
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
              value={deliveryDetails.city}
              onChange={handleInputChange}
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
              value={deliveryDetails.zip}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            onClick={handlePlaceOrder}
            className="bg-light-pink text-white py-2 px-4 rounded-full mt-4"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}

export default Cart;
