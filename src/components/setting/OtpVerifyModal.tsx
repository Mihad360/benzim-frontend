import { useState } from "react";
import { CustomModal } from "../modal/CustomModal";
import OTPInput from "react-otp-input";
import { Button } from "antd";

type ChangePasswordModalProps = {
  open: boolean;
  onCancel: () => void;
};

const OtpVerifyModal = ({ open, onCancel }: ChangePasswordModalProps) => {
  const [otp, setOtp] = useState(""); // State to store OTP input

  const onSubmit = () => {
    console.log("OTP Submitted: ", otp);
  };

  const handleResend = () => {
    console.log("Resend OTP");
  };

  const resendStyle = {
    marginTop: "20px",
    fontSize: "14px",
    color: "#0066CC",
    cursor: "pointer",
  };

  return (
    <CustomModal
      title="OTP Verification"
      open={open} // Use 'open' here
      onCancel={onCancel}
      footer={false}
      width={400}
      centered
    >
      <div className="text-center mb-4">
        <p>Please enter the OTP we have sent you in your email.</p>
      </div>

      {/* OTP Input */}
      <div>
        <OTPInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          inputStyle={{
            width: "40px",
            height: "50px",
            margin: "0 5px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            textAlign: "center",
          }}
          renderInput={(props) => <input {...props} />}
        />
      </div>
      {/* Resend OTP */}
      <div
        style={resendStyle}
        onClick={handleResend}
        className="flex justify-between px-3 mb-6"
      >
        Didn't get the code?{" "}
        <span style={{ textDecoration: "underline", color: "red" }}>
          Resend
        </span>
      </div>

      <Button
        type="primary"
        onClick={onSubmit}
        style={{
          backgroundColor: "#d49256",
          borderColor: "#d49256",
        }}
      >
        Verify
      </Button>
    </CustomModal>
  );
};

export default OtpVerifyModal;
