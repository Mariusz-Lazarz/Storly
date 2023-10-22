import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";

export const useItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const db = getDatabase();
    const itemsRef = ref(db, "items");

    const handleData = (snapshot) => {
      const data = snapshot.val();
      const itemsArray = data
        ? Object.entries(data).map(([id, value]) => ({ id, ...value }))
        : [];
      setItems(itemsArray);
      setIsLoading(false);
    };

    onValue(itemsRef, handleData);
    return () => off(itemsRef, "value", handleData);
  }, []);

  return { items, isLoading };
};
