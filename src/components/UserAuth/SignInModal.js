import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { revertBlur } from "../../utils/blur";
import LoadingSpinner from "../../utils/LoadingSpinner";

const SignInModal = ({ isOpen, onClose, onForgotPasswordClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setEmail("");
      setPassword("");
      setIsLoading(false);
    }
  }, [isOpen]);

  const login = async (e) => {
    const auth = getAuth();
    e.preventDefault();
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      revertBlur();
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      setError(
        "Failed to login. Please check your email and password and try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      {isLoading && <LoadingSpinner></LoadingSpinner>}
      <div className="bg-white p-6 rounded relative w-full md:w-11/12 mx-auto my-auto dark:bg-dark-primary dark:text-white">
        <button
          onClick={() => {
            onClose();
            revertBlur();
          }}
          className="absolute top-2 right-2 text-black dark:text-white"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <form className="flex flex-col space-y-4" onSubmit={login}>
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            type="email"
            className="p-2 border rounded dark:bg-dark-secondary  dark:border-gray-700"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-2 border rounded dark:bg-dark-secondary  dark:border-gray-700"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-light-pink text-white p-2 rounded-full dark:bg-dark-tertiary"
          >
            Login
          </button>
        </form>
        <button
          type="button"
          onClick={onForgotPasswordClick}
          className="text-blue-500 text-sm underline cursor-pointer mt-4 inline-block"
        >
          Forgot Password?
        </button>
      </div>
    </Modal>
  );
};

export default SignInModal;
