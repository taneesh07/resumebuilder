import React, { useState } from "react";
import { Resume } from "../types/resume";

type Props = {
  initial?: Partial<Resume>;
  onSubmit: (data: any) => void;
};

export default function ResumeForm({ initial, onSubmit }: Props) {
  const [fullName, setFullName] = useState(initial?.personalInfo?.fullName || "");
  const [email, setEmail] = useState(initial?.personalInfo?.email || "");
  const [phone, setPhone] = useState(initial?.personalInfo?.phone || "");
  const [location, setLocation] = useState(initial?.personalInfo?.location || "");
  const [summary, setSummary] = useState(initial?.personalInfo?.summary || "");
  const [photo, setPhoto] = useState(initial?.personalInfo?.photo || "");
  const [skills, setSkills] = useState((initial?.skills && initial.skills.join(", ")) || "");

  // ⭐ EDUCATION STATE
  const [education, setEducation] = useState(
    initial?.education || [
      {
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        field: "",
        graduationDate: ""
      }
    ]
  );

  // ⭐ Update a single education field
  function updateEducation(id: string, key: string, value: string) {
    setEducation((prev) =>
      prev.map((edu) =>
        edu.id === id ? { ...edu, [key]: value } : edu
      )
    );
  }

  // ⭐ Add new education block
  function addEducation() {
    setEducation((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        field: "",
        graduationDate: ""
      }
    ]);
  }

  // ⭐ Remove education block
  function removeEducation(id: string) {
    setEducation((prev) => prev.filter((edu) => edu.id !== id));
  }

  // ⭐ Submit form
  function submit(e: React.FormEvent) {
    e.preventDefault();

    const payload: Omit<Resume, "id" | "createdAt" | "updatedAt"> = {
      personalInfo: { fullName, email, phone, location, summary, photo },
      experience: initial?.experience || [],
      education, // <-- IMPORTANT: Save education array
      skills: skills.split(",").map(s => s.trim()).filter(Boolean)
    };

    onSubmit(payload);
  }

  return (
    <form onSubmit={submit}>
      {/* ---------------- PERSONAL INFO ---------------- */}
      <div className="form-row">
        <label>Full name</label>
        <input className="input" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
      </div>

      <div className="form-row">
        <label>Email</label>
        <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="form-row">
        <label>Phone</label>
        <input className="input" value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div className="form-row">
        <label>Location</label>
        <input className="input" value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className="form-row">
        <label>Photo URL</label>
        <input
          className="input"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="https://example.com/photo.jpg"
        />
      </div>

      <div className="form-row">
        <label>Summary</label>
        <textarea className="input" value={summary} onChange={(e) => setSummary(e.target.value)} />
      </div>

      <div className="form-row">
        <label>Skills (comma separated)</label>
        <input className="input" value={skills} onChange={(e) => setSkills(e.target.value)} />
      </div>

      {/* ---------------- EDUCATION SECTION ---------------- */}
      <h3 style={{ marginTop: "20px" }}>Education</h3>

      {education.map((edu) => (
        <div
          key={edu.id}
          className="card"
          style={{ padding: "15px", marginBottom: "12px" }}
        >
          <div className="form-row">
            <label>Institution</label>
            <input
              className="input"
              value={edu.institution}
              onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Degree</label>
            <input
              className="input"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, "degree", e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Field of Study</label>
            <input
              className="input"
              value={edu.field}
              onChange={(e) => updateEducation(edu.id, "field", e.target.value)}
            />
          </div>

          <div className="form-row">
            <label>Graduation Year</label>
            <input
              className="input"
              value={edu.graduationDate}
              onChange={(e) => updateEducation(edu.id, "graduationDate", e.target.value)}
            />
          </div>

          {education.length > 1 && (
            <button
              type="button"
              className="btn"
              style={{ marginTop: "6px", background: "crimson" }}
              onClick={() => removeEducation(edu.id)}
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" className="btn secondary" onClick={addEducation}>
        + Add Education
      </button>

      {/* ---------------- SUBMIT BUTTON ---------------- */}
      <div style={{ marginTop: "20px" }}>
        <button className="btn" type="submit">Save</button>
      </div>
    </form>
  );
}
