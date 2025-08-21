import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ name, email, password, role });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const containerStyle = {
    display: "flex",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f9fafb",
    padding: "16px",
  };

  const formStyle = {
    width: "100%",
    maxWidth: "440px",
    padding: "32px",
    borderRadius: "24px",
    backgroundColor: "#ffffff",
    boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    transition: "all 0.3s",
  };

  const headingStyle = {
    textAlign: "center",
    fontSize: "1.875rem",
    fontWeight: "800",
    color: "#182133",
  };

  const inputStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    border: "1.5px solid #c6d2e0",
    outline: "none",
    fontSize: "1rem",
    color: "#182133",
  };

  const inputFocusStyle = {
    borderColor: "#2076d4",
    boxShadow: "0 0 5px rgba(32, 118, 212, 0.2)",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: "#2076d4",
    color: "#fff",
    fontWeight: "600",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 4px 12px rgba(32, 118, 212, 0.3)",
    transition: "all 0.3s",
  };

  const buttonHoverStyle = {
    backgroundColor: "#1a5498",
    boxShadow: "0 6px 18px rgba(32, 118, 212, 0.3)",
  };

  const errorStyle = {
    borderRadius: "12px",
    border: "1px solid #f35260",
    backgroundColor: "#ffe5e7",
    color: "#f35260",
    padding: "10px",
    fontSize: "0.95rem",
    textAlign: "center",
  };

  const linkStyle = {
    color: "#2076d4",
    textDecoration: "none",
    fontWeight: "500",
  };

  return (
    <div style={containerStyle}>
      <form
        onSubmit={handleSubmit}
        style={formStyle}
        onFocus={(e) => (e.target.style = { ...inputStyle, ...inputFocusStyle })}
        onBlur={(e) => (e.target.style = inputStyle)}
      >
        <h1 style={headingStyle}>Create an Account</h1>

        {error && <div style={errorStyle}>{error}</div>}

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
          required
        />

        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={inputStyle}
        >
          <option value="patient">Patient</option>
          <option value="doctor">Doctor</option>
        </select>

        <button
          type="submit"
          style={buttonStyle}
          onMouseEnter={(e) => Object.assign(e.target.style, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Signup
        </button>

        <p style={{ textAlign: "center", color: "#555", fontSize: "0.9rem" }}>
          Already have an account?{" "}
          <a href="/" style={linkStyle}>
            Log in here
          </a>
        </p>
      </form>
    </div>
  );
}
