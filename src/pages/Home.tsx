import React, { useEffect, useState } from "react";
import { resumeApi } from "../services/api";
import { Resume } from "../types/resume";
import ResumeCard from "../components/ResumeCard";
import CreateResume from "./CreateResume";

export default function Home() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [showCreate, setShowCreate] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    try {
      const data = await resumeApi.getAll();
      setResumes(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this resume?")) return;
    await resumeApi.remove(id);
    setResumes((s) => s.filter((r) => r.id !== id));
  }

  return (
    <div className="container">
      <div className="header" style={{ marginBottom: 12 }}>
        <h1>Resume Builder</h1>
        <div>
          <button className="btn" onClick={() => setShowCreate((s) => !s)}>
            {showCreate ? "Close" : "Create New"}
          </button>
        </div>
      </div>

      {showCreate && (
        <div style={{ marginBottom: 12 }}>
          <CreateResume
            onCreated={(newResume) => {
              setResumes((s) => [newResume, ...s]);
              setShowCreate(false);
            }}
          />
        </div>
      )}

      <div>
        {resumes.length === 0 ? (
          <p>No resumes found. You can seed sample data using <code>npm run seed</code></p>
        ) : (
          resumes.map((r) => (
            <div key={r.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <ResumeCard resume={r} />
              <div style={{ marginLeft: 16 }}>
                <button className="btn secondary" onClick={() => navigator.clipboard.writeText(JSON.stringify(r, null, 2))}>Copy</button>
                <button className="btn" style={{ marginLeft: 8 }} onClick={() => handleDelete(r.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
