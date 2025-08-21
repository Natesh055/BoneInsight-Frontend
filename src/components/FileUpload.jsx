import React, { useState, useRef } from "react";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef();

  const containerStyle = {
    border: `2px dashed ${dragOver ? "#2076d4" : "#c6d2e0"}`,
    borderRadius: "12px",
    padding: "32px",
    textAlign: "center",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: dragOver ? "#f0f7fd" : "#f8fbfd",
  };

  const buttonStyle = {
    marginTop: "12px",
    padding: "8px 20px",
    backgroundColor: "#2076d4",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return;
    onUpload(file);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div
        style={containerStyle}
        onClick={() => fileInputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
      >
        {file ? (
          <p>{file.name}</p>
        ) : (
          <p>Drag & drop your X-ray here, or click to select a file</p>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </div>
      <button type="submit" style={buttonStyle} disabled={!file}>
        Upload
      </button>
    </form>
  );
}
