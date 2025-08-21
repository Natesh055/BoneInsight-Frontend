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

  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(120deg, #f6faff 0%, #e3eaea 100%)",
    color: "#182133",
  };

  const mainStyle = {
    display: "flex",
    flex: 1,
    padding: "32px",
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  };

  const headingStyle = {
    fontSize: "1.8rem",
    fontWeight: "700",
    marginBottom: "16px",
    color: "#2076d4",
  };

  const uploadContainerStyle = {
    padding: "24px",
    borderRadius: "18px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 32px rgba(43, 83, 135, 0.13)",
  };

  return (
    <div style={wrapperStyle}>
      <Navbar />
      <div style={mainStyle}>
        <Sidebar role={user?.role} />
        <main style={contentStyle}>
          <div style={uploadContainerStyle}>
            <h1 style={headingStyle}>Upload X-ray Scan</h1>
            <FileUpload onUpload={handleUpload} />
          </div>
        </main>
      </div>
    </div>
  );
}
