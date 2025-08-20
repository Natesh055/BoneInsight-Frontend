import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar role={user?.role} />
        <div className="p-6 flex-1">
          <h1 className="text-2xl font-bold">Welcome, {user?.name}</h1>
          <p className="mt-4">Your recent scans and analytics will appear here.</p>
        </div>
      </div>
    </div>
  );
}
