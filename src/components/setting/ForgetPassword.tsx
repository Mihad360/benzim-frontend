/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { CustomModal } from "../modal/CustomModal";
import BZForm from "../../forms/BZForm";
import BZInput from "../../forms/BZInput";
import { Button } from "antd";

type ChangePasswordModalProps = {
  open: boolean;
  onCancel: () => void;
};

const inputStyle = {
  width: "100%",
  borderColor: "#e2b482",
  borderRadius: "10px",
};

const ForgetPassword = ({ open, onCancel }: ChangePasswordModalProps) => {
  const [isActive, setIsActive] = useState(false);

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

  return (
    <CustomModal
      title="Forgot Password"
      open={open} // Use 'open' here
      onCancel={onCancel}
      footer={false}
      width={400}
      centered
    >
      <div className="text-center mb-4">
        <p>Please enter your email address to reset your password </p>
      </div>

      <BZForm onSubmit={onSubmit}>
        {/* Old Password */}
        <div className="relative mb-4">
          <BZInput style={inputStyle} name="email" label="Email" />
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
            Send OTP
          </Button>
        </div>
      </BZForm>
    </CustomModal>
  );
};

export default ForgetPassword;
