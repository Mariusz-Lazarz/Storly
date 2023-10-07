import Modal from "./Modal";

const Alert = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal onClose={onCancel}>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="mb-6">{message}</p>
      <div className="flex justify-end space-x-4">
        <button
          onClick={onCancel}
          className="py-2 px-4 font-semibold rounded-lg shadow-md text-white bg-red-500 hover:bg-red-700"
        >
          Cancel
        </button>
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
