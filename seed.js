import fs from "fs";
const OUT = "db.json";

async function run() {
  try {
    console.log("Fetching sample users...");
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();

    const resumes = users.map((u, idx) => ({
      id: `seed-${u.id}`,
      personalInfo: {
        fullName: u.name,
        email: u.email,
        phone: u.phone,
        location: `${u.address.city}, ${u.address.street}`,
        summary: `Experienced professional with interest in software and web development. (Sample entry #${idx + 1})`
      },
      experience: [
        {
          id: `exp-${u.id}-1`,
          company: "Sample Company",
          position: "Intern / Junior Dev",
          startDate: "2022-01-01",
          endDate: "2023-01-01",
          description: "Worked on sample tasks and gained experience."
        }
      ],
      education: [
        {
          id: `edu-${u.id}-1`,
          institution: "Sample University",
          degree: "B.Sc",
          field: "Computer Science",
          graduationDate: "2021"
        }
      ],
      skills: ["JavaScript", "HTML", "CSS"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }));

    fs.writeFileSync(OUT, JSON.stringify({ resumes }, null, 2));
    console.log(`Wrote ${resumes.length} sample resumes to ${OUT}`);
  } catch (err) {
    console.error("Seed failed:", err);
  }
}

run();
