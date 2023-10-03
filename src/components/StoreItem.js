// Component to render each item
function StoreItem({
  item,
  selectedQuantities,
  handleQuantityChange,
  handleAddToCart,
}) {
  return (
    <div className="bg-white p-4 rounded shadow-lg">
      <img
        src={item.imageLink}
        alt={item.title}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">
        {item.title} <span className="text-gray-600">${item.price}</span>
      </h3>
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-grow">
          <label
            htmlFor={`quantity-${item.id}`}
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            type="number"
            id={`quantity-${item.id}`}
            name={`quantity-${item.id}`}
            min="1"
            max={item.quantity}
            value={selectedQuantities[item.id] || 1}
            onChange={(e) => {
              let newValue = parseInt(e.target.value, 10);
              if (isNaN(newValue)) {
                newValue = 1;
              } else if (newValue < 1) {
                newValue = 1;
              } else if (newValue > item.quantity) {
                newValue = item.quantity;
              }

              handleQuantityChange(item.id, newValue);
            }}
            className="mt-1 block w-12 rounded-md border-gray-300 shadow-sm focus:border-light-pink focus:ring focus:ring-light-pink focus:ring-opacity-50"
          />
        </div>
        <button
          className="bg-light-pink text-white py-2 px-4 rounded-full"
          onClick={() => handleAddToCart(item)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default StoreItem;
