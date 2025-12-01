import React, { useEffect, useState } from "react";
import { Resume } from "../types/resume";
import PremiumSidebarTemplate from "../templates/PremiumSidebarTemplate";
import ModernTemplate from "../templates/ModernTemplate";

export default function PrintResume() {
  const [resume, setResume] = useState<Resume | null>(null);
  const [template, setTemplate] = useState("premium");

  useEffect(() => {
    const data = localStorage.getItem("resumeToPrint");
    const t = localStorage.getItem("template") || "premium";
    setTemplate(t);

    if (data) {
      setResume(JSON.parse(data));
      setTimeout(() => window.print(), 500);
    }
  }, []);

  if (!resume) return <p>Loading...</p>;

  return (
    <>
      {template === "premium" ? (
        <PremiumSidebarTemplate resume={resume} />
      ) : (
        <ModernTemplate resume={resume} />
      )}
    </>
  );
}
