import React, { useState } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Alert from "../Modal/Alert";

function DeleteAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (email && password && user) {
      const credential = EmailAuthProvider.credential(email, password);
      try {
        await reauthenticateWithCredential(user, credential);
        await deleteUser(user);
        navigate("/");
      } catch (error) {
        setShowAlert(false);
        console.error(error);
        setError(error.message);
      }
    } else {
      setShowAlert(false);
      setError("Both email and password are required to delete your account.");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow-lg mb-6">
      <h2 className="text-2xl font-bold mb-4">Delete Account</h2>
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <form>
        {/* <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </label> */}
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border p-2 rounded w-full mb-4"
        />
        {/* <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label> */}
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="border p-2 rounded w-full mb-4"
        />
        <button
          type="button"
          className="bg-red-500 text-white p-2 rounded hover:bg-red-700 transition duration-300 mb-4"
          onClick={() => setShowAlert(true)}
        >
          Delete Account
        </button>
      </form>
      <Alert
        isOpen={showAlert}
        title="Confirm Deletion"
        message="Are you sure you want to delete your account?"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowAlert(false)}
      ></Alert>
    </div>
  );
}

export default DeleteAccount;
