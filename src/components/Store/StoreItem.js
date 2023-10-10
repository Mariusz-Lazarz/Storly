import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";

const StoreItem = ({
  item,
  selectedQuantities,
  handleQuantityChange,
  handleAddToCart,
  itemsInCart,
}) => {
  const isInCart = itemsInCart.includes(item.id);

  const handleOnChange = (e) => {
    let newValue = parseInt(e.target.value, 10);
    if (isNaN(newValue)) {
      newValue = 1;
    } else if (newValue < 1) {
      newValue = 1;
    } else if (newValue > item.quantity) {
      newValue = item.quantity;
    }

    handleQuantityChange(item.id, newValue);
  };

  return (
    <div className="p-2 relative text-center">
      <Link to={`/product/${item.id}`} state={item}>
        <div className="flex items-center justify-center mb-2 h-24 w-24 mx-auto cursor-pointer">
          <img
            src={item.imageLink}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="font-semibold">{item.title}</h3>
        <span className="text-orange-600">${item.price}</span>
      </Link>
      <div className="flex items-center m-1">
        <div className="flex-grow">
          <input
            type="number"
            id={`quantity-${item.id}`}
            name={`quantity-${item.id}`}
            min="1"
            max={item.quantity}
            value={selectedQuantities[item.id] || 1}
            onChange={handleOnChange}
            className="mt-1 block w-12 rounded-md border-gray-30 focus:ring-opacity-50 bg-transparent focus:outline-none"
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
      <div className="flex justify-center"></div>
    </div>
  );
};

export default StoreItem;
