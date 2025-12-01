import React, { useState } from "react";
import { Resume } from "../types/resume";

export default function ResumeCard({
  resume,
  onPrint,
  onDelete
}: {
  resume: Resume;
  onPrint?: (resume: Resume) => void;
  onDelete?: (id: string) => void;
}) {

  // ⭐ NEW: Template selection state
  const [template, setTemplate] = useState("premium");

  // ⭐ UPDATED PRINT FUNCTION
  function handlePrint() {
    localStorage.setItem("resumeToPrint", JSON.stringify(resume));
    localStorage.setItem("template", template); // ← save template choice
    window.open("/print", "_blank");
  }

  // Download JSON
  function handleDownload() {
    const content = JSON.stringify(resume, null, 2);
    const blob = new Blob([content], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${resume.personalInfo.fullName.replace(/\s+/g, "_")}_resume.json`;
    a.click();
  }

  return (
    <div>
      <h2 style={{ margin: 0 }}>{resume.personalInfo.fullName}</h2>
      <small>
        {resume.personalInfo.email} • {resume.personalInfo.phone} •{" "}
        {resume.personalInfo.location}
      </small>

      <p style={{ marginTop: 6 }}>{resume.personalInfo.summary}</p>

      <div>
        <strong>Skills:</strong> {resume.skills.join(", ")}
      </div>

      {/* ⭐ NEW TEMPLATE SELECTOR DROPDOWN */}
      <div className="form-row" style={{ marginTop: "10px" }}>
        <label style={{ marginRight: "10px" }}>Select Template:</label>
        <select
          className="input"
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          style={{ width: "180px", padding: "6px" }}
        >
          <option value="premium">Premium Sidebar (Blue)</option>
          <option value="modern">Modern Clean (White)</option>
        </select>
      </div>

      {/* ACTION BUTTONS */}
      <div style={{ marginTop: "10px" }}>
        <button className="btn" onClick={handlePrint}>
          Print / PDF
        </button>

        <button
          className="btn secondary"
          style={{ marginLeft: "10px" }}
          onClick={handleDownload}
        >
          Download JSON
        </button>

        {onDelete && (
          <button
            className="btn"
            style={{ marginLeft: "10px", background: "crimson" }}
            onClick={() => onDelete(resume.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
