import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getAuth } from "firebase/auth";

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
          console.log(data);
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
        <div className="mt-2 flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="border-l-4 border-green-500 p-4 mb-4">
            <div
              className="flex flex-col sm:flex-row justify-between cursor-pointer"
              onClick={() =>
                setExpandedOrderId((prevId) =>
                  prevId === order.id ? null : order.id
                )
              }
            >
              <span className="mb-2 sm:mb-0">ID: {order.id}</span>
              <span className="mb-2 sm:mb-0">Date: {order.date}</span>
              <span className="mb-2 sm:mb-0">Value: ${order.value}</span>
              <span
                className={`transform transition-transform ${
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
        ))
      )}
    </div>
  );
}

export default OrderHistory;
