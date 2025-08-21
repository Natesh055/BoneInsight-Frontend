import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

export default function Login() {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      setUser(res.data.user);
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div style={containerStyle}>
      {/* 🔥 Project Title */}
      <h1 style={projectTitleStyle}>BoneInsight</h1>

      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={headingStyle}>Welcome Back 👋</h2>
        <p style={subHeadingStyle}>Login to access your dashboard</p>

        {error && <div style={errorStyle}>{error}</div>}

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

        <button type="submit" style={buttonStyle}>
          Login
        </button>

        <p style={signupTextStyle}>
          Don’t have an account?{" "}
          <a href="/signup" style={linkStyle}>
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
}

/* ---------- Inline CSS ---------- */
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  background: "linear-gradient(135deg, #2076d4 0%, #6fa9f9 100%)",
  padding: "20px",
  fontFamily: "'Inter', sans-serif",
};

const projectTitleStyle = {
  fontSize: "2.5rem",
  fontWeight: "900",
  color: "#ffffff",
  marginBottom: "30px",
  textShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
  letterSpacing: "1px",
};

const formStyle = {
  width: "100%",
  maxWidth: "420px",
  padding: "40px",
  borderRadius: "20px",
  backgroundColor: "#ffffff",
  boxShadow: "0 12px 35px rgba(0,0,0,0.15)",
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const headingStyle = {
  textAlign: "center",
  fontSize: "1.7rem",
  fontWeight: "800",
  color: "#182133",
};

const subHeadingStyle = {
  textAlign: "center",
  fontSize: "1rem",
  color: "#6c7a91",
  marginBottom: "5px",
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
  color: "#fff",
  fontWeight: "700",
  fontSize: "1rem",
  border: "none",
  cursor: "pointer",
  boxShadow: "0 6px 16px rgba(32, 118, 212, 0.4)",
  transition: "all 0.3s ease",
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

const signupTextStyle = {
  textAlign: "center",
  color: "#555",
  fontSize: "0.95rem",
  marginTop: "8px",
};

const linkStyle = {
  color: "#2076d4",
  textDecoration: "none",
  fontWeight: "600",
};
