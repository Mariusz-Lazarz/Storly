import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck, faUndo, faTh } from "@fortawesome/free-solid-svg-icons";

const Feature = () => {
  return (
    <div className="flex shadow-lg divide-x divide-gray-200 text-center dark:text-white">
      <div className="flex flex-col items-center p-4 w-1/3">
        <FontAwesomeIcon
          icon={faTruck}
          size="2x"
          className="mb-2"
          color="#ad8825"
        />
        <h2 className="text-xl font-bold mb-2">Free Delivery</h2>
        <p className="text-center">Get your products delivered for free.</p>
      </div>
      <div className="flex flex-col items-center p-4 w-1/3">
        <FontAwesomeIcon
          icon={faUndo}
          size="2x"
          className="mb-2"
          color="#ad8825"
        />
        <h2 className="text-xl font-bold mb-2">14 Days Return</h2>
        <p className="text-center">Easy returns within 14 days.</p>
      </div>
      <div className="flex flex-col items-center p-4 w-1/3">
        <FontAwesomeIcon
          icon={faTh}
          size="2x"
          className="mb-2"
          color="#ad8825"
        />
        <h2 className="text-xl font-bold mb-2">Various Range of Products</h2>
        <p className="text-center">A wide variety to choose from.</p>
      </div>
    </div>
  );
};

export default Feature;
