import React, { useState } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import Modal from "../Modal/Modal";

const Filter = ({ isOpen, onClose, setFilters }) => {
  // const [categoryOpen, setCategoryOpen] = useState(false);
  // const [brandOpen, setBrandOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleFilter = () => {
    const newFilters = {
      categories: selectedCategories,
      brands: selectedBrands,
      priceRange: { min: minPrice, max: maxPrice },
    };
    setFilters(newFilters);
    onClose();
  };

  const handleClear = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice("");
    setFilters({});
    onClose();
  };

  const handleCheckboxChange = (setSelected, item) => {
    setSelected((prevState) => {
      if (prevState.includes(item)) {
        return prevState.filter((category) => category !== item);
      } else {
        return [...prevState, item];
      }
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-2 text-black dark:text-white">
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className=" text-3xl">
            &times;
          </button>
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span>Category</span>
            {/* <FontAwesomeIcon
              icon={categoryOpen ? faCaretUp : faCaretDown}
              onClick={() => setCategoryOpen(!categoryOpen)}
            /> */}
          </div>
          {/* {categoryOpen && ( */}
          <div className="flex flex-col">
            {[
              "Mobile",
              "Laptop",
              "Tablet",
              "Headset",
              "Earbuds",
              "Gaming Accessory",
              "Keyboard",
            ].map((item) => (
              <label key={item} className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-60"
                  checked={selectedCategories.includes(item)}
                  onChange={() =>
                    handleCheckboxChange(setSelectedCategories, item)
                  }
                />
                <span className="ml-2 text-gray-700 dark:text-white">
                  {item}
                </span>
              </label>
            ))}
          </div>
          {/* // )} */}
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span>Brand</span>
            {/* <FontAwesomeIcon
              icon={brandOpen ? faCaretUp : faCaretDown}
              onClick={() => setBrandOpen(!brandOpen)}
            /> */}
          </div>
          {/* {brandOpen && ( */}
          <div className="flex flex-col">
            {[
              "Samsung",
              "Apple",
              "Microsoft",
              "Razer",
              "Amazon",
              "Sony",
              "Logitech",
            ].map((item) => (
              <label key={item} className="inline-flex items-center mt-3">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-gray-600"
                  checked={selectedBrands.includes(item)}
                  onChange={() => handleCheckboxChange(setSelectedBrands, item)}
                />
                <span className="ml-2 text-gray-700 dark:text-white">
                  {item}
                </span>
              </label>
            ))}
          </div>
          {/* )} */}
        </div>
        <div className="mb-4">
          <div className="flex gap-4">
            <input
              type="number"
              placeholder="Min price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="form-input block w-1/2 p-2 rounded border-gray-300 text-black"
            />
            <input
              type="number"
              placeholder="Max price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="form-input block w-1/2 p-2 rounded border-gray-300 text-black"
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={handleFilter}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Filter
          </button>
          <button
            onClick={handleClear}
            className="bg-gray-500 text-white py-2 px-4 rounded"
          >
            Clear
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default Filter;
