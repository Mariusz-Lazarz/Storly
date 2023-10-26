/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import LoadingSpinner from "../../utils/LoadingSpinner";
import Modal from "../Modal/Modal";
import Alert from "../Modal/Alert";

function ProductForm({
  handleFormSubmit,
  handleInputChange,
  handleCloseClick,
  editFormData,
}) {
  const [allImages, setAllImages] = useState(editFormData.imageLinks || []);
  const [removedImages, setRemovedImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
  });

  useEffect(() => {
    setAllImages(allImages.filter((url) => !removedImages.includes(url)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removedImages]);

  const handleRemoveImage = (url, isExisting) => {
    if (isExisting && allImages.length - removedImages.length > 1) {
      setRemovedImages([...removedImages, url]);
    } else {
      setAllImages((prev) => prev.filter((img) => img !== url));
    }
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const maxFiles = 10;
    const maxSize = 5 * 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png"];

    if (allImages.length + files.length > maxFiles) {
      setAlert({
        isOpen: true,
        title: "Upload Error",
        message: "You cannot upload more than 10 images.",
      });
      return;
    }

    for (const file of files) {
      if (allowedTypes.includes(file.type) && file.size <= maxSize) {
        setIsLoading(true);
        const uniqueFileName = `${uuidv4()}-${file.name}`;
        const storage = getStorage();
        const imageRef = storageRef(storage, `images/${uniqueFileName}`);

        await uploadBytes(imageRef, file);
        const newImageUrl = await getDownloadURL(imageRef);

        setAllImages((prev) => [...prev, newImageUrl]);
        setIsLoading(false);
      } else {
        setAlert({
          isOpen: true,
          title: "Upload Error",
          message:
            "Invalid file(s) skipped (must be jpg/png and less than 5MB).",
        });
      }
    }
  };

  const extractFilePath = (url) => {
    try {
      const decodedUrl = decodeURIComponent(url);
      const match = decodedUrl.match(/o\/(.+?)\?/);
      return match ? match[1] : null;
    } catch (error) {
      console.error("Failed to extract file path from URL:", error);
      return null;
    }
  };

  const deleteUnusedImages = async (removedImages) => {
    const storage = getStorage();
    for (const imageUrl of removedImages) {
      const filePath = extractFilePath(imageUrl);

      if (!filePath) {
        console.error(`Failed to extract file path for ${imageUrl}`);
        continue;
      }

      try {
        await deleteObject(storageRef(storage, filePath));
      } catch (error) {}
    }
  };

  const handleEnhancedFormSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      ...editFormData,
      imageLinks: allImages,
    };

    try {
      await handleFormSubmit(e, updatedFormData, removedImages);
      await deleteUnusedImages(removedImages);
      setRemovedImages([]);
    } catch (error) {
      console.error("Failed to update data or delete images:", error);
      setAlert({
        isOpen: true,
        title: "Error",
        message: "Failed to update data or delete images. Please try again.",
      });
    }
  };

  return (
    <form
      onSubmit={handleEnhancedFormSubmit}
      className="space-y-4 dark:text-white"
    >
      <label className="block">
        <span className="text-gray-700 dark:text-white">Title</span>
        <input
          type="text"
          name="title"
          value={editFormData.title}
          onChange={handleInputChange}
          className="border p-2 w-full mt-1 dark:bg-dark-secondary  dark:border-gray-700"
          placeholder="Title"
        />
      </label>
      <label className="block">
        <span className="text-gray-700 dark:text-white">Description</span>
        <input
          type="text"
          name="description"
          value={editFormData.description}
          onChange={handleInputChange}
          className="border p-2 w-full mt-1 dark:bg-dark-secondary  dark:border-gray-700"
          placeholder="Description"
        />
      </label>
      <label className="block">
        <span className="text-gray-700 dark:text-white">Category</span>
        <input
          type="text"
          name="category"
          value={editFormData.category}
          onChange={handleInputChange}
          className="border p-2 w-full mt-1 dark:bg-dark-secondary  dark:border-gray-700"
          placeholder="Category"
        />
      </label>
      <label className="block">
        <span className="text-gray-700 dark:text-white">Brand</span>
        <input
          type="text"
          name="brand"
          value={editFormData.brand}
          onChange={handleInputChange}
          className="border p-2 w-full mt-1 dark:bg-dark-secondary  dark:border-gray-700"
          placeholder="Brand"
        />
      </label>
      <label className="block">
        <span className="text-gray-700 dark:text-white">Variant</span>
        <input
          type="text"
          name="variant"
          value={editFormData.variant}
          onChange={handleInputChange}
          className="border p-2 w-full mt-1 dark:bg-dark-secondary  dark:border-gray-700"
          placeholder="Variant"
        />
      </label>
      <label className="block">
        <span className="text-gray-700 dark:text-white">Quantity</span>
        <input
          type="number"
          name="quantity"
          value={editFormData.quantity}
          onChange={handleInputChange}
          className="border p-2 w-full mt-1 dark:bg-dark-secondary  dark:border-gray-700"
          placeholder="Quantity"
        />
      </label>
      <label className="block">
        <span className="text-gray-700 dark:text-white">Price</span>
        <input
          type="number"
          name="price"
          value={editFormData.price}
          onChange={handleInputChange}
          className="border p-2 w-full mt-1 dark:bg-dark-secondary  dark:border-gray-700"
          placeholder="Price"
          step="0.01"
        />
      </label>
      <label className="block">
        <span className="text-gray-700 dark:text-white">Discounted price</span>
        <input
          type="number"
          name="discount"
          value={editFormData.discount}
          onChange={handleInputChange}
          className="border p-2 w-full mt-1 dark:bg-dark-secondary  dark:border-gray-700"
          placeholder="Discounted Price"
          step="0.01"
        />
      </label>
      <label className="block mt-4">
        <span className="text-gray-700 dark:text-white">Add More Images</span>
        <input
          type="file"
          onChange={handleImageChange}
          multiple
          accept="image/*"
          className="border p-2 w-full mt-1 dark:bg-dark-secondary  dark:border-gray-700"
        />
      </label>
      <div className="flex space-x-2 mt-2">
        {allImages.map((url, index) => (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <div key={index} className="relative inline-block mr-2">
            <img
              src={url}
              alt={`Image ${index}`}
              className="w-24 h-24 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() =>
                handleRemoveImage(url, editFormData.imageLinks.includes(url))
              }
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center"
              style={{ transform: "translate(50%, -50%)" }}
            >
              <span className="text-xs leading-none">&#x2715;</span>
            </button>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Submit
      </button>
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2"
        onClick={handleCloseClick}
      >
        Cancel
      </button>
      <Alert
        isOpen={alert.isOpen}
        title={alert.title}
        message={alert.message}
        onConfirm={() => setAlert({ ...alert, isOpen: false })}
      />
      <Modal isOpen={isLoading} onClose={null}>
        <LoadingSpinner />
      </Modal>
    </form>
  );
}

export default ProductForm;
