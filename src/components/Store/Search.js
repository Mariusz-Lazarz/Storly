import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Search = ({ handleSearch }) => {
  const [localQuery, setLocalQuery] = useState("");

  const handleInputChange = (e) => {
    setLocalQuery(e.target.value);
  };

  const handleSubmit = () => {
    handleSearch(localQuery);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(localQuery);
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
