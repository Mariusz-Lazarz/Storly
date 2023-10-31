import { Link } from "react-router-dom";

const Suggestions = ({ showSuggestions, suggestions }) => {
  return (
    <>
      {showSuggestions && (
        <div
          className="absolute top-12 w-full overflow-auto lg:w-3/5 mt-2 z-50 bg-gray-700 border border-gray-300 rounded shadow-lg dark:bg-white"
          style={{ height: "auto", maxHeight: "80vh" }}
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
    </>
  );
};

export default Suggestions;
