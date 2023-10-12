import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import ReviewCarousel from "./ReviewCarousel";

function HomePage() {
  return (
    <>
      <div className="bg-container text-center"></div>
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Storly!</h1>
          <p className="text-lg mb-8">
            Discover a world of premium products handpicked for quality and
            style.
          </p>
          <div className="flex flex-wrap justify-center">
            <Link
              to="/store"
              className="m-4 no-underline transform transition-transform duration-500 hover:scale-105"
            >
              <div className="p-6 bg-white rounded shadow-lg w-72 transition-colors duration-300 hover:bg-gray-100">
                <h2 className="text-2xl font-bold mb-2">Browse</h2>
                <p className="text-lg">
                  Browse Our Selection and Add Your Favorites to Cart
                </p>
              </div>
            </Link>
            <Link
              to="/add"
              className="m-4 no-underline transform transition-transform duration-500 hover:scale-105"
            >
              <div className="p-6 bg-white rounded shadow-lg w-72 transition-colors duration-300 hover:bg-gray-100">
                <h2 className="text-2xl font-bold mb-2">Add</h2>
                <p className="text-lg">
                  Effortlessly List Your New Product Today
                </p>
              </div>
            </Link>
          </div>
          <div className="mt-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">
              Real Feedback from Happy Shoppers
            </h2>
            <ReviewCarousel />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
