import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Tooltip, TooltipProvider } from "react-tooltip";

const StoreItem = ({
  item,
  selectedQuantities,
  handleQuantityChange,
  handleAddToCart,
  itemsInCart,
}) => {
  const isInCart = itemsInCart.includes(item.id);

  return (
    <TooltipProvider>
      <div className="bg-white p-2 rounded shadow-lg border relative">
        <div className="h-24 flex items-center justify-center mb-4">
          <img
            src={item.imageLink}
            alt={item.title}
            className="object-cover rounded max-w-fit h-24"
          />
        </div>
        <h3 className="font-semibold mb-2 text-base">
          {item.title} <span className="text-orange-600">${item.price}</span>
        </h3>
        <div className="flex items-center gap-4 mb-1">
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
              disabled={isInCart}
            />
          </div>
          <button
            className={`py-1 px-2 rounded ${
              isInCart ? "bg-gray-300 cursor-not-allowed" : "bg-light-pink"
            }`}
            onClick={() => handleAddToCart(item)}
            disabled={isInCart}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={isInCart ? "Item already in cart" : null}
          >
            <FontAwesomeIcon
              icon={faShoppingCart}
              className={`text-white ${isInCart ? "text-gray-500" : ""}`}
            />
          </button>
          <Tooltip
            id="my-tooltip"
            style={{
              backgroundColor: "rgb(2,0,36)",
              color: "white",
              zIndex: "999",
            }}
          />
        </div>
        <div className="flex justify-center">
          <Link to={`/product/${item.id}`} state={item}>
            <p className="text-blue-500">More details</p>
          </Link>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default StoreItem;
