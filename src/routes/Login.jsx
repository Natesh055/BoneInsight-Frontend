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
    setError(""); // clear old error
    try {
      // 🔥 call backend login API
      const res = await axios.post("http://localhost:4000/api/auth/login", {
        email,
        password,
      });

      // 🔥 Save token & user
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // 🔥 Update global auth context
      setUser(res.data.user);

      // 🔥 Navigate to dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed!");
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h1 style={headingStyle}>Login to your Account</h1>

        {error && <div style={errorStyle}>{error}</div>}

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

        <button type="submit" style={buttonStyle}>
          Login
        </button>

        <p style={{ textAlign: "center", color: "#555", fontSize: "0.9rem" }}>
          Don’t have an account?{" "}
          <a href="/signup" style={linkStyle}>
            Sign up here
          </a>
        </p>
      </form>
    </div>
  );
}

/* ---------- STYLES ---------- */
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
  maxWidth: "420px",
  padding: "32px",
  borderRadius: "24px",
  backgroundColor: "#ffffff",
  boxShadow: "0 15px 30px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
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
