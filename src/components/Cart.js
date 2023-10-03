import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { DataLayer } from "@piwikpro/react-piwik-pro";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../store/cartSlice";
import { CartItem } from "./CartItem";
import { DeliveryDetailsForm } from "./DeliveryDetailsForm";

function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [maxQuantities, setMaxQuantities] = useState({});

  useEffect(() => {
    const db = getDatabase();
    const itemsRef = ref(db, "items");

    const onItemsValueChange = (snapshot) => {
      const data = snapshot.val();
      const newMaxQuantities = {};

      for (const key in data) {
        newMaxQuantities[key] = data[key].quantity;
      }

      setMaxQuantities(newMaxQuantities);
    };

    onValue(itemsRef, onItemsValueChange);

    return () => {
      off(itemsRef, onItemsValueChange);
    };
  }, []);

  const totalAmount = cartItems
    .reduce((total, item) => total + parseFloat(item.totalPrice), 0)
    .toFixed(2);

  const handlePlaceOrder = async (deliveryDetails) => {
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart.");
      return;
    }

    const orderItems = cartItems.map((item) => ({
      item_id: item.id,
      item_name: item.name,
      price: item.price,
      item_brand: item.brand,
      item_category: item.category,
      item_variant: item.variant,
      quantity: item.quantity,
    }));

    const orderNumber = Math.floor(Math.random() * 100) + 1;

    setIsOrderPlaced(true);
    DataLayer.push({
      event: "purchase",
      ecommerce: {
        currency: "USD",
        transaction_id: String(orderNumber),
        value: totalAmount,
        tax: 3.26,
        shipping: 5.0,
        items: orderItems,
      },
    });
    setTimeout(() => {
      setIsOrderPlaced(false);
      dispatch(clearCart());
      alert("Thank you for your purchase!");
      navigate("/");
    }, 1000);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cartItems.length === 0 && <p>Your cart is empty. Please add items!</p>}
        {cartItems.length > 0 && (
          <ul>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                maxQuantity={maxQuantities[item.id]}
              />
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
        <DeliveryDetailsForm onPlaceOrder={handlePlaceOrder} />
      </div>
    </div>
  );
}

export default Cart;
