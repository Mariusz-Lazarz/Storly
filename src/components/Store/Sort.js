import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort } from "@fortawesome/free-solid-svg-icons";

const Sort = () => {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const toggleSortMenu = (e) => {
    e.stopPropagation();
    setIsSortMenuOpen((prevState) => !prevState);
  };

  const handleSortSelection = (option) => {
    console.log("Sorting by:", option);
    setIsSortMenuOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (isSortMenuOpen && !event.target.closest(".sort-menu")) {
        setIsSortMenuOpen(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, [isSortMenuOpen]);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleSortMenu}
        className="rounded-md p-2 inline-flex items-center justify-center  hover:text-gray-600"
      >
        <FontAwesomeIcon icon={faSort} size="lg" />
      </button>
      {isSortMenuOpen && (
        <div className="sort-menu z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 dark:bg-dark-secondary">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <button
              onClick={() => handleSortSelection("Max Price")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-tertiary w-full text-left"
              role="menuitem"
            >
              Max Price
            </button>
            <button
              onClick={() => handleSortSelection("Low Price")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-tertiary w-full text-left"
              role="menuitem"
            >
              Low Price
            </button>
            <button
              onClick={() => handleSortSelection("A-Z")}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-dark-tertiary w-full text-left"
              role="menuitem"
            >
              A-Z
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sort;
