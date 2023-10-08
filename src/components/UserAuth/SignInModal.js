import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { revertBlur } from "../../utils/blur";

const SignInModal = ({ isOpen, onClose, onForgotPasswordClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isOpen) {
      setError(null);
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const auth = getAuth();

  const login = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Logged in successfully", userCredential);
      revertBlur();
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      console.error("Error logging in user", error);
      setError(
        "Failed to login. Please check your email and password and try again."
      );
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <div className="bg-white p-6 rounded relative w-full md:w-11/12 mx-auto my-auto">
        <button
          onClick={() => {
            onClose();
            revertBlur();
          }}
          className="absolute top-2 right-2 text-black"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <form className="flex flex-col space-y-4" onSubmit={login}>
          <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            type="email"
            className="p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            className="p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="bg-light-pink text-white p-2 rounded-full"
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
