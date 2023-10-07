import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import SignUpModal from "../UserAuth/SignUpModal";
import SignInModal from "../UserAuth/SignInModal";
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
    <>
      <nav className="bg-gray-800 p-4 fixed top-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-logo text-2xl">
            <Link to="/" className="text-white font-logo text-2xl no-underline">
              <span className="font-bold">Storly</span>
            </Link>
          </div>
          <div className="flex items-center">
            {loading ? (
              <span>Loading...</span>
            ) : user ? (
              <>
                <Link to="/userPanel" className="text-blue-500 hover:underline">
                  {user.email}
                </Link>
                <Link to="/cart" className="mx-4 relative">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ fontSize: "1.5rem" }}
                  />
                  <span
                    className="absolute text-white rounded-full text-xs w-4 h-4 flex items-center justify-center bg-red-500"
                    style={{ top: "-25%", right: "-25%" }}
                  >
                    {cartItemCount}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  className=" bg-light-pink text-white py-1 px-2 rounded-full"
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
      <div className="nav-spacer" style={{ height: "4rem" }}></div>
    </>
  );
}

export default Navbar;