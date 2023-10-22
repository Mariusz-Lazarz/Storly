import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const Search = ({ handleSearch, toggleFilterModal }) => {
  const [localQuery, setLocalQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFocused && localQuery) {
      const timer = setTimeout(() => {
        handleSearch(localQuery);
        navigate(`?q=${localQuery}`);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [localQuery, handleSearch, navigate, isFocused]);

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
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
    <div className="flex justify-center dark:text-white">
      <div className="w-full lg:w-1/2 pr-4 pl-4 pb-2 pt-2 mb-4 text-white  flex justify-center border border-black rounded bg-gray-700 dark:border-white dark:bg-white dark:text-black">
        <input
          type="text"
          placeholder="Search for items..."
          value={localQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="focus:outline-none w-full mr-2 bg-transparent text-white placeholder:text-white dark:placeholder:text-black dark:text-black"
        />
        <div className="flex gap-3">
          <button onClick={handleSubmit} className="bg-transparent">
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <button onClick={toggleFilterModal} className="text-xl">
            <FontAwesomeIcon icon={faFilter} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
