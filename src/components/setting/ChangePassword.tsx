/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import type { SubmitHandler } from "react-hook-form";
import BZForm from "../../forms/BZForm";
import BZInput from "../../forms/BZInput";
import { CustomModal } from "../modal/CustomModal";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useState } from "react";
import ForgetPassword from "./ForgetPassword";

type ChangePasswordModalProps = {
  open: boolean;
  onCancel: () => void;
};

const inputStyle = {
  width: "300px",
  borderColor: "#e2b482",
  borderRadius: "10px",
};

const ChangePassword = ({ open, onCancel }: ChangePasswordModalProps) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const openChangePasswordModal = () => {
    setIsModalVisible(true); // Open the modal
  };

  const closeChangePasswordModal = () => {
    setIsModalVisible(false); // Close the modal
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit: SubmitHandler<any> = (data) => {
    console.log(data);
    onCancel();
  };

  const handleMouseDown = () => {
    setIsActive(true);
  };

  const handleMouseUp = () => {
    setIsActive(false);
  };

  const handleForgetPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    openChangePasswordModal(); // Open the "Forgot Password" modal
  };

  return (
    <div>
      <CustomModal
        title="Change Password"
        open={open} // Use 'open' here
        onCancel={onCancel}
        footer={false}
        width={400}
        centered
      >
        <div className="text-center mb-4">
          <p>Your password must be 8-10 characters long.</p>
        </div>

        <BZForm onSubmit={onSubmit}>
          {/* Old Password */}
          <div className="relative mb-4">
            <BZInput
              style={inputStyle}
              name="oldPassword"
              label="old Password"
              type={passwordVisible ? "text" : "password"}
            />
            <span
              className="absolute right-3 top-8 cursor-pointer text-lg"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>

          {/* New Password */}
          <div className="relative mb-4">
            <BZInput
              style={inputStyle}
              name="newPassword"
              label="new Password"
              type={passwordVisible ? "text" : "password"}
            />
            <span
              className="absolute right-3 top-8 cursor-pointer text-lg"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="relative mb-2">
            <BZInput
              style={inputStyle}
              name="confirmPassword"
              label="again new Password"
              type={passwordVisible ? "text" : "password"}
            />
            <span
              className="absolute right-3 top-8 cursor-pointer text-lg"
              onClick={togglePasswordVisibility}
            >
              {passwordVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>

          {/* Forget Password Link */}
          <div className="mb-5">
            <button
              className="cursor-pointer"
              onClick={handleForgetPasswordClick} // Prevent form submission
            >
              <span className="text-red-500">Forgot password?</span>
            </button>
          </div>

          <div className="flex justify-between mt-4">
            <Button
              onClick={onCancel}
              style={{
                marginRight: "8px",
                borderColor: isActive ? "#d49256" : "#e2b482", // Change the border color on click
                backgroundColor: "#fff", // Keep the background white
                color: "#d49256", // Button text color
              }}
              onMouseDown={handleMouseDown} // Trigger active state on mouse down
              onMouseUp={handleMouseUp} // Reset on mouse up
              onMouseLeave={() => setIsActive(false)} // Reset if mouse leaves the button
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "#d49256",
                borderColor: "#d49256",
              }}
            >
              Update Password
            </Button>
          </div>
        </BZForm>
      </CustomModal>

      {/* Render the ChangePasswordModal when the modal is visible */}
      <ForgetPassword
        open={isModalVisible}
        onCancel={closeChangePasswordModal}
      />
    </div>
  );
};

export default ChangePassword;
