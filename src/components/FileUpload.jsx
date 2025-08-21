// src/components/FileUpload.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import axios from "axios";

export default function FileUpload({ onUpload }) {
  const { token } = useAuth();
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("xray", file);

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/xrays/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      onUpload(file); // callback after success
      setFile(null);
      alert("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Upload failed!");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "12px" }}
    >
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {error && <div style={{ color: "red" }}>{error}</div>}
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Upload X-ray"}
      </button>
    </form>
  );
}
