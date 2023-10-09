import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { applyBlur, revertBlur } from "../../utils/blur";
import { CSSTransition } from "react-transition-group";
import "./modal.css";

const Modal = ({ children, onClose, isOpen }) => {
  const modalContent = useRef(null);

  const handleClickOutside = (event) => {
    if (modalContent.current && !modalContent.current.contains(event.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      applyBlur();
      return () => revertBlur();
    }
  }, [isOpen]);

  const modalRoot = document.getElementById("modal-root");

  return ReactDOM.createPortal(
    <CSSTransition in={isOpen} timeout={300} classNames="modal" unmountOnExit>
      <div
        onClick={handleClickOutside}
        className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      >
        <div
          ref={modalContent}
          onClick={(e) => e.stopPropagation()}
          className="bg-white p-6 rounded shadow-lg relative md:w-11/12 lg:w-1/3 mx-auto modal-content"
        >
          {children}
        </div>
      </div>
    </CSSTransition>,
    modalRoot
  );
};

export default Modal;
