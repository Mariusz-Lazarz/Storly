import React, { useState } from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function SignUpModal({ isOpen, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const auth = getAuth();

  const register = async (e) => {
    e.preventDefault();
    try {
      // Attempt to register the user using async/await syntax
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Registered successfully", userCredential);
      // Clear the input fields and close the modal after successful registration
      setEmail("");
      setPassword("");
      onClose();
    } catch (error) {
      // Handle errors and display a user-friendly message
      console.error("Error registering user", error);
      if (error.code === "auth/email-already-in-use") {
        setError("Email already in use");
      } else {
        setError("Failed to register. Please try again.");
      }
    }
  };
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="bg-white p-6 rounded relative w-full md:w-11/12 mx-auto my-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <form className="flex flex-col space-y-4" onSubmit={register}>
          <h2 className="text-2xl font-bold text-center mb-4">Join Us</h2>
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
            Register
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default SignUpModal;
