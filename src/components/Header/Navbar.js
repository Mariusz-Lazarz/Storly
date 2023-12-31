import React, { useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";
import SignUpModal from "../UserAuth/SignUpModal";
import SignInModal from "../UserAuth/SignInModal";
import ResetPassword from "../UserAuth/ResetPassword";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../utils/LoadingSpinner";
import useAuth from "../../hooks/useAuth";
import Switch from "./Switch";
import { clearCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";

function Navbar() {
  const [openModal, setOpenModal] = useState(null);
  const navigate = useNavigate();
  const { auth, loading } = useAuth();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  // useEffect(() => {
  //   if (auth) {
  //     UserManagement.setUserId(auth.email);
  //   }
  // }, [auth]);

  const openSignUp = (e) => {
    e.stopPropagation();
    setOpenModal("signUp");
  };

  const openSignIn = (e) => {
    e.stopPropagation();
    setOpenModal("signIn");
  };

  const openResetPassword = (e) => {
    e.stopPropagation();
    setOpenModal("resetPassword");
  };

  const logout = async () => {
    const auth = getAuth();
    try {
      dispatch(clearCart());
      await signOut(auth);
      navigate("/");
    } catch (error) {}
  };

  return (
    <>
      <nav className="bg-white p-4 fixed top-0 w-full z-50 dark:bg-dark-primary dark:text-white ">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className=" font-logo text-2xl no-underline">
              <span className="font-bold">Storly</span>
            </Link>
            <Switch />
          </div>
          <div className="flex items-center">
            {loading ? (
              <LoadingSpinner />
            ) : !auth ? (
              <>
                <button
                  onClick={openSignUp}
                  className="bg-light-pink  py-2 px-4 rounded-full mr-2 dark:bg-dark-tertiary"
                >
                  Sign Up
                </button>
                <button
                  onClick={openSignIn}
                  className="bg-light-pink  py-2 px-4 rounded-full dark:bg-dark-tertiary"
                >
                  Sign In
                </button>
              </>
            ) : (
              <>
                <Link to="/userPanel" state={auth.email}>
                  <FontAwesomeIcon icon={faUser} style={{ fontSize: "20px" }} />
                </Link>
                <Link to="/cart" className="mx-4 relative">
                  <FontAwesomeIcon
                    icon={faShoppingCart}
                    style={{ fontSize: "20px" }}
                  />
                  <span
                    className="absolute text-white rounded-full text-xs w-4 h-4 flex items-center justify-center bg-red-500"
                    style={{ top: "-25%", right: "-25%" }}
                  >
                    {cartItemCount}
                  </span>
                </Link>
                <button onClick={logout} className=" py-1 px-2 rounded-full">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    style={{ fontSize: "20px" }}
                  />
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
          onForgotPasswordClick={openResetPassword}
        />
        <ResetPassword
          isOpen={openModal === "resetPassword"}
          onClose={() => setOpenModal(null)}
          onBackToLoginClick={openSignIn}
        />
      </nav>
      <div className="nav-spacer" style={{ height: "4rem" }}></div>
    </>
  );
}

export default Navbar;
