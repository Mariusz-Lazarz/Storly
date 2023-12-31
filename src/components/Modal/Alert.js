import Modal from "./Modal";
import "./alert.css";

const Alert = ({ isOpen, title, message, onConfirm, onCancel }) => {
  return (
    <Modal isOpen={isOpen} onClose={onCancel} onExited={onCancel}>
      <h2 className="text-xl font-semibold mb-4 dark:text-white">{title}</h2>
      <p className="mb-6 dark:text-white">{message}</p>
      <div className="flex justify-end space-x-4">
        {onCancel !== undefined && (
          <button
            onClick={onCancel}
            className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-red-500 hover:bg-red-700"
          >
            Cancel
          </button>
        )}
        <button
          onClick={onConfirm}
          className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-blue-500 hover:bg-blue-700"
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default Alert;
