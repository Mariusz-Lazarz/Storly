import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function ProductItem({ product, handleEditClick, handleRemoveItem }) {
  return (
    <div className="flex justify-between items-center">
      <img
        src={product.imageLink}
        alt={product.title}
        className="w-16 h-16 object-cover"
      />
      <div className="flex-1 ml-4 flex items-center justify-between">
        <span className="text-md">{product.title}</span>
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
          className="px-2 py-1 ml-4 bg-blue-500 text-white rounded-lg"
          onClick={() => handleEditClick(product)}
        >
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button
          className="px-2 py-1 bg-red-500 text-white rounded-lg"
          onClick={() => handleRemoveItem(product)}
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}

export default ProductItem;
