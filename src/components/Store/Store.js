import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { addToCart } from "../../store/cartSlice";
import { getAuth } from "firebase/auth";
import StoreItem from "./StoreItem";
import { DataLayer } from "@piwikpro/react-piwik-pro";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Search from "./Search";
import { useSearchParams } from "react-router-dom";

const Store = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const dispatch = useDispatch();
  const auth = getAuth();

  const itemsInCart = useSelector((state) => state.cart.items);
  const itemIdsInCart = itemsInCart.map((item) => item.id);

  useEffect(() => {
    const db = getDatabase();
    const itemsRef = ref(db, "items");

    const handleData = (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedItems = Object.keys(data).flatMap((key) => {
          if (typeof data[key] === "object" && !Array.isArray(data[key])) {
            return Object.keys(data[key]).map((nestedKey) => ({
              id: nestedKey,
              ...data[key][nestedKey],
            }));
          }
          return [];
        });
        setItems(loadedItems);
      } else {
        setItems([]);
      }
      setIsLoading(false);
    };

    onValue(itemsRef, handleData);
    return () => off(itemsRef, "value", handleData);
  }, []);

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (item, quantity) => {
    const user = auth.currentUser;

    if (user) {
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
      alert("You must be logged in to add items to your cart.");
    }
  };

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
        <div className="grid grid-cols-2 md:grid-cols-7 lg:grid-cols-10 gap-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
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
    </div>
  );
};

export default Store;
