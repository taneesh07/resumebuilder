import React from "react";
import { Resume } from "../types/resume";

export default function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px",
        background: "white",
        fontFamily: "Arial",
        color: "#111",
        lineHeight: 1.6
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: "3px solid #2563eb", paddingBottom: "10px", marginBottom: "20px" }}>
        <h1 style={{ fontSize: "32px", margin: "0", fontWeight: "bold" }}>
          {resume.personalInfo.fullName}
        </h1>
        <p style={{ margin: 0, color: "#444" }}>
          {resume.personalInfo.email} • {resume.personalInfo.phone} • {resume.personalInfo.location}
        </p>
      </div>

      {/* Summary */}
      <h2 style={{ color: "#2563eb", marginBottom: "6px" }}>Professional Summary</h2>
      <p>{resume.personalInfo.summary}</p>

      {/* Skills */}
      <h2 style={{ color: "#2563eb", marginTop: "20px", marginBottom: "6px" }}>Skills</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
        {resume.skills.map((s, i) => (
          <span
            key={i}
            style={{
              padding: "6px 12px",
              background: "#eef2ff",
              borderRadius: "6px",
              fontSize: "14px",
              color: "#1e40af"
            }}
          >
            {s}
          </span>
        ))}
      </div>

      {/* Experience */}
      <h2 style={{ color: "#2563eb", marginTop: "20px", marginBottom: "6px" }}>Experience</h2>
      {resume.experience.map((exp) => (
        <div key={exp.id} style={{ marginBottom: "12px" }}>
          <h3 style={{ margin: 0 }}>{exp.position} — {exp.company}</h3>
          <small style={{ color: "#555" }}>{exp.startDate} → {exp.endDate}</small>
          <p style={{ marginTop: "6px" }}>{exp.description}</p>
        </div>
      ))}

      {/* Education */}
      <h2 style={{ color: "#2563eb", marginTop: "20px", marginBottom: "6px" }}>Education</h2>
      {resume.education.map((edu) => (
        <div key={edu.id} style={{ marginBottom: "12px" }}>
          <h3 style={{ margin: 0 }}>{edu.degree} — {edu.institution}</h3>
          <small style={{ color: "#555" }}>{edu.graduationDate}</small>
          <p style={{ marginTop: "6px" }}>{edu.field}</p>
        </div>
      ))}
    </div>
  );
}
