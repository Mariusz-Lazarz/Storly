import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { revertBlur } from "../../utils/blur";
import LoadingSpinner from "../../utils/LoadingSpinner";

const SignUpModal = ({ isOpen, onClose }) => {
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

  const register = async (e) => {
    const auth = getAuth();
    setIsLoading(true);
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      revertBlur();
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      setIsLoading(false);
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else {
        setError("Failed to register. Please try again.");
      }
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
        <form className="flex flex-col space-y-4" onSubmit={register}>
          <h2 className="text-2xl font-bold text-center mb-4">Join Us</h2>
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
            Register
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default SignUpModal;
