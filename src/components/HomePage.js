import React from "react";
import { Link } from "react-router-dom";
import ReviewCarousel from "./ReviewCarousel"; // Import the new component

function HomePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Storly!</h1>
        <p className="text-lg mb-8">
          Explore our collection and manage your items seamlessly.
        </p>
        <div className="flex flex-wrap justify-center">
          <Link to="/store" className="m-4 no-underline">
            <div className="p-6 bg-white rounded shadow-lg w-72 hover:bg-gray-100">
              <h2 className="text-2xl font-bold mb-2">Browse Items</h2>
              <p className="text-lg">
                Discover unique items available in our collection.
              </p>
            </div>
          </Link>
          <Link to="/add" className="m-4 no-underline">
            <div className="p-6 bg-white rounded shadow-lg w-72 hover:bg-gray-100">
              <h2 className="text-2xl font-bold mb-2">Manage Collection</h2>
              <p className="text-lg">
                Add, modify, and manage your items efficiently.
              </p>
            </div>
          </Link>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">What our users say</h2>
          <ReviewCarousel /> {/* Use the new component */}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
