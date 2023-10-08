import React, { useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import Alert from "../Modal/Alert";

function ChangePassword() {
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleChangePassword = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setError("No user is currently signed in.");
      return;
    }

    if (newPassword) {
      try {
        await updatePassword(user, newPassword);
        setSuccessMessage("Password updated successfully");
        setShowAlert(false);
        setNewPassword("");
        setError(null);
      } catch (error) {
        setShowAlert(false);
        console.error(error);
        setError(error.message);
      }
    } else {
      setShowAlert(false);
      setError("New password is required");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Change Password</h2>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      {successMessage && (
        <div className="text-green-500 mt-2">{successMessage}</div>
      )}
      <form>
        {/* <label
          htmlFor="newPassword"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          New Password
        </label> */}
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter your new password"
          className="border p-2 rounded w-full mb-4"
        />
        <button
          onClick={() => setShowAlert(true)}
          type="button"
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 transition duration-300
          "
        >
          Change Password
        </button>
      </form>
      <Alert
        isOpen={showAlert}
        title="Confirm Password Change"
        message="Are you sure you want to change your password?"
        onConfirm={handleChangePassword}
        onCancel={() => setShowAlert(false)}
      ></Alert>
    </div>
  );
}

export default ChangePassword;
