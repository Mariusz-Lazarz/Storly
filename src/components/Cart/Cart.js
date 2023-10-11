import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue, off, push, set } from "firebase/database";
import { DataLayer } from "@piwikpro/react-piwik-pro";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../../store/cartSlice";
import { CartItem } from "./CartItem";
import DeliveryDetailsForm from "./DeliveryDetailsForm";
import Overlay from "../Modal/Overlay";
import { getAuth } from "firebase/auth";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Alert from "../Modal/Alert";
import useRedirect from "../../hooks/useRedirect";
import Modal from "../Modal/Modal";

function Cart() {
  useRedirect();
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [maxQuantities, setMaxQuantities] = useState({});
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  console.log(new Date());

  useEffect(() => {
    const db = getDatabase();
    const itemsRef = ref(db, "items");

    const onItemsValueChange = (snapshot) => {
      const data = snapshot.val();
      if (data && typeof data === "object") {
        const newMaxQuantities = Object.keys(data).reduce((acc, key) => {
          if (typeof data[key] === "object" && !Array.isArray(data[key])) {
            Object.keys(data[key]).forEach((nestedKey) => {
              acc[nestedKey] = data[key][nestedKey].quantity;
            });
          }
          return acc;
        }, {});

        setMaxQuantities(newMaxQuantities);
      } else {
        setMaxQuantities({});
      }
    };

    onValue(itemsRef, onItemsValueChange);

    return () => {
      off(itemsRef, onItemsValueChange);
    };
  }, []);

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
    if (cartItems.length === 0) {
      alert("Your cart is empty. Please add items to your cart.");
      return;
    }
    setIsOrderPlaced(true);
    setIsOverlayVisible(true);

    const db = getDatabase();
    const newOrderRef = push(ref(db, `orders/${auth.currentUser.uid}`));
    const uniqueKey = newOrderRef.key;

    const currentDate = new Date();
    const dateString = currentDate.toUTCString();

    await set(newOrderRef, {
      userid: auth.currentUser.uid,
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
    setTimeout(() => {
      setIsOrderPlaced(false);
      setIsOverlayVisible(false);
      setIsAlertVisible(true);
    }, 2000);
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
        <Modal isOpen={isOrderPlaced} onClose={null}>
          <LoadingSpinner />
        </Modal>
      </div>
      <div className="w-full md:w-1/2 md:pl-4">
        <h2 className="text-2xl font-semibold mb-4">Delivery Details</h2>
        <DeliveryDetailsForm onPlaceOrder={handlePlaceOrder} />
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
