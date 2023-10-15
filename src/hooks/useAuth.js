import { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [auth, setAuth] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuth(user);
      } else {
        setAuth(null);
      }
    });
    return () => unsubscribe();
  }, []);
  return auth;
};

export default useAuth;
