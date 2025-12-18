import { useState } from "react";
import { Button } from "antd";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import BZInput from "../../../forms/BZInput";
import BZForm from "../../../forms/BZForm";
import logo from "../../../assets/Logo.jpg";
import type { FieldValues } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../../services/redux/api/authApi";
import { setToLocalStorage } from "../../../utils/token/getFromLocalStorage";
import { toast } from "sonner";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    const res = await loginUser(userInfo);
    console.log(res);
    if (res) {
      setToLocalStorage("accessToken", res.data.data.accessToken);
      toast("Login successfull", { position: "top-right" });
      navigate("/dashboard");
    }
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

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev); // Toggle the state
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
            src={logo || "/placeholder.svg"}
            alt="Meal Deal Logo"
            style={{ width: "200px", marginBottom: "40px" }}
          />
          <h2
            style={{
              fontSize: "24px",
              fontWeight: 400,
              color: "#333",
              margin: 0,
            }}
          >
            Welcome back
          </h2>
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
              fontSize: "20px",
              fontWeight: 400,
              color: "#333",
              marginBottom: "32px",
            }}
          >
            Sign in to your account
          </h3>
          <BZForm onSubmit={onSubmit}>
            <BZInput
              name="email"
              label="Email"
              placeholder="Enter your email"
              style={inputStyle}
            />
            <div style={{ position: "relative" }}>
              <BZInput
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"} // Toggle between password and text
                placeholder="Enter your password"
                style={inputStyle}
              />
              <span
                onClick={handlePasswordToggle}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "70%",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? (
                  <EyeInvisibleOutlined
                    style={{ fontSize: "25px", color: "black" }}
                  />
                ) : (
                  <EyeOutlined style={{ fontSize: "25px", color: "black" }} />
                )}
              </span>
            </div>
            <div
              style={{
                textAlign: "right",
                marginBottom: "24px",
                marginTop: "8px",
              }}
            >
              <Link
                to="/auth/forget-password"
                style={{
                  fontSize: "13px",
                  color: "#ff4d4f",
                  textDecoration: "none",
                }}
              >
                Forget password?
              </Link>
            </div>
            <Button type="primary" htmlType="submit" style={buttonStyle}>
              Sign in
            </Button>
          </BZForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
