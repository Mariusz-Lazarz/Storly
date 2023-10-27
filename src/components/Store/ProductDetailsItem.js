import { useState } from "react";
import ProductDetailsSlider from "./ProductDetailsSlider";
import StarRating from "./StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faHeart,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import RecommendedItem from "./RecommendedItem";

const ProductDetailsItem = ({
  item,
  averageRating,
  totalReviews,
  isInCart,
  handleAddToCart,
  handleFavouriteItem,
  isFavourite,
  categoryItems,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    if (quantity === 1) return;
    setQuantity((prevState) => prevState - 1);
  };

  const handleIncrement = () => {
    if (quantity === item.quantity) return;
    setQuantity((prevState) => prevState + 1);
  };

  return (
    <div className="flex flex-col md:gap-4">
      <div className="flex flex-col md:flex-row md:gap-4 w-full shadow-lg">
        <div className="w-full md:w-1/2">
          <ProductDetailsSlider item={item} />
        </div>
        <div className="w-full md:w-1/2 p-4 flex flex-col">
          <h1 className="text-2xl text-pink-500 font-bold mb-2">
            {item.title}
          </h1>
          <div className="flex flex-col-reverse items-start lg:flex-row lg:justify-between mb-2">
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
            <div className="flex items-center">
              <span className="text-sm mr-2">{averageRating.toFixed(2)}</span>
              <StarRating averageRating={averageRating} />
              <span className="ml-2 text-sm">
                ({totalReviews} {totalReviews === 1 ? "Review" : "Reviews"})
              </span>
            </div>
          </div>
          <hr className="mb-4" />
          <h2 className="text-lg text-pink-500 font-semibold mb-2">
            Description
          </h2>
          <p className="mb-4">{item.description}</p>

          <hr className="mb-4" />

          <div className="mb-4">
            <h2 className="text-lg text-pink-500 font-semibold mb-2">
              Details
            </h2>
            <div className="flex justify-between">
              <p className="mb-2">
                <span className="font-medium">Category:</span>{" "}
                {item.category || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-medium">Variant:</span>{" "}
                {item.variant || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-medium">Brand:</span>{" "}
                {item.brand || "N/A"}
              </p>
            </div>
          </div>

          <div className="mb-4 flex justify-between items-center">
            <div className="flex gap-2">
              <button
                className={`py-2 px-3 rounded text-white ${
                  isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-light-pink "
                }`}
                onClick={() => handleAddToCart(item, quantity)}
                disabled={isInCart}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={isInCart ? "Item already in cart" : null}
              >
                <span className="hidden xl:inline">Add to cart</span>
                <FontAwesomeIcon icon={faCartShopping} className="xl:hidden" />
              </button>
              <Tooltip
                id="my-tooltip"
                style={{
                  backgroundColor: "rgb(2,0,36)",
                  color: "white",
                  zIndex: "999",
                }}
              />
              <button
                className={`border py-2 px-3 rounded border-gray-500 ${
                  isFavourite ? "bg-yellow-400 dark:bg-yellow-700" : ""
                }`}
                onClick={handleFavouriteItem}
              >
                <FontAwesomeIcon icon={faHeart} />
                <span className="hidden xl:inline"> Add to faviourite</span>
              </button>
            </div>
            <div className="flex gap-2 bg-gray-100 py-1 px-4 dark:bg-dark-secondary">
              <button
                className="text-orange-500 dark:text-red-500"
                onClick={handleIncrement}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <span>{quantity}</span>
              <button className="text-orange-500" onClick={handleDecrement}>
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
          <hr className="mt-8 mb-8" />
          {categoryItems.length > 0 && (
            <h1 className="text-3xl">You might like these products</h1>
          )}
        </div>
      </div>

      <div className="flex flex-row w-full">
        <div className="hidden md:block md:w-1/2"></div>{" "}
        <div className="w-full md:w-1/2 p-4 flex flex-col">
          <div className="flex flex-row">
            {categoryItems.length > 0 &&
              categoryItems.map((item) => (
                <RecommendedItem key={item.id} item={item} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsItem;
