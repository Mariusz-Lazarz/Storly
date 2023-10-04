import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import SignUpModal from "./SignUpModal";
import SignInModal from "./SignInModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

function Navbar() {
  const [openModal, setOpenModal] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // useEffect(() => {
  //   const auth = getAuth();
  //   const autoLogoutTimer = setTimeout(async () => {
  //     if (user) {
  //       try {
  //         await signOut(auth);
  //         console.log("Auto logged out due to inactivity");
  //       } catch (error) {
  //         console.error("Error logging out", error);
  //       }
  //     }
  //   }, 1800000);

  //   return () => clearTimeout(autoLogoutTimer);
  // }, [user]);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

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
            <span className="font-bold">Storly</span>
          </Link>
        </div>
        <div>
          {loading ? (
            <span>Loading...</span>
          ) : user ? (
            <>
              <Link
                to="/userPanel"
                className="mr-4 text-blue-500 hover:underline"
              >
                {user.email}
              </Link>
              <Link to="/cart" className="mr-4 relative">
                <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                <span className="absolute -top-4 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              </Link>
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
