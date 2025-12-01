export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  graduationDate: string;
}

export interface Resume {
  id: string;
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
    photo?: string;   // ⭐ ADDED THIS LINE (Fixes your error)
  };
  experience: Experience[];
  education: Education[];
  skills: string[];
  createdAt: string;
  updatedAt: string;
}
