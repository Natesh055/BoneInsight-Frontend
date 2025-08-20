import React, { useState } from "react";

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  function handleChange(e) {
    setFile(e.target.files[0]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) return;
    onUpload(file);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="file" accept="image/*" onChange={handleChange} />
      <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
        Upload
      </button>
    </form>
  );
}
