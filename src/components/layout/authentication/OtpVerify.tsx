import { Button } from "antd";
import OtpInput from "react-otp-input"; // Import react-otp-input
import { useState } from "react"; // Import useState
import otpLogo from "../../../assets/pana.png";

const OtpVerify = () => {
  const [otp, setOtp] = useState(""); // State to store OTP input

  const onSubmit = () => {
    console.log("OTP Submitted: ", otp);
  };

  const handleResend = () => {
    console.log("Resend OTP");
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

  const resendStyle = {
    marginTop: "20px",
    fontSize: "14px",
    color: "#0066CC",
    cursor: "pointer",
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
            src={otpLogo || "/placeholder.svg"}
            alt="Meal Deal Logo"
            style={{ width: "350px", marginBottom: "40px" }}
          />
        </div>

        {/* Right Side: Form */}
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
              fontSize: "25px",
              fontWeight: 400,
              color: "#333",
              marginBottom: "32px",
            }}
          >
            OTP Verification
          </h3>

          {/* OTP Input */}
          <div>
            <OtpInput
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

          {/* Submit Button */}
          <Button type="primary" onClick={onSubmit} style={buttonStyle}>
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OtpVerify;
