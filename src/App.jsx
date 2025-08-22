import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

import "./App.css"; // Import the CSS

// Pages
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Upload from "./routes/Upload.jsx";
// import Results from "./routes/Results.jsx";
import AdminPanel from "./routes/AdminPanel.jsx";
import XrayHistory from "./routes/XrayHistory.jsx"; // ✅ new page

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="status-message">Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <div className="page-container">
              <Login
                buttonClass="btn"
                formClass="form"
                inputClass="input-field"
                errorClass="error"
              />
            </div>
          }
        />
        <Route
          path="/signup"
          element={
            <div className="page-container">
              <Signup
                buttonClass="btn"
                formClass="form"
                inputClass="input-field"
                errorClass="error"
              />
            </div>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["patient", "doctor", "admin"]}>
              <div className="page-container">
                <Dashboard cardClass="card" />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute roles={["patient", "doctor"]}>
              <div className="page-container">
                <Upload
                  buttonClass="btn"
                  formClass="form"
                  inputClass="input-field"
                  cardClass="card"
                />
              </div>
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/results"
          element={
            <ProtectedRoute roles={["patient", "doctor"]}>
              <div className="page-container">
                <Results cardClass="card" />
              </div>
            </ProtectedRoute>
          }
        /> */}
        {/* ✅ X-ray History for patients */}
        <Route
          path="/history"
          element={
            <ProtectedRoute roles={["patient"]}>
              <div className="page-container">
                <XrayHistory cardClass="card" />
              </div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <div className="page-container">
                <AdminPanel cardClass="card" />
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch-all Route */}
        <Route
          path="*"
          element={<div className="status-message">Page Not Found</div>}
        />
      </Routes>
    </Router>
  );
}

export default App;
