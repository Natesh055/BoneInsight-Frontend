import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Results() {
  const { user } = useAuth();
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar role={user?.role} />
        <div className="p-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">Your Scan Results</h1>
          <p>Predictions, confidence scores, and doctor notes will be displayed here.</p>
        </div>
      </div>
    </div>
  );
}
