function ChangeEmail() {
  return (
    <div className="bg-white p-6 rounded shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Change Email</h2>
      <form>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          New Email
        </label>
        <input
          type="email"
          id="email"
          className="border p-2 rounded w-full mb-4"
          placeholder="Enter your new email"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition duration-300"
        >
          Change Email
        </button>
      </form>
    </div>
  );
}

export default ChangeEmail;
