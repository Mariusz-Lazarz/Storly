import React, { useState } from "react";
import {
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
  deleteUser,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  remove,
  query,
  orderByChild,
  equalTo,
  get,
} from "firebase/database";
import { useNavigate } from "react-router-dom";
import Alert from "../Modal/Alert";

function DeleteAccount() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteUserSpecificData = async (path) => {
    const db = getDatabase();
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      console.error("No user is currently signed in.");
      return;
    }

    const dataRef = ref(db, path);
    const userQuery = query(dataRef, orderByChild("userId"), equalTo(user.uid));

    const snapshot = await get(userQuery);
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        const itemKey = childSnapshot.key;
        remove(ref(db, `${path}/${itemKey}`));
      });
    } else {
      console.log(`No data found for the current user under ${path}.`);
    }
  };

  const handleDeleteUserData = () => {
    handleDeleteUserSpecificData("items");
    handleDeleteUserSpecificData("orders");
    handleDeleteUserSpecificData("reviews");
  };

  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    const auth = getAuth();
    const user = auth.currentUser;

    if (email && password && user) {
      const credential = EmailAuthProvider.credential(email, password);
      try {
        await reauthenticateWithCredential(user, credential);
        handleDeleteUserData();
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
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="border p-2 rounded w-full mb-4"
        />
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
