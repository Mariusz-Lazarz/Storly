import StarRating from "../Store/StarRating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faHeart,
  faMinus,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import PreviewModal from "./PreviewModal";

const PreviewItem = ({ isOpen, onClose, item }) => {
  return (
    <PreviewModal isOpen={isOpen} onClose={onClose}>
      <div className="container mx-auto p-4 w-full dark:text-white">
        <div className="flex justify-end">
          <FontAwesomeIcon
            icon={faTimes}
            className="hover:cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-wrap justify-center items-center">
          <div className="w-full md:w-1/2 p-4 flex items-center justify-center">
            <div className="w-full h-64 md:h-96">
              <img
                src={
                  item.imagePreviewUrls[0] ||
                  "https://images.unsplash.com/photo-1615751072497-5f5169febe17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3V0ZSUyMGRvZ3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80"
                }
                alt={item.title}
                className="w-full h-full object-fit"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 p-4 flex flex-col">
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
              <div className="flex justify-between">
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
                <button
                  className={`py-2 px-3 rounded text-white bg-light-pink $`}
                >
                  <span className="hidden xl:inline">Add to cart</span>
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    className="xl:hidden"
                  />
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
    </PreviewModal>
  );
};

export default PreviewItem;
