import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  return (
    <div className="bg-gray-100 w-48 min-h-screen p-4">
      <ul className="space-y-2">
        <li><Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
        <li><Link to="/upload" className="hover:text-blue-600">Upload Scan</Link></li>
        <li><Link to="/results" className="hover:text-blue-600">Results</Link></li>
        {role === "admin" && <li><Link to="/admin" className="hover:text-blue-600">Admin Panel</Link></li>}
      </ul>
    </div>
  );
}
