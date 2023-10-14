import { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  onValue,
  off,
  get,
  child,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
import { getAuth } from "firebase/auth";
import LoadingSpinner from "../../utils/LoadingSpinner";
import ReviewStars from "./ReviewStars";
import { Link } from "react-router-dom";

const Reviews = () => {
  const [uniqueItems, setUniqueItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItemDetails = async (itemIds) => {
    const db = getDatabase();
    const itemsRef = ref(db, "items");
    const itemDetailsPromises = itemIds.map((itemId) => {
      return get(child(itemsRef, itemId));
    });
    const itemDetailsSnapshots = await Promise.all(itemDetailsPromises);
    const itemDetails = itemDetailsSnapshots.map((snapshot, index) => {
      return { id: itemIds[index], ...snapshot.val() };
    });
    return itemDetails;
  };

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    const user = auth.currentUser;

    if (user) {
      const ordersRef = ref(db, "orders");
      const userOrdersQuery = query(
        ordersRef,
        orderByChild("userId"),
        equalTo(user.uid)
      );

      const handleData = async (snapshot) => {
        const data = snapshot.val();
        const allItemIds = [];
        for (let key in data) {
          const orderItems = data[key].items;
          orderItems.forEach((item) => {
            allItemIds.push(item.item_id);
          });
        }
        const uniqueItemIds = [...new Set(allItemIds)];
        const uniqueItems = await fetchItemDetails(uniqueItemIds);
        setUniqueItems(uniqueItems);
        setIsLoading(false);
      };

      onValue(userOrdersQuery, handleData);
      return () => {
        off(userOrdersQuery, "value", handleData);
      };
    }
  }, []);

  return (
    <div className="p-2 overflow-y-scroll h-screen">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
          {uniqueItems && uniqueItems.length > 0 ? (
            uniqueItems.map((item, index) => (
              <div key={index} className="border p-4 shadow-lg">
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.imageLink}
                    alt={item.title}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h2 className="text-xl font-bold">{item.title}</h2>
                </Link>
                <ReviewStars itemId={item.id} />
              </div>
            ))
          ) : (
            <div className="p-4 mb-6 text-center text-red-600 col-span-full">
              <p>You have no products currently to review.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Reviews;
