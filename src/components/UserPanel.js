import React, { useState } from "react";
import OrderHistory from "./OrderHistory";
import UserData from "./UserData";

function UserPanel() {
  const [activeTab, setActiveTab] = useState("orderHistory");

  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">User Panel</h1>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setActiveTab("orderHistory")}
            className={`transition duration-300 ease-in-out px-4 py-2 ${
              activeTab === "orderHistory"
                ? "bg-white text-gray-800 border-b-4 border-blue-500"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            Order History
          </button>
          <button
            onClick={() => setActiveTab("userData")}
            className={`transition duration-300 ease-in-out px-4 py-2 ${
              activeTab === "userData"
                ? "bg-white text-gray-800 border-b-4 border-blue-500"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            User Data
          </button>
        </div>
        <div className="p-6 bg-white rounded shadow-lg">
          {activeTab === "orderHistory" && <OrderHistory />}
          {activeTab === "userData" && <UserData />}
        </div>
      </div>
    </div>
  );
}

export default UserPanel;
