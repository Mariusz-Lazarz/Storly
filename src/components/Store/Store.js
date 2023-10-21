import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { addToCart } from "../../store/cartSlice";
import StoreItem from "./StoreItem";
import { DataLayer } from "@piwikpro/react-piwik-pro";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Search from "./Search";
import { useSearchParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Alert from "../Modal/Alert";
import useAlert from "../../hooks/useAlert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Store = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const dispatch = useDispatch();
  const auth = useAuth();
  const { alert, showAlert, hideAlert } = useAlert();
  const itemsInCart = useSelector((state) => state.cart.items);
  const itemIdsInCart = itemsInCart.map((item) => item.id);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 28;
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchParams({ q: query });
  };

  useEffect(() => {
    const db = getDatabase();
    const itemsRef = ref(db, "items");

    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const itemsArray = Object.entries(data).map(([id, value]) => {
          return { id, ...value };
        });
        setItems(itemsArray);
      } else {
        setItems([]);
      }
      setIsLoading(false);
    };

    onValue(itemsRef, handleData);
    return () => off(itemsRef, "value", handleData);
  }, []);

  const handleAddToCart = (item, quantity) => {
    if (auth) {
      dispatch(addToCart({ item, quantity: Number(quantity) }));
      DataLayer.push({
        event: "add_to_cart",
        ecommerce: {
          currency: "USD",
          value: Number(quantity) * item.price,
          items: [
            {
              item_id: String(item.id),
              item_name: item.title,
              price: String(item.price),
              quantity: Number(quantity),
              item_brand: item.brand,
              item_category: item.category,
              item_variant: item.variant,
            },
          ],
        },
      });
    } else {
      showAlert(
        "Authentication error",
        "Kindly sign in to add items to your cart"
      );
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Search searchQuery={searchQuery} handleSearch={handleSearch} />
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <StoreItem
                key={item.id}
                item={item}
                handleAddToCart={handleAddToCart}
                itemsInCart={itemIdsInCart}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-red-600 text-xl">
              No items found
            </div>
          )}
        </div>
      )}
      <div className="pagination-controls flex items-center justify-center mt-4">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 font-semibold  bg-white rounded-lg focus:outline-none ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        {currentPage !== 1 && (
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-4 py-2 mx-1 font-semibold  bg-white rounded-lg focus:outline-none ${
              currentPage === 1
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-200"
            }`}
          >
            {currentPage - 1}
          </button>
        )}
        <button className="px-4 py-2 mx-1 font-semibold  bg-blue-500 rounded-lg focus:outline-none dark:bg-blue-700">
          {currentPage}
        </button>
        {currentPage !== totalPages && (
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 mx-1 font-semibold  bg-white rounded-lg focus:outline-none ${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-200"
            }`}
          >
            {currentPage + 1}
          </button>
        )}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 font-semibold  bg-white rounded-lg focus:outline-none ${
            currentPage === totalPages
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-200"
          }`}
        >
          <FontAwesomeIcon icon={faAngleRight} />
        </button>
      </div>

      <Alert
        isOpen={alert.isOpen}
        title={alert.title}
        message={alert.message}
        onConfirm={hideAlert}
      />
    </div>
  );
};

export default Store;
