import React from "react";
import { resumeApi } from "../services/api";
import ResumeForm from "../components/ResumeForm";
import { Resume } from "../types/resume";

export default function CreateResume({ onCreated }: { onCreated?: (r: Resume) => void }) {
  async function handleSubmit(data: Omit<Resume, "id" | "createdAt" | "updatedAt">) {
    try {
      const created = await resumeApi.create(data);
      if (onCreated) onCreated(created);
    } catch (err) {
      alert("Failed to create resume");
      console.error(err);
    }
  }

  return (
    <div className="card">
      <h3>Create Resume</h3>
      <ResumeForm onSubmit={handleSubmit} />
    </div>
  );
}
