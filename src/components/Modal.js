import React, { useEffect, useRef } from "react";
import ReactDOM from "react-dom";

const Modal = ({ children, onClose }) => {
  const el = useRef(document.createElement("div"));
  const modalRef = useRef();

  useEffect(() => {
    const closeOnOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    const modalRoot = document.getElementById("modal-root");
    const appRoot = document.getElementById("root");

    if (appRoot) {
      appRoot.style.filter = "blur(5px)";
    }

    modalRoot.appendChild(el.current);
    document.addEventListener("click", closeOnOutsideClick);

    return () => {
      modalRoot.removeChild(el.current);
      document.removeEventListener("click", closeOnOutsideClick);
      if (appRoot) {
        appRoot.style.filter = "";
      }
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div 
        ref={modalRef} 
        className="bg-white p-6 rounded shadow-lg relative md:w-11/12 lg:w-1/3 mx-auto"
      >
        {children}
      </div>
    </div>,
    el.current
  );
};

export default Modal;
