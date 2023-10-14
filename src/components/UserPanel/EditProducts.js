import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  off,
  update,
  set,
  orderByChild,
  equalTo,
  query,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import Alert from "../Modal/Alert";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Modal from "../Modal/Modal";
import ProductForm from "./ProductForm";
import ProductItem from "./ProductItem";


function EditProducts() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [updating, setIsUpdating] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const productsRef = ref(db, "items");
        const userQuery = query(
          productsRef,
          orderByChild("userId"),
          equalTo(user.uid)
        );

        const handleData = (snapshot) => {
          const data = snapshot.val();
          const productsArray = data
            ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
            : [];
          setProducts(productsArray);
          setIsLoading(false);
        };

        onValue(userQuery, handleData);

        return () => {
          off(userQuery, "value", handleData);
        };
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleFormSubmit = async (e, updatedFormData) => {
    e.preventDefault();
    setIsUpdating(true);
    const db = getDatabase();
    const productRef = ref(db, `items/${editingProductId}`);

    try {
      await update(productRef, updatedFormData);
      console.log("Update Successful", updatedFormData);
      setEditingProductId(null);
      setIsUpdating(false);
    } catch (error) {
      console.error("Firebase Update Error: ", error);
      setIsUpdating(false);
    }
  };

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

  const handleRemoveItem = (product) => {
    setShowAlert(true);
    setModalProduct(product);
  };

  const handleModalConfirm = () => {
    const db = getDatabase();
    const itemRef = ref(db, `items/${modalProduct.id}`);
    set(itemRef, null);
    setShowAlert(false);
    setModalProduct(null);
  };

  const handleModalCancel = () => {
    setShowAlert(false);
    setModalProduct(null);
  };

  return (
    <div className="p-2">
      {isLoading ? (
        <LoadingSpinner />
      ) : products && products.length > 0 ? (
        products.map((product) => (
          <div
            key={product.id}
            className="border-l-4 border-green-500 p-2 mb-4 flex flex-col"
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
      ) : (
        <div className="p-4 mb-6 text-center text-red-600">
          <p>You have no products currently listed.</p>
        </div>
      )}
      <Alert
        isOpen={showAlert}
        title="Confirm Deletion"
        message="Are you sure you want to delete this item?"
        onConfirm={handleModalConfirm}
        onCancel={handleModalCancel}
      ></Alert>
      <Modal isOpen={updating} onClose={null}>
        <LoadingSpinner />
      </Modal>
    </div>
  );
}

export default EditProducts;
