function DeleteAccount() {
  return (
    <div className="bg-white p-6 rounded shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
      <button
        className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300"
        onClick={() =>
          window.confirm("Are you sure you want to delete your account?")
        }
      >
        Delete Account
      </button>
    </div>
  );
}

export default DeleteAccount;
