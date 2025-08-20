import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminPanel() {
  const { user } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar role={user?.role} />
        <div className="p-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <p>Manage users, monitor logs, and view system analytics here.</p>
        </div>
      </div>
    </div>
  );
}
