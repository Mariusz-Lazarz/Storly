import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getStorage,
  ref as strgRef,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { getDatabase, ref as dbRef, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ImageUpload from "./ImageUpload";
import Modal from "../Modal/Modal";
import LoadingSpinner from "../../utils/LoadingSpinner";

function AddItemForm() {
  const [title, setTitle] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);
  const [category, setCategory] = useState("");
  const [variant, setVariant] = useState("");
  const [brand, setBrand] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [auth, setAuth] = useState(null);
  const fileInputRef = useRef();
  const navigate = useNavigate();

  console.log(auth)

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
    const files = e.target.files;

    if (files.length + imageFiles.length > 10) {
      setError("You cannot upload more than 10 images.");
      return;
    }

    let newFiles = [];
    // eslint-disable-next-line no-unused-vars
    let newPreviews = [];

    const validateFile = (file) => {
      const fileSizeLimit = 5 * 1024 * 1024; // 5MB
      const allowedFileTypes = ["image/jpeg", "image/png"];

      return allowedFileTypes.includes(file.type) && file.size <= fileSizeLimit;
    };

    const promises = Array.from(files).map((file) => {
      if (!validateFile(file)) {
        setError("Please upload a valid image file (jpg or png, < 5MB).");
        // eslint-disable-next-line array-callback-return
        return;
      }

      newFiles.push(file);

      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(promises).then((newPreviews) => {
      setImagePreviewUrls((prev) => [...prev, ...newPreviews]);
      setImageFiles((prev) => [...prev, ...newFiles]);
    });
  };

  const removeImage = (index) => {
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setImagePreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const addItem = async (e) => {
    e.preventDefault();

    if (!auth) {
      setError("Please login to add an item");
      return;
    }

    if (imageFiles.length === 0) {
      setError("Please select at least one image file to upload");
      return;
    }

    setIsLoading(true);

    try {
      const storage = getStorage();
      const downloadUrls = await Promise.all(
        imageFiles.map((imageFile) => {
          const uniqueFileName = `${uuidv4()}-${imageFile.name}`;
          const storageRef = strgRef(storage, `images/${uniqueFileName}`);
          const uploadTask = uploadBytesResumable(storageRef, imageFile);

          return new Promise((resolve, reject) => {
            uploadTask.on(
              "state_changed",
              null,
              (error) => reject(error),
              async () => {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                resolve(downloadURL);
              }
            );
          });
        })
      );

      const db = getDatabase();
      const newItemRef = push(dbRef(db, "items"));
      await set(newItemRef, {
        title,
        imageLinks: downloadUrls,
        category,
        variant,
        brand,
        description,
        quantity: parseInt(quantity, 10),
        price: parseFloat(price).toFixed(2),
        userId: auth.uid,
      });

      setTitle("");
      setImageFiles([]);
      setImagePreviewUrls([]);
      setDescription("");
      setBrand("");
      setCategory("");
      setVariant("");
      setQuantity("");
      setPrice("");
      setError(null);
      setIsLoading(false);
      navigate("/store");
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
          imagePreviewUrls={imagePreviewUrls}
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
