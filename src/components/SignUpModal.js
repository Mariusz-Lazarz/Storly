import React from "react";
import Modal from "./Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function SignUpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className="bg-white p-6 rounded shadow-lg relative w-full md:w-11/12 lg:w-1/4 mx-auto my-auto">
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <form className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">Join Us</h2>
          <input
            type="email"
            className="p-2 border rounded"
            placeholder="Email"
          />
          <input
            type="password"
            className="p-2 border rounded"
            placeholder="Password"
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
