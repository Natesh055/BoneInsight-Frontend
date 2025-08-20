import React from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, roles = [] }) {
  const { user, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/" />;
  if (roles.length && !roles.includes(user.role) && user.role !== "admin")
    return <div className="text-center mt-10 text-red-500">Forbidden</div>;
  return children;
}
