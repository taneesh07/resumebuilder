import { Resume } from "../types/resume";
import { v4 as uuidv4 } from "uuid";

const API_URL = "http://localhost:3001";

async function handleResponse(res: Response) {
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export const resumeApi = {
  async getAll(): Promise<Resume[]> {
    const res = await fetch(`${API_URL}/resumes`);
    return handleResponse(res);
  },

  async getById(id: string): Promise<Resume> {
    const res = await fetch(`${API_URL}/resumes/${id}`);
    return handleResponse(res);
  },

  async create(payload: Omit<Resume, "id" | "createdAt" | "updatedAt">): Promise<Resume> {
    const now = new Date().toISOString();
    const newResume: Resume = {
      ...payload,
      id: uuidv4(),
      createdAt: now,
      updatedAt: now
    };
    const res = await fetch(`${API_URL}/resumes`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newResume)
    });
    return handleResponse(res);
  },

  async update(id: string, payload: Partial<Resume>): Promise<Resume> {
    const updated = { ...payload, updatedAt: new Date().toISOString() };
    const res = await fetch(`${API_URL}/resumes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    });
    return handleResponse(res);
  },

  async remove(id: string): Promise<void> {
    await fetch(`${API_URL}/resumes/${id}`, { method: "DELETE" });
  }
};
