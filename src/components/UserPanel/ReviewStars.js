import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  set,
  get,
  push,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const ReviewStars = ({ itemId }) => {
  const [selectedStar, setSelectedStar] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isReviewed, setIsReviewed] = useState(false);

  useEffect(() => {
    const fetchRating = async () => {
      const auth = getAuth();
      const user = auth.currentUser;
      if (user) {
        const db = getDatabase();
        const reviewsRef = ref(db, "reviews");
        const userItemReviewsQuery = query(
          reviewsRef,
          orderByChild("userItemKey"),
          equalTo(`${user.uid}_${itemId}`)
        );
        const snapshot = await get(userItemReviewsQuery);
        if (snapshot.exists()) {
          const reviewData = Object.values(snapshot.val())[0];
          setSelectedStar(reviewData.rating);
          setIsReviewed(true);
        }
      }
    };
    fetchRating();
  }, [itemId]);

  const handleClick = async (star) => {
    if (isReviewed) {
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getDatabase();
      const reviewsRef = ref(db, "reviews");
      const newReviewRef = push(reviewsRef);
      const reviewData = {
        userId: user.uid,
        itemId: itemId,
        userItemKey: `${user.uid}_${itemId}`,
        rating: star,
        date: new Date().toISOString(),
      };
      await set(newReviewRef, reviewData);

      const reviewId = newReviewRef.key;
      const itemReviewRef = ref(db, `items/${itemId}/reviews/${reviewId}`);
      await set(itemReviewRef, {
        rating: star,
        date: new Date().toISOString(),
      });

      setSelectedStar(star);
      setIsReviewed(true);
    }
  };

  return (
    <div className="space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-3xl cursor-pointer ${
            star <= (hoveredStar || selectedStar) ? "text-yellow-500" : ""
          } ${isReviewed ? "cursor-not-allowed opacity-50" : ""}`}
          onMouseEnter={() => !isReviewed && setHoveredStar(star)}
          onMouseLeave={() => !isReviewed && setHoveredStar(0)}
          onClick={() => handleClick(star)}
        >
          ☆
        </span>
      ))}
    </div>
  );
};

export default ReviewStars;
