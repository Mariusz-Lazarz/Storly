import { useState, useEffect } from "react";
import { getDatabase, ref, onValue, off, get, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import LoadingSpinner from "../../utils/LoadingSpinner";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

const Favourites = () => {
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const userFavouritesRef = ref(db, `userFavourites/${user.uid}`);

      const handleData = async (snapshot) => {
        const favsData = snapshot.val();
        const fetchedItems = [];
        for (let itemId in favsData) {
          if (favsData[itemId].isFavourite) {
            const itemRef = ref(db, `items/${itemId}`);
            const itemSnapshot = await get(itemRef);
            fetchedItems.push({ id: itemId, ...itemSnapshot.val() });
          }
        }
        setFavouriteItems(fetchedItems);
        setIsLoading(false);
      };

      onValue(userFavouritesRef, handleData);

      return () => off(userFavouritesRef, "value", handleData);
    }
  }, [user]);

  const removeFromFavourites = async (itemId) => {
    if (user) {
      try {
        const db = getDatabase();
        const itemRef = ref(db, `userFavourites/${user.uid}/${itemId}`);
        await set(itemRef, null);
      } catch (error) {
        console.error("Failed to remove item:", error);
      }
    }
  };

  return (
    <div className="p-2 overflow-y-scroll h-screen">
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
          {favouriteItems && favouriteItems.length > 0 ? (
            favouriteItems.map((item) => (
              <div key={item.id} className="border p-4 shadow-lg relative">
                <FontAwesomeIcon
                  icon={faHeart}
                  className="text-red-400 bg-white p-2 rounded-full cursor-pointer absolute top-2 right-2"
                  onClick={() => removeFromFavourites(item.id)}
                  size="2xl"
                />
                <Link to={`/product/${item.id}`}>
                  <img
                    src={item.imageLinks}
                    alt={item.title}
                    className="w-full h-48 object-contain mb-4"
                  />
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-red-500">${item.price}</p>
                </Link>
              </div>
            ))
          ) : (
            <div className="p-4 mb-6 text-center text-red-600 col-span-full">
              <p>You have no favourite items.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Favourites;
