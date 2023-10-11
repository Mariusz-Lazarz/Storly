import { useLocation } from "react-router-dom";
import { DataLayer } from "@piwikpro/react-piwik-pro";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { Tooltip } from "react-tooltip";

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const location = useLocation();
  const dispatch = useDispatch();
  const auth = getAuth();
  const item = location.state;

  const itemsInCart = useSelector((state) => state.cart.items);
  const itemIdsInCart = itemsInCart.map((item) => item.id);
  const isInCart = itemIdsInCart.includes(item.id);

  const handleDecrement = () => {
    if (quantity === 1) return;
    setQuantity((prevState) => prevState - 1);
  };

  const handleIncrement = () => {
    if (quantity === item.quantity) return;
    setQuantity((prevState) => prevState + 1);
  };

  const handleAddToCart = () => {
    const user = auth.currentUser;
    if (user) {
      dispatch(addToCart({ item, quantity: Number(quantity) }));
    }
  };

  DataLayer.push({
    event: "product_detail_view",
    ecommerce: {
      items: [
        {
          item_id: String(item.id),
          item_name: item.title,
          price: String(item.price),
          quantity: 1,
          item_brand: item.brand,
          item_category: item.category,
          item_variant: item.variant,
        },
      ],
    },
  });

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-wrap justify-center items-center">
        <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
          <img
            src={item.imageLink}
            alt={item.title}
            className="w-1/2 object-cover"
          />
        </div>

        <div className="w-full md:w-1/2 p-4 flex flex-col">
          <h1 className="text-2xl text-pink-500 font-bold mb-2">
            {item.title}
          </h1>
          <p className="text-xl text-red-300 mb-4">${item.price}</p>

          <hr className="mb-4" />
          <h2 className="text-lg text-pink-500 font-semibold mb-2">Description</h2>
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
          <hr className="mb-4" />
          <div className="mb-4 flex justify-between items-center">
            <div>
              <button
                className={`py-2 px-3 rounded-full text-white ${
                  isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-light-pink "
                }`}
                onClick={() => handleAddToCart(item)}
                disabled={isInCart}
                data-tooltip-id="my-tooltip"
                data-tooltip-content={isInCart ? "Item already in cart" : null}
              >
                Add to cart
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
            <div>
              <span>Quantity: {quantity}</span>
              <button
                className="bg-blue-500 text-white rounded-full py-.5 px-1 mx-2"
                onClick={handleIncrement}
              >
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button
                className="bg-red-500 text-white rounded-full py-.5 px-1"
                onClick={handleDecrement}
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
