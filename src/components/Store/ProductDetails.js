import { useParams } from "react-router-dom";
import { DataLayer } from "@piwikpro/react-piwik-pro";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { getAuth } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { Tooltip } from "react-tooltip";
import { getDatabase, ref, get } from "firebase/database";
import LoadingSpinner from "../../utils/LoadingSpinner";
import StarRating from "./StarRating";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../App.css";

const ProductDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState(null);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const { id } = useParams();
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    const fetchProductData = async () => {
      const db = getDatabase();
      const itemRef = ref(db, `/items/${id}`);
      try {
        const snapshot = await get(itemRef);
        if (snapshot.exists()) {
          setItem(snapshot.val());
        } else {
          console.error("No data available");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }

      const reviewsRef = ref(db, `/items/${id}/reviews`);
      const reviewsSnapshot = await get(reviewsRef);
      if (reviewsSnapshot.exists()) {
        const reviews = Object.values(reviewsSnapshot.val());

        const totalRating = reviews.reduce(
          (acc, review) => acc + review.rating,
          0
        );
        const avgRating = totalRating / reviews.length;
        setAverageRating(avgRating);
        setTotalReviews(reviews.length);
      }

      setIsLoading(false);
    };

    fetchProductData();
  }, [id]);

  const itemsInCart = useSelector((state) => state.cart.items);
  const itemIdsInCart = itemsInCart.map((item) => item.id);
  const isInCart = item ? itemIdsInCart.includes(item.id) : false;

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

  useEffect(() => {
    if (item) {
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
    }
  }, [item]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="container mx-auto p-4">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <Slider {...settings} className="w-full md:w-1/2">
              {item.imageLinks.map((imgLink, index) => (
                <div key={index} className="w-full h-64 md:h-96">
                  <img
                    src={imgLink}
                    alt={`${item.title} ${index}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="w-full md:w-1/2 p-4 flex flex-col">
            <h1 className="text-2xl text-pink-500 font-bold mb-2">
              {item.title}
            </h1>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xl text-red-300">${item.price}</p>
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
            <hr className="mb-4" />
            <div className="mb-4 flex justify-between items-center">
              <div>
                <button
                  className={`py-2 px-3 rounded-full text-white ${
                    isInCart
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-light-pink "
                  }`}
                  onClick={() => handleAddToCart(item)}
                  disabled={isInCart}
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content={
                    isInCart ? "Item already in cart" : null
                  }
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
      )}
    </div>
  );
};

export default ProductDetails;
