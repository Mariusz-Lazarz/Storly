import "../../App.css";
import { Link } from "react-router-dom";
import ReviewCarousel from "./ReviewCarousel";

function HomePage() {
  return (
    <>
      <div className="bg-container text-center dark:text-white"></div>
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4 dark:text-white">
            Welcome to Storly!
          </h1>
          <p className="text-lg mb-8 dark:text-gray-300">
            Discover a world of premium products handpicked for quality and
            style.
          </p>
          <div className="flex flex-wrap justify-center">
            <Link
              to="/store"
              className="m-4 no-underline transform transition-transform duration-500 hover:scale-105 dark:text-white"
            >
              <div className="p-6 bg-white rounded shadow-lg w-72 transition-colors duration-300 hover:bg-gray-100 dark:bg-dark-secondary dark:hover:bg-dark-tertiary">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">
                  Browse
                </h2>
                <p className="text-lg dark:text-gray-300">
                  Browse Our Selection and Add Your Favorites to Cart
                </p>
              </div>
            </Link>
            <Link
              to="/add"
              className="m-4 no-underline transform transition-transform duration-500 hover:scale-105 dark:text-white"
            >
              <div className="p-6 bg-white rounded shadow-lg w-72 transition-colors duration-300 hover:bg-gray-100 dark:bg-dark-secondary dark:hover:bg-dark-tertiary">
                <h2 className="text-2xl font-bold mb-2 dark:text-white">Add</h2>
                <p className="text-lg dark:text-gray-300">
                  Effortlessly List Your New Product Today
                </p>
              </div>
            </Link>
          </div>
          <ReviewCarousel />
        </div>
      </div>
    </>
  );
}

export default HomePage;
