import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSliders } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Sort from "./Sort";
import Suggestions from "./Suggestions";

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
    const itemsForSuggestion = [...filteredItems];
    if (localQuery) {
      const filteredSuggestions = itemsForSuggestion.filter((item) =>
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
      <Suggestions
        suggestions={suggestions}
        showSuggestions={showSuggestions}
      />
    </div>
  );
};

export default Search;
