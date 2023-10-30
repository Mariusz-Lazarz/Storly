import StarRating from "../Store/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faMinus,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

const PreviewItem = ({ item }) => {
  return (
    <div className="flex flex-col w-full items-center justify-center p-4 shadow-lg dark:text-white dark:bg-dark-primary">
      <div className="text-center text-4xl mb-4">
        <h1>Preview Item Live</h1>
      </div>
      <div className="flex flex-col lg:flex-row w-full">
        <div className="w-full lg:w-1/2 p-4 flex items-center justify-center">
          <div className="w-full h-64 lg:h-96">
            <img
              src={
                item.imagePreviewUrls[0] ||
                "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
              }
              alt={item.title}
              className="w-full h-full object-fit  rounded"
            />
          </div>
        </div>

        <div className="w-full lg:w-1/2 p-4 flex flex-col">
          <h1 className="text-2xl text-pink-500 font-bold mb-2">
            {item.title || "N/A"}
          </h1>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl text-red-300">${item.price || "N/A"}</p>
            <div className="flex items-center">
              <span className="text-sm mr-2">0</span>
              <StarRating averageRating={0} />
              <span className="ml-2 text-sm">(0 Reviews)</span>
            </div>
          </div>
          <hr className="mb-4" />
          <h2 className="text-lg text-pink-500 font-semibold mb-2">
            Description
          </h2>
          <p className="mb-4">{item.description || "N/A"}</p>
          <hr className="mb-4" />
          <div className="mb-4">
            <h2 className="text-lg text-pink-500 font-semibold mb-2">
              Details
            </h2>
            <div className="flex flex-col md:flex-row justify-between">
              <p className="mb-2">
                <span className="font-medium">Category:</span>
                {item.category || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-medium">Variant:</span>
                {item.variant || "N/A"}
              </p>
              <p className="mb-2">
                <span className="font-medium">Brand:</span>
                {item.brand || "N/A"}
              </p>
            </div>
          </div>
          <hr className="mb-4" />
          <div className="mb-4 flex justify-between items-center gap-2">
            <div className="flex gap-2">
              <button className={`py-2 px-3 rounded text-white bg-light-pink`}>
                <span className="hidden xl:inline">Add to cart</span>
                <FontAwesomeIcon icon={faCartShopping} className="xl:hidden" />
              </button>
              <button className={`border py-2 px-3 rounded border-gray-500`}>
                <FontAwesomeIcon icon={faHeart} />
                <span className="hidden xl:inline"> Add to faviourite</span>
              </button>
            </div>
            <div className="flex gap-2 bg-gray-100 py-1 px-4 dark:bg-dark-secondary">
              <button className="text-orange-500">
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <span>1</span>
              <button className="text-orange-500">
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewItem;
