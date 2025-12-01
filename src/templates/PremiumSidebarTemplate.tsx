import React from "react";
import { Resume } from "../types/resume";

// Simple Icons (no imports needed)
const icon = {
  phone: "📞",
  email: "✉️",
  location: "📍"
};

export default function PremiumSidebarTemplate({ resume }: { resume: Resume }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "280px 1fr",
        maxWidth: "950px",
        margin: "0 auto",
        minHeight: "100vh",
        background: "white",
        fontFamily: "Arial",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div
        style={{
          background: "#0B4F9E",
          color: "white",
          padding: "30px",
          textAlign: "center",
        }}
      >
        {/* PROFILE PHOTO */}
        <img
          src={resume.personalInfo.photo || "https://via.placeholder.com/140"}
          alt="Profile"
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #fff",
            marginBottom: "20px",
          }}
        />

        {/* CONTACT INFORMATION WITH ICONS */}
        <h3 style={{ marginBottom: "10px", marginTop: "20px" }}>Contact</h3>
        <p>{icon.location} {resume.personalInfo.location}</p>
        <p>{icon.phone} {resume.personalInfo.phone}</p>
        <p>{icon.email} {resume.personalInfo.email}</p>

        {/* SKILLS WITH PROGRESS BARS */}
        <h3 style={{ marginTop: "30px", fontSize: "20px" }}>Skills</h3>
        {resume.skills.map((skill, index) => (
          <div key={index} style={{ marginBottom: "15px", textAlign: "left" }}>
            <strong>{skill}</strong>
            <div
              style={{
                background: "#ffffff40",
                height: "6px",
                borderRadius: "8px",
                marginTop: "6px",
              }}
            >
              <div
                style={{
                  width: `${60 + (index * 10)}%`, // dynamic bar length
                  height: "6px",
                  background: "#fff",
                  borderRadius: "8px",
                }}
              ></div>
            </div>
          </div>
        ))}

        {/* REFERENCES SECTION */}
        <h3 style={{ marginTop: "30px" }}>References</h3>
        <p>Available upon request</p>
      </div>

      {/* RIGHT CONTENT */}
      <div style={{ padding: "40px" }}>
        {/* NAME */}
        <h1 style={{ margin: 0, borderBottom: "3px solid #0B4F9E", paddingBottom: "10px" }}>
          {resume.personalInfo.fullName.toUpperCase()}
        </h1>

        {/* SUMMARY */}
        <h3 style={{ color: "#0B4F9E", marginTop: "10px" }}>Professional Summary</h3>
        <p>{resume.personalInfo.summary}</p>

        {/* EXPERIENCE */}
        <h2 style={{ marginTop: "30px", color: "#0B4F9E" }}>EXPERIENCE</h2>
        {resume.experience.map((exp) => (
          <div key={exp.id} style={{ marginBottom: "20px" }}>
            <h3>{exp.position} — {exp.company}</h3>
            <small style={{ color: "#555" }}>
              {exp.startDate} → {exp.endDate}
            </small>
            <p>{exp.description}</p>
          </div>
        ))}

        {/* EDUCATION */}
        <h2 style={{ marginTop: "30px", color: "#0B4F9E" }}>EDUCATION</h2>
        {resume.education.map((edu) => (
          <div key={edu.id} style={{ marginBottom: "20px" }}>
            <h3>{edu.degree} — {edu.institution}</h3>
            <small>{edu.graduationDate}</small>
            <p>{edu.field}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
