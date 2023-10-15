import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, push, set } from "firebase/database";
import { DataLayer } from "@piwikpro/react-piwik-pro";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/cartSlice";
import { CartItem } from "./CartItem";
import DeliveryDetailsForm from "./DeliveryDetailsForm";
import Overlay from "../Modal/Overlay";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Alert from "../Modal/Alert";
import useRedirect from "../../hooks/useRedirect";
import Modal from "../Modal/Modal";

function Cart() {
  useRedirect();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useAuth();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const orderItems = cartItems.map((item) => ({
    item_id: item.id || "Unknown",
    item_title: item.title || "Unknown",
    price: item.price || "Unknown",
    item_brand: item.brand || "Unknown",
    item_category: item.category || "Unknown",
    item_variant: item.variant || "Unknown",
    quantity: item.quantity || "Unknown",
  }));

  const totalAmount = cartItems
    .reduce((total, item) => total + parseFloat(item.totalPrice), 0)
    .toFixed(2);

  const handlePlaceOrder = async (deliveryDetails) => {
    setIsOrderPlaced(true);
    setIsOverlayVisible(true);

    const db = getDatabase();
    const newOrderRef = push(ref(db, `orders`));
    const uniqueKey = newOrderRef.key;

    const currentDate = new Date();
    const dateString = currentDate.toUTCString();

    await set(newOrderRef, {
      userId: auth.uid,
      transaction_id: uniqueKey,
      date: dateString,
      value: totalAmount,
      tax: 3.26,
      shipping: 5.0,
      items: orderItems,
      deliveryDetails,
    });

    DataLayer.push({
      event: "purchase",
      ecommerce: {
        currency: "USD",
        transaction_id: uniqueKey,
        value: totalAmount,
        tax: 3.26,
        shipping: 5.0,
        items: orderItems,
      },
    });
    setIsOrderPlaced(false);
    setIsOverlayVisible(false);
    setIsAlertVisible(true);
  };

  const handleAlertConfirm = () => {
    setIsAlertVisible(false);
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="container mx-auto p-4 flex flex-col md:flex-row">
      {isOverlayVisible && <Overlay />}
      <div className="w-full md:w-1/2 mb-4 md:mb-0 md:pr-4">
        <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
        {cartItems.length === 0 && (
          <p className="text-lg text-red-500">
            Your cart is empty. Please add items!
          </p>
        )}
        {cartItems.length > 0 && (
          <ul>
            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </ul>
        )}
        {cartItems.length > 0 && (
          <div className="mt-4 font-semibold text-lg">
            Total Amount: ${totalAmount}
          </div>
        )}
        <Modal isOpen={isOrderPlaced} onClose={null}>
          <LoadingSpinner />
        </Modal>
      </div>
      <div className="w-full md:w-1/2 md:pl-4">
        <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
        <DeliveryDetailsForm
          onPlaceOrder={handlePlaceOrder}
          cartIsEmpty={cartItems.length === 0}
        />
      </div>
      {isAlertVisible && (
        <Alert
          isOpen={isAlertVisible}
          title="Purchase Successful"
          message="Thank you for your purchase!"
          onConfirm={handleAlertConfirm}
        />
      )}
    </div>
  );
}

export default Cart;
