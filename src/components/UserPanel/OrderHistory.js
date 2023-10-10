import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getAuth } from "firebase/auth";
import LoadingSpinner from "../../utils/LoadingSpinner";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const ordersRef = ref(db, `orders/${user.uid}`);

        const handleData = (snapshot) => {
          const data = snapshot.val();
          const ordersArray = data
            ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
            : [];
          setOrders(ordersArray);
          setIsLoading(false);
        };

        onValue(ordersRef, handleData);
        return () => {
          off(ordersRef, "value", handleData);
        };
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [expandedOrderId, setExpandedOrderId] = useState(null);

  return (
    <div className="p-2">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-gray-100 text-gray-700 font-semibold">
            <span className="text-center">Order ID</span>
            <span className="text-center">Date</span>
            <span className="text-center">Value</span>
            <span className="text-center">Details</span>
          </div>
          {orders.map((order) => (
            <div
              key={order.id}
              className="border-l-4 border-green-500 p-4 mb-6 shadow-lg"
            >
              <div
                className="grid grid-cols-1 sm:grid-cols-4 gap-4 cursor-pointer p-4"
                onClick={() =>
                  setExpandedOrderId((prevId) =>
                    prevId === order.id ? null : order.id
                  )
                }
              >
                <span className="text-center text-blue-600">{order.id}</span>
                <span className="text-center">{order.date}</span>
                <span className="text-center">$ {order.value}</span>
                <span
                  className={`text-center transform transition-transform ${
                    order.id === expandedOrderId ? "rotate-180" : ""
                  }`}
                >
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={
                      order.id === expandedOrderId ? "fa-rotate-180" : ""
                    }
                  />
                </span>
              </div>
              {order.id === expandedOrderId && (
                <div className="mt-4">
                  {order.items.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-2 border-b"
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
      )}
    </div>
  );
}

export default OrderHistory;
