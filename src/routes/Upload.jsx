import React from "react";
import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import FileUpload from "../components/FileUpload.jsx";

export default function Upload() {
  const { user } = useAuth();

  const handleUpload = (file) => {
    console.log("Uploaded file:", file);
    alert(`File uploaded successfully: ${file.name}`);
  };

  /* ---------- Inline Styles ---------- */
  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(120deg, #f8fbff 0%, #eef4f7 100%)",
    color: "#182133",
  };

  const mainStyle = {
    display: "flex",
    flex: 1,
    padding: "28px 36px",
    gap: "24px",
  };

  const contentStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  };

  const headingStyle = {
    fontSize: "1.9rem",
    fontWeight: "800",
    marginBottom: "16px",
    color: "#2076d4",
    letterSpacing: "0.2px",
  };

  const uploadContainerStyle = {
    padding: "28px",
    borderRadius: "20px",
    backgroundColor: "#ffffff",
    boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
    transition: "box-shadow 0.3s ease",
  };

  return (
    <div style={wrapperStyle}>
      <Navbar />
      <div style={mainStyle}>
        <Sidebar role={user?.role} />
        <main style={contentStyle}>
          <div
            style={uploadContainerStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 12px 40px rgba(32,118,212,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.boxShadow =
                "0 8px 30px rgba(0,0,0,0.08)")
            }
          >
            <h1 style={headingStyle}>Upload X-ray Scan 🩻</h1>
            <FileUpload onUpload={handleUpload} />
          </div>
        </main>
      </div>
    </div>
  );
}
