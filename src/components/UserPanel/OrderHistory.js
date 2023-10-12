import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faSort } from "@fortawesome/free-solid-svg-icons";
import {
  getDatabase,
  ref,
  onValue,
  off,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import LoadingSpinner from "../../utils/LoadingSpinner";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc");


  const sortOrders = (orderArray, order) => {
    const sortedArray = [...orderArray].sort((a, b) => {
      return order === "asc"
        ? a.date.localeCompare(b.date)
        : b.date.localeCompare(a.date);
    });
    return sortedArray;
  };

  const toggleSortOrder = () => {
    setSortOrder((prevSortOrder) => (prevSortOrder === "asc" ? "desc" : "asc"));
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const ordersRef = ref(db, "orders");
        const userQuery = query(
          ordersRef,
          orderByChild("userId"),
          equalTo(user.uid)
        );

        const handleData = (snapshot) => {
          const data = snapshot.val();
          const ordersArray = data
            ? sortOrders(
                Object.keys(data).map((key) => ({ id: key, ...data[key] })),
                sortOrder
              )
            : [];
          setOrders(ordersArray);
          setIsLoading(false);
        };

        onValue(userQuery, handleData);
        return () => {
          off(userQuery, "value", handleData);
        };
      }
    });

    return () => {
      unsubscribe();
    };
  }, [sortOrder]);

  return (
    <div className="p-2 overflow-y-scroll h-screen">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="mb-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-gray-100 text-gray-700 font-semibold">
            <span className="text-center">Order ID</span>
            <span
              className="text-center cursor-pointer"
              onClick={toggleSortOrder}
            >
              Date
              <FontAwesomeIcon
                icon={faSort}
                className="ml-1"
                style={{ fontSize: "15px" }}
              />
            </span>
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
                <span className="text-center">
                  {new Date(order.date).toLocaleString()}
                </span>
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
