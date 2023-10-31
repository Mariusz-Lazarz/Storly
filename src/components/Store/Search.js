import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Sort from "./Sort";

const Search = ({
  handleSearch,
  toggleFilterModal,
  sortItems,
  filteredItems,
}) => {
  const [localQuery, setLocalQuery] = useState("");
  // const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localQuery) {
      const filteredSuggestions = filteredItems.filter((item) =>
        item.title.toLowerCase().includes(localQuery.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [localQuery, filteredItems]);

  // useEffect(() => {
  //   if (isFocused && localQuery) {
  //     const timer = setTimeout(() => {
  //       handleSearch(localQuery);
  //       navigate(`?q=${localQuery}`);
  //     }, 700);

  //     return () => clearTimeout(timer);
  //   }
  // }, [localQuery, handleSearch, navigate, isFocused]);

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
    console.log(filteredItems);
  };

  const handleSubmit = () => {
    handleSearch(localQuery);
    navigate(`?q=${localQuery}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(localQuery);
      navigate(`?q=${localQuery}`);
    }
  };

  return (
    <div className="relative flex justify-center text-white dark:text-black">
      <div className="pr-4 pl-4 pb-2 pt-2 w-full lg:w-3/5 mb-4 text-white flex justify-center border border-black rounded bg-gray-700 dark:border-white dark:bg-white dark:text-black">
        <input
          type="text"
          placeholder="Search for items..."
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          // onFocus={() => setIsFocused(true)}
          onBlur={() => {
            // setIsFocused(false);
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          className="focus:outline-none w-full mr-2 bg-transparent text-white placeholder:text-white dark:placeholder:text-black dark:text-black"
        />
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            className="bg-transparent hover:text-gray-600"
          >
            <FontAwesomeIcon icon={faSearch} size="lg" />
          </button>
          <button onClick={toggleFilterModal} className="hover:text-gray-600">
            <FontAwesomeIcon icon={faSliders} size="lg" />
          </button>
          <Sort sortItems={sortItems} />
        </div>
      </div>
      {showSuggestions && (
        <div
          className="absolute top-12 w-full overflow-scroll lg:w-3/5 mt-2 z-50 bg-gray-700 border border-gray-300 rounded shadow-lg dark:bg-white"
          style={{ height: "80vh" }}
        >
          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <Link to={`/product/${suggestion.id}`} key={index}>
                <div className="suggestion-item flex items-center p-2 cursor-pointer hover:bg-gray-500">
                  <img
                    src={suggestion.imageLinks[0]}
                    alt={suggestion.title}
                    className="w-16 h-16 object-cover mr-2"
                  />
                  <div className="flex-grow">
                    <div className="font-semibold truncate">
                      {suggestion.title}
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`text-sm ${
                          Number(suggestion.discount) > 0 ? "line-through" : ""
                        }`}
                      >
                        ${suggestion.price}
                      </span>
                      {Number(suggestion.discount) > 0 && (
                        <span className="text-sm text-red-500 ml-2">
                          ${suggestion.discount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-2 text-center text-red-500">No items found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
