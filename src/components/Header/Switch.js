import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import { toggleDarkMode, selectDarkMode } from "../../store/darkModeSlice";
import "tailwindcss/tailwind.css";

const Switch = () => {
  const dispatch = useDispatch();
  const darkMode = useSelector(selectDarkMode);

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div className="relative w-12 h-6 bg-gray-200 rounded-full">
      <button
        onClick={handleToggle}
        className={`${
          darkMode ? "translate-x-full" : ""
        } transition-transform transform absolute left-0 w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center`}
      >
        <FontAwesomeIcon
          icon={darkMode ? faMoon : faSun}
          className={`transition-transform transform ${
            darkMode ? "text-gray-800" : "text-yellow-500"
          } text-xs`}
        />
      </button>
    </div>
  );
};

export default Switch;
