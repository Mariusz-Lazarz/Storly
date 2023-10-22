import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StoreItem from "./StoreItem";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Search from "./Search";
import { useSearchParams } from "react-router-dom";
import Alert from "../Modal/Alert";
import useAlert from "../../hooks/useAlert";
import Pagination from "./Pagination";
import { useItems } from "./useItems";
import useAddToCart from "./useAddToCart";

const Store = () => {
  const { items, isLoading } = useItems();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const { alert, showAlert, hideAlert } = useAlert();
  const handleAddToCart = useAddToCart(showAlert);
  const itemsInCart = useSelector((state) => state.cart.items);
  const itemIdsInCart = itemsInCart.map((item) => item.id);
  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const itemsPerPage = 28;
  const [currentPage, setCurrentPage] = useState(1);
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

  return (
    <div className="container mx-auto p-4">
      <Search searchQuery={searchQuery} handleSearch={handleSearch} />
      {isLoading ? (
        <LoadingSpinner></LoadingSpinner>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4">
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
      <Pagination
        searchQuery={searchQuery}
        filteredItems={filteredItems}
        paginate={paginate}
        currentPage={currentPage}
        totalPages={Math.ceil(filteredItems.length / itemsPerPage)}
      />

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
