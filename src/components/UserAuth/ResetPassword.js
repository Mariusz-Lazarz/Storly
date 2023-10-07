import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { revertBlur } from "../../utils/blur";

const ResetPassword = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "If an account exists for this email, a reset link will be sent."
      );
      setEmail("");
      setError(null);
    } catch (error) {
      console.error("Error sending password reset email", error);
      setError("Error sending password reset email. Please try again later.");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setMessage(null);
      setError(null);
      setEmail("");
    }
  }, [isOpen]);

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
        <form
          className="flex flex-col space-y-4"
          onSubmit={handlePasswordReset}
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            Reset Password
          </h2>
          {message && <p className="text-green-500 text-sm">{message}</p>}
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <input
            type="email"
            className="p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="bg-light-pink text-white p-2 rounded-full"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </Modal>
  );
};

export default ResetPassword;
