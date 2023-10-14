import React, { useState, useEffect, useRef } from "react";
import { getDatabase, ref as dbRef, set, push } from "firebase/database";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref as strgRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import Modal from "../Modal/Modal";
import LoadingSpinner from "../../utils/LoadingSpinner";

function AddItemForm() {
  const [title, setTitle] = useState("");
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState("");
  const [variant, setVariant] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [auth, setAuth] = useState(null);
  const fileInputRef = useRef();

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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileSizeLimit = 5 * 1024 * 1024; // 5 MB in bytes
      const allowedFileTypes = ["image/jpeg", "image/png"];

      if (!allowedFileTypes.includes(file.type)) {
        setError("Please upload an image file (jpg or png).");
        return;
      }

      if (file.size > fileSizeLimit) {
        setError("File size should be less than 5MB.");
        return;
      }

      setError(null);
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreviewUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const addItem = async (e) => {
    console.log("addItem called");
    e.preventDefault();
    console.log("imageFile value:", imageFile);
    if (!auth) {
      setError("Please login to add an item");
      return;
    }

    if (!imageFile) {
      setError("Please select an image file to upload");
      console.log("image not added");
      return;
    }

    setIsLoading(true);

    try {
      const storage = getStorage();
      const uniqueFileName = `${new Date().getTime()}-${imageFile.name}`;
      const storageRef = strgRef(storage, `images/${uniqueFileName}`);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          setError(error.message);
          console.log(error.message);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

          const db = getDatabase();
          const newItemRef = push(dbRef(db, "items"));
          await set(newItemRef, {
            title,
            imageLink: downloadURL,
            category,
            variant,
            brand,
            description,
            quantity: parseInt(quantity, 10),
            price: parseFloat(price).toFixed(2),
            userId: auth.uid,
          });

          console.log("Item added successfully");
          setTitle("");
          setImageFile(null);
          setImagePreviewUrl("");
          setDescription("");
          setQuantity("");
          setPrice("");
          setError(null);
          setIsLoading(false);
          navigate("/store");
        }
      );
    } catch (error) {
      setIsLoading(false);
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
        <ImageUpload
          onUpload={handleFileUpload}
          onRemove={removeImage}
          imagePreviewUrl={imagePreviewUrl}
          fileInputRef={fileInputRef}
        />
        <button type="submit" className="bg-light-pink text-white p-2 rounded">
          Add Item
        </button>
      </form>
      <Modal isOpen={isLoading} onClose={null}>
        <LoadingSpinner />
      </Modal>
    </div>
  );
}

export default AddItemForm;
