function ChangePassword() {
  return (
    <div className="bg-white p-6 rounded shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      <form>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          New Password
        </label>
        <input
          type="password"
          id="password"
          className="border p-2 rounded w-full mb-4"
          placeholder="Enter your new password"
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition duration-300"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
