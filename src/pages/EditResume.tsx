import React, { useEffect, useState } from "react";
import { Resume } from "../types/resume";
import { resumeApi } from "../services/api";
import ResumeForm from "../components/ResumeForm";

export default function EditResume({ id, onSaved }: { id: string; onSaved?: (r: Resume) => void }) {
  const [resume, setResume] = useState<Resume | null>(null);

  useEffect(() => {
    resumeApi.getById(id).then(setResume).catch(console.error);
  }, [id]);

  async function handleSave(data: Partial<Resume>) {
    if (!resume) return;
    try {
      const updated = await resumeApi.update(resume.id, data);
      if (onSaved) onSaved(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to save");
    }
  }

  if (!resume) return <div>Loading...</div>;

  return (
    <div className="card">
      <h3>Edit Resume</h3>
      <ResumeForm initial={resume} onSubmit={handleSave} />
    </div>
  );
}
