import React, { useState, useEffect } from "react";
import { getDatabase, ref, set, push } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function AddItemForm() {
  const [title, setTitle] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [category, setCategory] = useState("");
  const [variant, setVariant] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(user);
      } else {
        setAuth(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const addItem = async (e) => {
    e.preventDefault();

    if (!auth.currentUser) {
      setError("Please login to add an item");
      return;
    }

    try {
      const db = getDatabase();
      const newItemRef = push(ref(db, "items"));
      await set(newItemRef, {
        title,
        imageLink,
        category,
        variant,
        brand,
        description,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price).toFixed(2),
        userId: auth.currentUser.uid,
      });
      console.log("Item added successfully");
      setTitle("");
      setImageLink("");
      setDescription("");
      setQuantity("");
      setPrice("");
      setError(null);
      navigate("/store");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg my-4 w-full md:w-11/12 lg:w-1/4 mx-auto">
      <form onSubmit={addItem} className="flex flex-col space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Add Item</h2>
        {error && <p className="text-red-500 text-lg">{error}</p>}
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

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Variant"
          value={variant}
          onChange={(e) => setVariant(e.target.value)}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
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
          step="0.01"
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
