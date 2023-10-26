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

  console.log(Number(item.discount));
  console.log(Number(item.price));

  return (
    <div className="p-2 relative text-center transform transition-transform duration-500 hover:scale-105 dark:text-white">
      <Link to={`/product/${item.id}`}>
        <div className="flex items-center justify-center mb-2 h-36 w-36 mx-auto cursor-pointer">
          <img
            src={item.imageLinks[0]}
            alt={item.title}
            className="object-fit w-full h-full"
            loading="lazy"
          />
        </div>
        <h3 className="font-semibold truncate w-full max-w-[95%]">
          {item.title}
        </h3>
        <div className="flex justify-center gap-2">
          <span
            className={`text-orange-600 ${
              Number(item.discount) > 0 ? "line-through" : ""
            }`}
          >
            ${item.price}
          </span>
          {Number(item.discount) > 0 && (
            <span className="text-red-500">${item.discount}</span>
          )}
        </div>
      </Link>
      <div className="flex items-center justify-center gap-2 m-1 ">
        <div className="flex gap-2 bg-gray-200 py-1 px-2  rounded dark:bg-dark-secondary">
          <button
            className="text-orange-500"
            onClick={() => handleIncrement(item)}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <span>{quantity}</span>
          <button className="text-orange-500" onClick={handleDecrement}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
        </div>
        <button
          className={`py-1 px-2 rounded ${
            isInCart
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-light-pink dark:bg-dark-secondary"
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
