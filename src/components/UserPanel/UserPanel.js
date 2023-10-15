import React, { useState } from "react";
import OrderHistory from "./OrderHistory";
import UserData from "./UserData";
import EditProducts from "./EditProducts";
import Reviews from "./Reviews";
import useRedirect from "../../hooks/useRedirect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHistory,
  faEdit,
  faStar,
  faUser,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import Favourites from "./Favourites";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../utils/LoadingSpinner";

function UserPanel() {
  const [activeTab, setActiveTab] = useState("orderHistory");
  const { auth, loading } = useAuth();
  useRedirect(auth, loading);

  return (
    <div className="container mx-auto p-4">
      {auth ? (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{auth.email}</h1>
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setActiveTab("orderHistory")}
              className={`transition duration-300 ease-in-out px-4 py-2 ${
                activeTab === "orderHistory"
                  ? "bg-white text-gray-800 border-b-4 border-blue-500"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <span className="hidden md:inline">Order History</span>
              <FontAwesomeIcon
                icon={faHistory}
                className="md:hidden"
                aria-hidden="true"
              />
            </button>
            <button
              onClick={() => setActiveTab("editProducts")}
              className={`transition duration-300 ease-in-out px-4 py-2 ${
                activeTab === "editProducts"
                  ? "bg-white text-gray-800 border-b-4 border-blue-500"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <span className="hidden md:inline">Edit Products</span>
              <FontAwesomeIcon
                icon={faEdit}
                className="md:hidden"
                aria-hidden="true"
              />
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`transition duration-300 ease-in-out px-4 py-2 ${
                activeTab === "reviews"
                  ? "bg-white text-gray-800 border-b-4 border-blue-500"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <span className="hidden md:inline">Reviews</span>
              <FontAwesomeIcon
                icon={faStar}
                className="md:hidden"
                aria-hidden="true"
              />
            </button>
            <button
              onClick={() => setActiveTab("userData")}
              className={`transition duration-300 ease-in-out px-4 py-2 ${
                activeTab === "userData"
                  ? "bg-white text-gray-800 border-b-4 border-blue-500"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <span className="hidden md:inline">User Data</span>
              <FontAwesomeIcon
                icon={faUser}
                className="md:hidden"
                aria-hidden="true"
              />
            </button>
            <button
              onClick={() => setActiveTab("userFavourites")}
              className={`transition duration-300 ease-in-out px-4 py-2 ${
                activeTab === "userFavourites"
                  ? "bg-white text-gray-800 border-b-4 border-blue-500"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              <span className="hidden md:inline">User Favourites</span>
              <FontAwesomeIcon
                icon={faHeart}
                className="md:hidden"
                aria-hidden="true"
              />
            </button>
          </div>
          <div className="p-2 bg-white rounded shadow-lg">
            {activeTab === "orderHistory" && <OrderHistory />}
            {activeTab === "editProducts" && <EditProducts />}
            {activeTab === "reviews" && <Reviews />}
            {activeTab === "userData" && <UserData />}
            {activeTab === "userFavourites" && <Favourites />}
          </div>
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
}

export default UserPanel;
