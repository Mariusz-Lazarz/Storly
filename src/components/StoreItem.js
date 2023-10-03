function StoreItem({
  item,
  selectedQuantities,
  handleQuantityChange,
  handleAddToCart,
  itemsInCart,
}) {
  const isInCart = itemsInCart.includes(item.id);

  return (
    <div className="bg-white p-2 rounded shadow-lg border">
      <div className="h-24 flex items-center justify-center mb-4">
        <img
          src={item.imageLink}
          alt={item.title}
          className="object-cover rounded max-w-fit h-24"
        />
      </div>
      <h3 className="font-semibold mb-2 text-base">
        {item.title} <span className="text-green-600">${item.price}</span>
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
            disabled={isInCart} // Disable quantity input if item is in the cart
          />
        </div>
        <button
          className={`bg-light-pink text-white py-2 px-4 rounded-full ${
            isInCart ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handleAddToCart(item)}
          disabled={isInCart} // Disable button if item is in the cart
        >
          {isInCart ? "In Cart" : "Add"}
        </button>
      </div>
    </div>
  );
}

export default StoreItem;
