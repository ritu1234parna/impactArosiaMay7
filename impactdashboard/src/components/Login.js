import React, { useState } from "react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { useNavigate } from "react-router-dom"; // For redirection
import "./assets/Login.css";
import logo from "./assets/arosia logo.png";

const Login = () => {
  const { login } = useAuth(); // Get login function from AuthContext
  const navigate = useNavigate(); // Hook for navigation
  const [error, setError] = useState(""); // Error handling

  const handleLogin = (e) => {
    e.preventDefault();
    const dummyEmail = "adminarosia@gmail.com";
    const dummyPassword = "admin";
    const email = e.target.email.value;
    const password = e.target.password.value;
    
    if (email === dummyEmail && password === dummyPassword) {
      login({ email }); // Store login globally
      navigate("/overview"); // Redirect after login
    } else {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Impact Dashboard" className="logo" />
          <h1 className="title">Impact Dashboard</h1>
          <h2 className="title">LOGIN</h2>
        </div>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="label">Email Address</label>
            <input type="email" name="email" className="input" placeholder="Email Address" />
          </div>
          <div className="mb-6">
            <label className="label">Password</label>
            <input type="password" name="password" className="input" placeholder="Password" />
          </div>
          {error && <p className="text-red-500">{error}</p>}
          <div className="forgot-password">Forgot your password?</div>
          <button type="submit" className="login-button">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
