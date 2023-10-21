import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({
  filteredItems,
  searchQuery,
  paginate,
  currentPage,
  totalPages,
}) => {
  return (
    <div className="flex items-center justify-center mt-4">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 font-semibold  bg-white rounded-lg focus:outline-none ${
          currentPage === 1
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-200"
        }`}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>
      {currentPage !== 1 && (
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 mx-1 font-semibold  bg-white rounded-lg focus:outline-none ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-200"
          }`}
        >
          {currentPage - 1}
        </button>
      )}
      <button className="px-4 py-2 mx-1 font-semibold  bg-blue-500 rounded-lg focus:outline-none dark:bg-blue-700">
        {currentPage}
      </button>
      {currentPage !== totalPages && (
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 mx-1 font-semibold  bg-white rounded-lg focus:outline-none ${
            currentPage === totalPages
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-200"
          }`}
        >
          {currentPage + 1}
        </button>
      )}
      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 font-semibold  bg-white rounded-lg focus:outline-none ${
          currentPage === totalPages
            ? "cursor-not-allowed opacity-50"
            : "hover:bg-gray-200"
        }`}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Pagination;
