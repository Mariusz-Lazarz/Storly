import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { addToCart } from "../store/cartSlice";

function Store() {
  const [items, setItems] = useState([]);
  const [selectedQuantities, setSelectedQuantities] = useState({});
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    console.log("Cart Items:", cartItems);
  }, [cartItems]);

  useEffect(() => {
    const db = getDatabase();
    const itemsRef = ref(db, "items");

    const handleData = (snapshot) => {
      const data = snapshot.val();
      const loadedItems = [];
      for (let key in data) {
        loadedItems.push({
          id: key,
          ...data[key],
        });
      }
      setItems(loadedItems);

      const initialQuantities = {};
      loadedItems.forEach((item) => {
        initialQuantities[item.id] = 1;
      });
      setSelectedQuantities(initialQuantities);
    };

    onValue(itemsRef, handleData, { onlyOnce: false });

    return () => {
      off(itemsRef, "value", handleData);
    };
  }, [dispatch]);

  const handleQuantityChange = (itemId, quantity) => {
    setSelectedQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: quantity,
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = selectedQuantities[item.id];
    dispatch(addToCart({ item, quantity: Number(quantity) }));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {items.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded shadow-lg">
            <img
              src={item.imageLink}
              alt={item.title}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="text-lg font-semibold mb-2">
              {item.title} <span className="text-gray-600">${item.price}</span>
            </h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-grow">
                <label
                  htmlFor={`quantity-${item.id}`}
                  className="block text-sm font-medium text-gray-700"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id={`quantity-${item.id}`}
                  name={`quantity-${item.id}`}
                  min="1"
                  max={item.quantity}
                  value={selectedQuantities[item.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(item.id, e.target.value)
                  }
                  className="mt-1 block w-10 rounded-md border-gray-300 shadow-sm focus:border-light-pink focus:ring focus:ring-light-pink focus:ring-opacity-50"
                />
              </div>
              <button
                className="bg-light-pink text-white py-2 px-4 rounded-full"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Store;
