import { useState } from "react";

const useAlert = () => {
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const showAlert = (title, message) => {
    setAlert({ isOpen: true, title, message });
  };

  const hideAlert = () => {
    setAlert({ ...alert, isOpen: false });
  };
  return { alert, showAlert, hideAlert };
};

export default useAlert;
