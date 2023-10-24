import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import {
  getDatabase,
  ref,
  get,
  set,
  update,
  query,
  orderByChild,
  equalTo,
  onValue,
  off,
  limitToFirst,
} from "firebase/database";
import LoadingSpinner from "../../utils/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import ProductDetailsItem from "./ProductDetailsItem";
import useProductDetailView from "./useProductDetailView";

const ProductDetails = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [item, setItem] = useState(null);
  const [categoryItems, setCategoryItems] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [isFavourite, setIsFavourite] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const { auth } = useAuth();

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

  const handleAddToCart = (item, quantity) => {
    if (auth) {
      dispatch(addToCart({ item, quantity: Number(quantity) }));
    }
  };

  useProductDetailView(item);

  const handleFavouriteItem = () => {
    setIsFavourite((prevState) => {
      const newFavouriteState = !prevState;

      const addOrUpdateFav = async () => {
        try {
          const db = getDatabase();
          const itemRef = ref(db, `userFavourites/${auth.uid}/${id}/`);
          const snapshot = await get(itemRef);

          if (snapshot.exists()) {
            await update(itemRef, {
              isFavourite: newFavouriteState,
            });
          } else {
            await set(itemRef, {
              isFavourite: newFavouriteState,
            });
          }
        } catch (error) {
          console.log(error);
        }
      };

      addOrUpdateFav();
      return newFavouriteState;
    });
  };

  useEffect(() => {
    const checkIfFavourite = async () => {
      try {
        if (auth) {
          const db = getDatabase();
          const favRef = ref(db, `userFavourites/${auth.uid}/${id}`);
          const snapshot = await get(favRef);
          if (snapshot.exists() && snapshot.val().isFavourite) {
            setIsFavourite(true);
          } else {
            setIsFavourite(false);
          }
        }
      } catch (error) {
        console.log("Error checking favourite status:", error);
      }
    };

    checkIfFavourite();
  }, [id, auth]);

  useEffect(() => {
    if (item) {
      try {
        const db = getDatabase();
        const itemsRef = ref(db, "items");
        const userQuery = query(
          itemsRef,
          orderByChild("category"),
          equalTo(item.category),
          limitToFirst(4)
        );

        const handleData = (snapshot) => {
          const data = snapshot.val();
          const itemsArray = Object.entries(data).map(([key, value]) => ({
            ...value,
            id: key,
          }));
          setCategoryItems(itemsArray.filter((item) => id !== item.id));
        };

        onValue(userQuery, handleData);

        return () => {
          off(userQuery, "value", handleData);
        };
      } catch (error) {
        console.log(error);
      }
    }
  });

  return (
    <div className="container mx-auto p-4 dark:text-white">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <ProductDetailsItem
          item={item}
          averageRating={averageRating}
          totalReviews={totalReviews}
          isInCart={isInCart}
          handleAddToCart={handleAddToCart}
          handleFavouriteItem={handleFavouriteItem}
          isFavourite={isFavourite}
          categoryItems={categoryItems}
        />
      )}
    </div>
  );
};

export default ProductDetails;
