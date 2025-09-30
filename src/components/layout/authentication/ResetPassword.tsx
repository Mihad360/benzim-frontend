import { useState } from "react";
import { Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import BZInput from "../../../forms/BZInput";
import BZForm from "../../../forms/BZForm";
import resetPassLogo from "../../../assets/Reset password-rafiki 1.png";
import type { FieldValues } from "react-hook-form";

const ResetPassword = () => {
  // Separate state for showing old password and new password
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  const inputStyle = {
    width: "500px",
    borderColor: "#e2b482",
    borderRadius: "15px",
    padding: "10px 12px",
  };

  const buttonStyle = {
    backgroundColor: "#CC7108",
    color: "white",
    borderRadius: "15px",
    width: "100%",
    height: "44px",
    fontSize: "16px",
    fontWeight: 500,
  };

  // Toggle function for old password
  const handleOldPasswordToggle = () => {
    setShowOldPassword((prev) => !prev);
  };

  // Toggle function for new password
  const handleNewPasswordToggle = () => {
    setShowNewPassword((prev) => !prev);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "80px 60px",
            borderRight: "1px solid #d9d9d9",
          }}
        >
          <img
            src={resetPassLogo || "/placeholder.svg"}
            alt="Meal Deal Logo"
            style={{ width: "400px", marginBottom: "40px" }}
          />
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "60px 80px",
            minWidth: "400px",
          }}
        >
          <h3
            style={{
              fontSize: "20px",
              fontWeight: 400,
              color: "#333",
              marginBottom: "32px",
            }}
          >
            Reset Password
          </h3>
          <BZForm onSubmit={onSubmit}>
            {/* Old Password Input */}
            <div style={{ position: "relative" }}>
              <BZInput
                name="newPassword"
                label="New Password"
                type={showOldPassword ? "text" : "password"} // Toggle visibility for old password
                placeholder="Enter your New Password"
                style={inputStyle}
              />
              <span
                onClick={handleOldPasswordToggle}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "70%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showOldPassword ? (
                  <EyeInvisibleOutlined
                    style={{ fontSize: "25px", color: "black" }}
                  />
                ) : (
                  <EyeOutlined style={{ fontSize: "25px", color: "black" }} />
                )}
              </span>
            </div>

            {/* New Password Input */}
            <div style={{ position: "relative" }}>
              <BZInput
                name="confirmPassword"
                label="Confirm Password"
                type={showNewPassword ? "text" : "password"} // Toggle visibility for new password
                placeholder="Enter your Confirm Password"
                style={inputStyle}
              />
              <span
                onClick={handleNewPasswordToggle}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "70%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showNewPassword ? (
                  <EyeInvisibleOutlined
                    style={{ fontSize: "25px", color: "black" }}
                  />
                ) : (
                  <EyeOutlined style={{ fontSize: "25px", color: "black" }} />
                )}
              </span>
            </div>

            <Button type="primary" htmlType="submit" style={buttonStyle}>
              Reset
            </Button>
          </BZForm>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
