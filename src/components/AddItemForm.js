import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function AddItemForm() {
  const [title, setTitle] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState(""); // State to hold the price
  const [error, setError] = useState(null);
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(user); // User is signed in.
      } else {
        setAuth(null); // User is signed out.
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const addItem = async (e) => {
    e.preventDefault();

    if (!auth) {
      setError("Please login to add an item");
      return;
    }

    try {
      const db = getDatabase();
      const itemsRef = ref(db, "items");
      const newItemRef = push(itemsRef);
      await set(newItemRef, {
        title,
        imageLink,
        description,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price).toFixed(2), // Price is stored as a string with two decimal places
      });
      console.log("Item added successfully");
      setTitle("");
      setImageLink("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setError(null);
    } catch (error) {
      console.error("Error adding item", error);
      setError(error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg my-4 w-full md:w-11/12 lg:w-1/4 mx-auto">
      <form onSubmit={addItem} className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Add Item</h2>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="url"
          placeholder="Image Link"
          value={imageLink}
          onChange={(e) => setImageLink(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="p-2 border rounded"
          step="0.01" // Allow decimal numbers
          required
        />
        <button
          type="submit"
          className="bg-light-pink text-white p-2 rounded-full"
        >
          Add Item
        </button>
      </form>
    </div>
  );
}

export default AddItemForm;
