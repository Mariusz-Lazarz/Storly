import React, { useState } from "react";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";

function Navbar() {
  const [openModal, setOpenModal] = useState(null);

  const openSignUp = (e) => {
    e.stopPropagation();
    setOpenModal("signUp");
  };

  const openSignIn = (e) => {
    e.stopPropagation();
    setOpenModal("signIn");
  };

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black font-logo text-2xl">
          <span className="font-bold">Storly</span>
        </div>
        <div>
          <button
            onClick={openSignUp}
            className="bg-light-pink text-white py-2 px-4 rounded-full mr-2"
          >
            Sign Up
          </button>
          <button
            onClick={openSignIn}
            className="bg-light-pink text-white py-2 px-4 rounded-full"
          >
            Sign In
          </button>
        </div>
      </div>
      <SignUpModal
        isOpen={openModal === "signUp"}
        onClose={() => setOpenModal(null)}
      />
      <SignInModal
        isOpen={openModal === "signIn"}
        onClose={() => setOpenModal(null)}
      />
    </nav>
  );
}

export default Navbar;
