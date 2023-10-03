import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { addToCart } from "../store/cartSlice";
import { getAuth } from "firebase/auth";
import StoreItem from "./StoreItem";
import { DataLayer } from "@piwikpro/react-piwik-pro";

function Store() {
  const [items, setItems] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const dispatch = useDispatch();
  const auth = getAuth();

  const itemsInCart = useSelector((state) => state.cart.items);

  const itemIdsInCart = itemsInCart.map((item) => item.id);

  useEffect(() => {
    const db = getDatabase();
    const itemsRef = ref(db, "items");

    const handleData = (snapshot) => {
      const data = snapshot.val();
      const loadedItems = Object.keys(data).map((key) => ({
        id: key,
        ...data[key],
      }));
      setItems(loadedItems);

      const initialQuantities = loadedItems.reduce((acc, item) => {
        acc[item.id] = 1;
        return acc;
      }, {});
      setSelectedQuantities(initialQuantities);
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

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {items.map((item) => (
          <StoreItem
            key={item.id}
            item={item}
            selectedQuantities={selectedQuantities}
            handleQuantityChange={handleQuantityChange}
            handleAddToCart={handleAddToCart}
            itemsInCart={itemIdsInCart} // Pass item IDs in the cart as a prop
          />
        ))}
      </div>
    </div>
  );
}

export default Store;
