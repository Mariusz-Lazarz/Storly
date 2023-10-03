import React from "react";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity } from "../store/cartSlice";

export function CartItem({ item, maxQuantity }) {
  const dispatch = useDispatch();

  const handleIncrease = () => {
    if (item.quantity < maxQuantity) {
      dispatch(increaseQuantity(item.id));
    } else {
      alert(`You can't add more than ${maxQuantity} of this item.`);
    }
  };

  return (
    <li className="mb-4">
      <div className="flex justify-between items-center">
        <span className="text-lg">{item.title}</span>
        <div className="flex items-center gap-2">
          <button
            onClick={handleIncrease}
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
  );
}
