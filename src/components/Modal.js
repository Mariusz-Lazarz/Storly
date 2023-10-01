import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
  const el = document.createElement("div");
  const modalRef = useRef();

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const modalRoot = document.getElementById("modal-root");
    modalRoot.appendChild(el);
    document.addEventListener("click", closeOnOutsideClick);

    return () => {
      modalRoot.removeChild(el);
      document.removeEventListener("click", closeOnOutsideClick);
    };
  }, [el, onClose]);

  return ReactDOM.createPortal(
    <div className="flex items-start justify-center w-full h-screen md:mt-[10vh] md:items-start sm:h-full sm:w-full sm:mt-0 sm:items-center">
      <div
        ref={modalRef}
        className="w-full h-full md:w-[100vw] md:h-[100vw] md:rounded"
      >
        {children}
      </div>
    </div>,
    el
  );
};

export default Modal;
