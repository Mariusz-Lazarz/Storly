import React from "react";

function Navbar() {
  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black font-logo text-2xl">
          <span className="font-bold">Storly</span>
        </div>
        <div>
          <button className="bg-light-pink text-white py-2 px-4 rounded-full mr-2">
            Sign Up
          </button>
          <button className="bg-light-pink text-white py-2 px-4 rounded-full">
            Sign In
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
