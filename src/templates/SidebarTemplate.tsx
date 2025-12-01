import React from "react";
import { Resume } from "../types/resume";

export default function SidebarTemplate({ resume }: { resume: Resume }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        maxWidth: "900px",
        margin: "0 auto",
        minHeight: "100vh",
        fontFamily: "Arial",
        background: "white"
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        style={{
          background: "linear-gradient(180deg, #1e3a8a, #2563eb)",
          color: "white",
          padding: "30px",
        }}
      >
        <h2 style={{ fontSize: "26px", marginTop: 0 }}>
          {resume.personalInfo.fullName}
        </h2>

        <p style={{ margin: "4px 0" }}>{resume.personalInfo.email}</p>
        <p style={{ margin: "4px 0" }}>{resume.personalInfo.phone}</p>
        <p style={{ margin: "4px 0" }}>{resume.personalInfo.location}</p>

        {/* SKILLS */}
        <h3 style={{ marginTop: "30px", borderBottom: "1px solid #fff3", paddingBottom: "8px" }}>
          Skills
        </h3>
        <ul style={{ paddingLeft: "18px" }}>
          {resume.skills.map((skill, i) => (
            <li key={i} style={{ marginBottom: "6px" }}>
              {skill}
            </li>
          ))}
        </ul>

        {/* EDUCATION */}
        <h3 style={{ marginTop: "30px", borderBottom: "1px solid #fff3", paddingBottom: "8px" }}>
          Education
        </h3>
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: "12px" }}>
            <strong>{edu.degree}</strong>
            <p style={{ margin: 0 }}>{edu.institution}</p>
            <small>{edu.graduationDate}</small>
          </div>
        ))}
      </div>

      {/* RIGHT MAIN CONTENT */}
      <div style={{ padding: "40px" }}>
        {/* SUMMARY */}
        <h2 style={{ color: "#1e3a8a", marginTop: 0 }}>Profile Summary</h2>
        <p>{resume.personalInfo.summary}</p>

        {/* EXPERIENCE */}
        <h2 style={{ color: "#1e3a8a", marginTop: "20px" }}>Experience</h2>
        {resume.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: "16px" }}>
            <h3 style={{ marginBottom: 2 }}>{exp.position} @ {exp.company}</h3>
            <small style={{ color: "#555" }}>
              {exp.startDate} → {exp.endDate}
            </small>
            <p style={{ marginTop: "6px" }}>{exp.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
