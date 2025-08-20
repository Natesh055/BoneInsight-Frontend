import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Pages now live in routes/
import Login from "./routes/Login.jsx";
import Signup from "./routes/Signup.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import Upload from "./routes/Upload.jsx";
import Results from "./routes/Results.jsx";
import AdminPanel from "./routes/AdminPanel.jsx";

function App() {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute roles={["patient", "doctor", "admin"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <ProtectedRoute roles={["patient", "doctor"]}>
              <Upload />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            <ProtectedRoute roles={["patient", "doctor"]}>
              <Results />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute roles={["admin"]}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<div className="text-center mt-10">Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
