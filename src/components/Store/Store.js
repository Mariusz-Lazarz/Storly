import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { addToCart } from "../../store/cartSlice";
import { getAuth } from "firebase/auth";
import StoreItem from "./StoreItem";
import { DataLayer } from "@piwikpro/react-piwik-pro";
import LoadingSpinner from "../../utils/LoadingSpinner";

const Store = () => {
  const [items, setItems] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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

        const initialQuantities = loadedItems.reduce((acc, item) => {
          acc[item.id] = 1;
          return acc;
        }, {});
        setSelectedQuantities(initialQuantities);
      } else {
        setItems([]);
        setSelectedQuantities({});
      }
      setIsLoading(false);
    };

    onValue(itemsRef, handleData);
    return () => off(itemsRef, "value", handleData);
  }, [dispatch]);

  const handleQuantityChange = (itemId, quantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = selectedQuantities[item.id];
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
              item_brand: `${item.title} + Brand`,
              item_category: `${item.title} + Category`,
              item_variant: `${item.title} + S`,
            },
          ],
        },
      });
    } else {
      alert("You must be logged in to add items to your cart.");
    }
  };

  // const handleRemoveItem = (itemId) => {
  //   const db = getDatabase();
  //   const itemRef = ref(db, `items/${auth.currentUser.uid}/${itemId}`);
  //   set(itemRef, null);
  // };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <LoadingSpinner ></LoadingSpinner>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {items.length > 0 ? (
            items.map((item) => (
              <StoreItem
                key={item.id}
                item={item}
                selectedQuantities={selectedQuantities}
                handleQuantityChange={handleQuantityChange}
                handleAddToCart={handleAddToCart}
                itemsInCart={itemIdsInCart}
                // handleRemoveItem={handleRemoveItem}
              />
            ))
          ) : (
            <div className="col-span-full text-center text-red-600 text-xl">
              Our store is currently empty. Let's add something to begin!
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Store;
