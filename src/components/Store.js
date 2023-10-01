import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";

function Store() {
  const [items, setItems] = useState([]);

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
    };

    onValue(itemsRef, handleData, { onlyOnce: false });

    return () => {
      off(itemsRef, "value", handleData); // Detach the event listener when the component unmounts
    };
  }, []);

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
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            {/* <p className="text-gray-700 mb-4">{item.description}</p> */}
            <div className="flex items-center gap-4 mb-4">
              {" "}
              {/* Flex container */}
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
                  defaultValue="1"
                  className="mt-1 block w-10 rounded-md border-gray-300 shadow-sm focus:border-light-pink focus:ring focus:ring-light-pink focus:ring-opacity-50"
                />
              </div>
              <button className="bg-light-pink text-white py-2 px-4 rounded-full">
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
