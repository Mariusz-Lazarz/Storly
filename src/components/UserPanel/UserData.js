import ChangePassword from "./ChangePassword";
import DeleteAccount from "./DeleteAccount";

const UserData = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold mb-4">User Data</h1>
      <ChangePassword />
      <DeleteAccount />
    </div>
  );
};

export default UserData;
