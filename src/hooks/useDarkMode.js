import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "../store/darkModeSlice";

const useDarkMode = () => {
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [darkMode]);

  return darkMode;
};

export default useDarkMode;
