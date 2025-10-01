import { useState } from "react";
import { Link } from "react-router-dom";
import ChangePassword from "../components/setting/ChangePassword";

const Settings = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openChangePasswordModal = () => {
    setIsModalVisible(true); // Open the modal
  };

  const closeChangePasswordModal = () => {
    setIsModalVisible(false); // Close the modal
  };

  return (
    <div>
      <div className="bg-[#d49256] text-white px-6 py-3 rounded-md">
        <h2 className="text-lg font-semibold">Settings</h2>
      </div>

      <div className="space-y-4 mt-6">
        <Link
          to="/dashboard/settings/personal-information"
          className="flex justify-between items-center p-4 border border-gray-300 rounded-md hover:bg-[#f8f2ec] transition duration-200"
        >
          <span className="text-xl">Personal Information</span>
          <p>
            <span className="text-[#d49256] text-2xl">→</span>
          </p>
        </Link>

        {/* Change Password link triggers the modal */}
        <button
          onClick={openChangePasswordModal}
          className="flex justify-between items-center p-4 border border-gray-300 rounded-md hover:bg-[#f8f2ec] transition duration-200 w-full cursor-pointer"
        >
          <span className="text-xl">Change Password</span>
          <p>
            <span className="text-[#d49256] text-2xl">→</span>
          </p>
        </button>

        <Link
          to="/dashboard/settings/terms-condition"
          className="flex justify-between items-center p-4 border border-gray-300 rounded-md hover:bg-[#f8f2ec] transition duration-200"
        >
          <span className="text-xl">Terms & Condition</span>
          <p>
            <span className="text-[#d49256] text-2xl">→</span>
          </p>
        </Link>

        <Link
          to="/dashboard/settings/privacy-policy"
          className="flex justify-between items-center p-4 border border-gray-300 rounded-md hover:bg-[#f8f2ec] transition duration-200"
        >
          <span className="text-xl">Privacy Policy</span>
          <p>
            <span className="text-[#d49256] text-2xl">→</span>
          </p>
        </Link>

        <Link
          to="/dashboard/settings/about-us"
          className="flex justify-between items-center p-4 border border-gray-300 rounded-md hover:bg-[#f8f2ec] transition duration-200"
        >
          <span className="text-xl">About Us</span>
          <p>
            <span className="text-[#d49256] text-2xl">→</span>
          </p>
        </Link>
      </div>

      {/* Render the ChangePasswordModal when the modal is visible */}
      <ChangePassword
        open={isModalVisible}
        onCancel={closeChangePasswordModal}
      />
    </div>
  );
};

export default Settings;
