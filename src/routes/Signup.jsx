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

  /* ---------- Inline CSS ---------- */
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #2076d4 0%, #6fa9f9 100%)",
    padding: "20px",
    fontFamily: "'Inter', sans-serif",
  };

  const projectTitleStyle = {
    fontSize: "2.5rem",
    fontWeight: "900",
    color: "#ffffff",
    marginBottom: "25px",
    textShadow: "0 4px 12px rgba(0,0,0,0.3)",
    letterSpacing: "1px",
  };

  const formStyle = {
    width: "100%",
    maxWidth: "440px",
    padding: "36px",
    borderRadius: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  };

  const headingStyle = {
    textAlign: "center",
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#182133",
    marginBottom: "5px",
  };

  const subHeadingStyle = {
    textAlign: "center",
    fontSize: "0.95rem",
    color: "#6c7a91",
    marginBottom: "15px",
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1.5px solid #cbd5e1",
    outline: "none",
    fontSize: "1rem",
    color: "#182133",
    transition: "all 0.2s ease",
  };

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #2076d4, #185bb0)",
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "1rem",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 6px 16px rgba(32, 118, 212, 0.35)",
    transition: "all 0.3s ease",
  };

  const buttonHoverStyle = {
    background: "linear-gradient(135deg, #185bb0, #0f3d7a)",
    transform: "translateY(-2px)",
  };

  const errorStyle = {
    borderRadius: "12px",
    border: "1px solid #f35260",
    backgroundColor: "#ffe5e7",
    color: "#d92b3a",
    padding: "12px",
    fontSize: "0.95rem",
    textAlign: "center",
    fontWeight: "500",
  };

  const linkStyle = {
    color: "#2076d4",
    textDecoration: "none",
    fontWeight: "600",
  };

  const signupTextStyle = {
    textAlign: "center",
    color: "#555",
    fontSize: "0.95rem",
    marginTop: "10px",
  };

  return (
    <div style={containerStyle}>
      {/* 🔥 Project Title */}
      <h1 style={projectTitleStyle}>BoneInsight</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Create an Account</h2>
        <p style={subHeadingStyle}>Join BoneInsight and get started</p>

        {error && <div style={errorStyle}>{error}</div>}

        <input
          type="text"
          placeholder="👤 Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="email"
          placeholder="📧 Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />

        <input
          type="password"
          placeholder="🔒 Password"
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
          onMouseEnter={(e) => Object.assign(e.target.style, buttonStyle, buttonHoverStyle)}
          onMouseLeave={(e) => Object.assign(e.target.style, buttonStyle)}
        >
          Signup
        </button>

        <p style={signupTextStyle}>
          Already have an account?{" "}
          <a href="/" style={linkStyle}>
            Log in here
          </a>
        </p>
      </form>
    </div>
  );
}
