import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getAuth } from "firebase/auth";

function OrderHistory() {
  const auth = getAuth();
  const curUser = auth.currentUser;
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const ordersRef = ref(db, `orders/${curUser.uid}`);

    const handleData = (snapshot) => {
      const data = snapshot.val();
      const ordersArray = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setOrders(ordersArray);
    };

    onValue(ordersRef, handleData);
    return () => {
      off(ordersRef, "value", handleData);
    };
  }, []);

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  return (
    <div>
      {orders.map((order) => (
        <div key={order.id} className="border-l-4 border-green-500 p-4 mb-4">
          <div
            className="flex justify-between cursor-pointer"
            onClick={() =>
              setExpandedOrderId((prevId) =>
                prevId === order.id ? null : order.id
              )
            }
          >
            <span>ID: {order.id}</span>
            <span>Date: {order.date}</span>
            <span>Value: ${order.value}</span>
            <span
              className={`transform transition-transform ${
                order.id === expandedOrderId ? "rotate-180" : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </span>
          </div>
          {order.id === expandedOrderId && (
            <div className="mt-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 md:grid-cols-6 gap-4 p-2 border-b"
                >
                  <span>{item.item_title}</span>
                  <span>ID: {item.item_id}</span>
                  <span>Price: ${item.price}</span>
                  <span>Category: {item.item_category}</span>
                  <span>Brand: {item.item_brand}</span>
                  <span>Quantity: {item.quantity}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default OrderHistory;
