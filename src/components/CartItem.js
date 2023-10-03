import React from "react";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../store/cartSlice";
import { DataLayer } from "@piwikpro/react-piwik-pro";

export function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
    DataLayer.push({
      event: "remove_from_cart",
      ecommerce: {
        currency: "USD",
        value: Number(item.quantity) * item.price,
        items: [
          {
            item_id: String(item.id),
            item_name: item.title,
            price: String(item.price),
            quantity: Number(item.quantity),
            item_brand: `${item.title} + Brand`,
            item_category: `${item.title} + Category`,
            item_variant: `${item.title} + S`,
          },
        ],
      },
    });
  };

  return (
    <li className="mb-4">
      <div className="flex justify-between items-center">
        <span className="text-lg">{item.title}</span>
        <div className="flex items-center gap-2">
          <span>Quantity: {item.quantity}</span>
          <button
            onClick={handleRemove}
            className="bg-red-500 text-white rounded-full w-6 h-6 hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
          >
            ×
          </button>
        </div>
      </div>
    </li>
  );
}
