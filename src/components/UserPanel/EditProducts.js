import React, { useState, useEffect } from "react";
import { revertBlur } from "../../utils/blur";
import { getDatabase, ref, onValue, off, update, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import Alert from "../Modal/Alert";
import LoadingSpinner from "../../utils/LoadingSpinner";

function EditProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);

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

  const handleRemoveItem = (product) => {
    setShowAlert(true);
    setModalProduct(product);
  };

  const handleModalConfirm = () => {
    const db = getDatabase();
    const auth = getAuth();
    const itemRef = ref(db, `items/${auth.currentUser.uid}/${modalProduct.id}`);
    set(itemRef, null);
    revertBlur();
    setShowAlert(false);
    setModalProduct(null);
  };

  const handleModalCancel = () => {
    revertBlur();
    setShowAlert(false);
    setModalProduct(null);
  };

  return (
    <div className="p-2">
      {isLoading ? (
        <LoadingSpinner />
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
                      handleRemoveItem(product);
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
      <Alert
        isOpen={showAlert}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      ></Alert>
    </div>
  );
}

export default EditProducts;
