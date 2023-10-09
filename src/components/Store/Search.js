import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

const Search = ({ handleSearch }) => {
  const [localQuery, setLocalQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isFocused) {
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
    <div className="p-2 rounded mb-4 flex justify-center">
      <input
        type="text"
        placeholder="Search for items..."
        value={localQuery}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full lg:w-1/2 p-2 rounded-full border border-gray-300 shadow-sm"
      />
      <button
        onClick={handleSubmit}
        className="ml-2 p-2 rounded-full border border-gray-300 bg-transparent"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default Search;
