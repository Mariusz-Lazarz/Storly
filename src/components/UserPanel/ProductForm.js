function ProductForm({
  handleFormSubmit,
  handleInputChange,
  handleCloseClick,
  editFormData,
}) {
  return (
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
        <span className="text-gray-700">Category</span>
        <input
          type="text"
          name="category"
          value={editFormData.category}
          onChange={handleInputChange}
          className="border p-2 w-full mt-1"
          placeholder="Category"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Brand</span>
        <input
          type="text"
          name="brand"
          value={editFormData.brand}
          onChange={handleInputChange}
          className="border p-2 w-full mt-1"
          placeholder="Brand"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Variant</span>
        <input
          type="text"
          name="variant"
          value={editFormData.variant}
          onChange={handleInputChange}
          className="border p-2 w-full mt-1"
          placeholder="Variant"
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
      <button
        className="px-4 py-2 bg-red-500 text-white rounded-lg ml-2"
        onClick={handleCloseClick}
      >
        Cancel
      </button>
    </form>
  );
}

export default ProductForm;
