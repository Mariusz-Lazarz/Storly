import React, { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off, update, set } from "firebase/database";
import { getAuth } from "firebase/auth";

function EditProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const productsRef = ref(db, `items/${user.uid}`);

        const handleData = (snapshot) => {
          const data = snapshot.val();
          const productsArray = data
            ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
            : [];
          setProducts(productsArray);
          setIsLoading(false);
        };

        onValue(productsRef, handleData);
        return () => {
          off(productsRef, "value", handleData);
        };
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditFormData(product);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const db = getDatabase();
    const productRef = ref(
      db,
      `items/${getAuth().currentUser.uid}/${editingProductId}`
    );
    await update(productRef, editFormData);
    setEditingProductId(null);
  };

  const handleRemoveItem = (productId) => {
    const db = getDatabase();
    const auth = getAuth();
    const itemRef = ref(db, `items/${auth.currentUser.uid}/${productId}`);
    set(itemRef, null);
  };

  return (
    <div className="p-2">
      {isLoading ? (
        <div className="mt-2 flex justify-center items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        products.map((product) => (
          <div
            key={product.id}
            className="border-l-4 border-green-500 p-4 mb-4 flex flex-col"
          >
            {editingProductId === product.id ? (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <label className="block">
                  <span className="text-gray-700">Title</span>
                  <input
                    type="text"
                    name="title"
                    value={editFormData.title}
                    onChange={handleInputChange}
                    className="border p-2 w-full mt-1"
                    placeholder="Title"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Description</span>
                  <input
                    type="text"
                    name="description"
                    value={editFormData.description}
                    onChange={handleInputChange}
                    className="border p-2 w-full mt-1"
                    placeholder="Description"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Quantity</span>
                  <input
                    type="number"
                    name="quantity"
                    value={editFormData.quantity}
                    onChange={handleInputChange}
                    className="border p-2 w-full mt-1"
                    placeholder="Quantity"
                  />
                </label>
                <label className="block">
                  <span className="text-gray-700">Price</span>
                  <input
                    type="number"
                    name="price"
                    value={editFormData.price}
                    onChange={handleInputChange}
                    className="border p-2 w-full mt-1"
                    placeholder="Price"
                    step="0.01"
                  />
                </label>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                  Submit
                </button>
              </form>
            ) : (
              <div className="flex justify-between items-center">
                <img
                  src={product.imageLink}
                  alt={product.title}
                  className="w-16 h-16 object-cover"
                />
                <div className="flex-1 ml-4 flex items-center justify-between">
                  <span className="text-lg">{product.title}</span>
                  <span className="text-sm">{product.description}</span>
                  <span className="text-sm">Quantity: {product.quantity}</span>
                  <span className="text-lg">${product.price}</span>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="px-4 py-2 ml-4 bg-blue-500 text-white rounded-lg"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </button>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    onClick={() => {
                      handleRemoveItem(product.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default EditProducts;
