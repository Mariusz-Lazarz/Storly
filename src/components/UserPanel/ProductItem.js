function ProductItem({ product, handleEditClick, handleRemoveItem }) {
  return (
    <div className="flex justify-between items-center">
      <img
        src={product.imageLink}
        alt={product.title}
        className="w-16 h-16 object-cover"
      />
      <div className="flex-1 ml-4 flex items-center justify-between">
        <span className="text-lg">{product.title}</span>
        <span className="hidden lg:block text-sm">{product.description}</span>
        <span className="hidden lg:block text-sm">{product.category}</span>
        <span className="hidden lg:block text-sm">{product.brand}</span>
        <span className="hidden lg:block text-sm">{product.variant}</span>
        <span className="hidden lg:block text-sm">
          Quantity: {product.quantity}
        </span>

        <span className="hidden lg:block text-sm">${product.price}</span>
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
          onClick={() => handleRemoveItem(product)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
