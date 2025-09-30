import { Button } from "antd";
import BZInput from "../../../forms/BZInput";
import BZForm from "../../../forms/BZForm";
import type { FieldValues } from "react-hook-form";
import forgetPassLogo from "../../../assets/Forgot password-rafiki 1.png";

const Forgetpassword = () => {
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
            src={forgetPassLogo || "/placeholder.svg"}
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
            Forget Password <br />
            <span className="text-sm">
              Please enter your email to reset your password
            </span>
          </h3>
          <BZForm onSubmit={onSubmit}>
            <BZInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              style={inputStyle}
            />
            <Button type="primary" htmlType="submit" style={buttonStyle}>
              Get OTP
            </Button>
          </BZForm>
        </div>
      </div>
    </div>
  );
};

export default Forgetpassword;
