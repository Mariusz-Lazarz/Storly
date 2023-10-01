import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "../store/cartSlice";
import { getDatabase, ref, onValue, off } from "firebase/database";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [maxQuantities, setMaxQuantities] = useState({});

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

  const handleIncrease = (itemId) => {
    const itemInCart = cartItems.find((item) => item.id === itemId);

    if (itemInCart) {
      const availableQuantity = maxQuantities[itemId];

      if (itemInCart.quantity < availableQuantity) {
        dispatch(increaseQuantity(itemId));
      } else {
        alert(`You can't add more than ${availableQuantity} of this item.`);
      }
    }
  };

  useEffect(() => {
    const db = getDatabase();
    const itemsRef = ref(db, "items"); // Replace with the correct path to your items in Firebase

    onValue(itemsRef, (snapshot) => {
      const data = snapshot.val();
      const newMaxQuantities = {};

      for (const key in data) {
        newMaxQuantities[key] = data[key].quantity;
      }

      setMaxQuantities(newMaxQuantities);
    });

    return () => {
      // Clean up the Firebase listener when component unmounts
      off(itemsRef);
    };
  }, []);

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart.");
    } else {
      setIsOrderPlaced(true);
      setTimeout(() => {
        setIsOrderPlaced(false);
        dispatch(clearCart());
        alert("Thank you for your purchase!");
        setDeliveryDetails({
          name: "",
          address: "",
          city: "",
          zip: "",
        });
      }, 2000);
    }
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cartItems.length === 0 && <p>Your cart is empty. Please add items!</p>}
        {cartItems.length > 0 && (
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg">{item.title}</span>
                  <div className="flex items-center gap-2">
                    {" "}
                    <button
                      onClick={() => handleIncrease(item.id)}
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
