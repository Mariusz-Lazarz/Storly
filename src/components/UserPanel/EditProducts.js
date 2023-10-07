import React, { useState, useEffect } from "react";
import { revertBlur } from "../../utils/blur";
import { getDatabase, ref, onValue, off, update, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import Alert from "../Modal/Alert";
import LoadingSpinner from "../../utils/LoadingSpinner";
import ProductForm from "./ProductForm";
import ProductItem from "./ProductItem";

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

  const handleCloseClick = () => {
    setEditingProductId(null);
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
              <ProductForm
                handleFormSubmit={handleFormSubmit}
                handleInputChange={handleInputChange}
                handleCloseClick={handleCloseClick}
                editFormData={editFormData}
              />
            ) : (
              <ProductItem
                product={product}
                handleEditClick={handleEditClick}
                handleRemoveItem={handleRemoveItem}
              />
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
