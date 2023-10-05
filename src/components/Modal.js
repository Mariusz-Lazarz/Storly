import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { applyBlur, revertBlur } from "../utils/blur";

const Modal = ({ children, onClose }) => {
  const modalContent = useRef(null);

  const handleClickOutside = (event) => {
    if (modalContent.current && !modalContent.current.contains(event.target)) {
      onClose();
      revertBlur();
    }
  };

  applyBlur();

  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div
        ref={modalContent}
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-6 rounded shadow-lg relative md:w-11/12 lg:w-1/3 mx-auto"
      >
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;
