import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import FileUpload from "../components/FileUpload.jsx";

export default function Upload() {
  const { user } = useAuth();

  const handleUpload = (file) => {
    alert(`File ready to upload: ${file.name}`);
    // TODO: connect to backend API
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar role={user?.role} />
        <div className="p-6 flex-1">
          <h1 className="text-2xl font-bold mb-4">Upload X-ray Scan</h1>
          <FileUpload onUpload={handleUpload} />
        </div>
      </div>
    </div>
  );
}
