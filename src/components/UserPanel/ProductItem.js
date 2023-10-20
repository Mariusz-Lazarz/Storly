import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function ProductItem({ product, handleEditClick, handleRemoveItem }) {
  return (
    <div className="grid grid-cols-4 md:grid-cols-7 items-center dark:text-white">
      <div className="col-span-1">
        <img
          src={product.imageLinks[0]}
          alt={product.title}
          className="w-16 h-16 object-cover"
        />
      </div>
      <div className="col-span-1">
        <span className="block text-md">{product.title}</span>
      </div>
      <div className="hidden md:col-span-1 md:block text-sm">
        {product.category}
      </div>
      <div className="hidden md:col-span-1 md:block text-sm">
        {product.brand}
      </div>
      <div className="hidden md:col-span-1 md:block text-sm">
        {product.variant}
      </div>
      <div className="col-span-1">
        <span className="block text-sm">${product.price}</span>
      </div>
      <div className="col-span-1 flex gap-2 justify-center items-center">
        <button
          className="px-2 py-1 bg-blue-500 text-white rounded-lg"
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
