import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import { useState } from "react";

const StoreItem = ({ item, handleAddToCart, itemsInCart }) => {
  const [quantity, setQuantity] = useState(1);
  const isInCart = itemsInCart.includes(item.id);

  const handleDecrement = () => {
    if (quantity === 1) return;
    setQuantity((prevState) => prevState - 1);
  };

  const handleIncrement = (item) => {
    if (quantity === item.quantity) return;
    setQuantity((prevState) => prevState + 1);
  };

  return (
    <div className="p-2 relative text-center transform transition-transform duration-500 hover:scale-105">
      <Link to={`/product/${item.id}`}>
        <div className="flex items-center justify-center mb-2 h-24 w-24 mx-auto cursor-pointer">
          <img
            src={item.imageLinks[0]}
            alt={item.title}
            className="object-cover w-full h-full"
          />
        </div>
        <h3 className="font-semibold">{item.title}</h3>
        <span className="text-orange-600">${item.price}</span>
      </Link>
      <div className="flex items-center justify-between m-1">
        <div>
          <span>{quantity}</span>
          <button
            className="bg-blue-300 text-white rounded py-.5 px-1 mx-2"
            onClick={() => handleIncrement(item)}
          >
            <FontAwesomeIcon icon={faPlus} size="xs" />
          </button>
          <button className="bg-light-pink text-white rounded py-.5 px-1">
            <FontAwesomeIcon
              icon={faMinus}
              size="xs"
              onClick={handleDecrement}
            />
          </button>
        </div>
        <button
          className={`py-1 px-2 rounded ${
            isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-light-pink"
          }`}
          onClick={() => handleAddToCart(item, quantity)}
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
