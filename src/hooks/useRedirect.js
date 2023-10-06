import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

const useRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    if (!auth.currentUser) {
      navigate("/");
    }
  }, [navigate]);
};

export default useRedirect;
