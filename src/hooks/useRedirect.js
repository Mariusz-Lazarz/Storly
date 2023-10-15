import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const useRedirect = (auth, loading) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !auth) {
      navigate("/");
    }
  }, [navigate, auth, loading]);
};

export default useRedirect;
