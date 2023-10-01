import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";

function Navbar() {
  const [openModal, setOpenModal] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, []);

  const openSignUp = (e) => {
    e.stopPropagation();
    setOpenModal("signUp");
  };

  const openSignIn = (e) => {
    e.stopPropagation();
    setOpenModal("signIn");
  };

  const logout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <nav className="bg-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-black font-logo text-2xl">
          <Link to="/" className="text-black font-logo text-2xl no-underline">
            {" "}
            {/* Use Link component here */}
            <span className="font-bold">Storly</span>
          </Link>
        </div>
        <div>
          {loading ? (
            // Display a placeholder or a spinner while determining auth state
            <span>Loading...</span>
          ) : user ? (
            <>
              <span className="mr-4">{user.email}</span>
              <button
                onClick={logout}
                className="bg-light-pink text-white py-2 px-4 rounded-full"
              >
                Logout
              </button>
            </>
          ) : (
            <>
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
            </>
          )}
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
