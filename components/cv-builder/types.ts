export interface BasicsData {
  fullName: string;
  headline: string;
  email: string;
  website: string;
  phone: string;
  location: string;
  avatar: string | null;
}

export interface SummaryData {
  summary: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  position: string;
  date: string;
  location: string;
  website: string;
  summary: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  date: string;
  location: string;
  gpa: string;
  summary: string;
}

export interface SkillItem {
  id: string;
  name: string;
  level: string;
  description: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  fluency: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
  summary: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  role: string;
  date: string;
  website: string;
  summary: string;
}

export interface CVData {
  basics: BasicsData;
  summary: SummaryData;
  experience: ExperienceItem[];
  education: EducationItem[];
  skills: SkillItem[];
  languages: LanguageItem[];
  certifications: CertificationItem[];
  projects: ProjectItem[];
}

export const initialCVData: CVData = {
  basics: {
    fullName: "Ankon Chowdhury",
    headline: "Full Stack Developer",
    email: "ankonchy1@gmail.com",
    website: "https://github.com | https://linkedin.com | https://ankonchowdhury.netlify.app/",
    phone: "8801850262127",
    location: "Dhaka, Bangladesh",
    avatar: null,
  },
  summary: {
    summary:
      "To work as a Full Stack Developer, utilizing my experience in developing, designing, and maintaining solutions to meet individual requirements. I aim to be part of a team of driven individuals committed to the company's success while demonstrating excellent time management and punctuality in achieving goals.",
  },
  experience: [
    {
      id: "exp-1",
      company: "Reddot Digital",
      position: "Software Engineer Intern",
      date: "March 2025 - July 2025",
      location: "Gulshan 1, Dhaka, Bangladesh",
      website: "",
      summary: "",
    },
  ],
  education: [
    {
      id: "edu-1",
      institution: "Daffodil International University",
      degree: "B.Sc",
      fieldOfStudy: "Software Engineering",
      date: "January 2019 - April 2023",
      location: "",
      gpa: "3.50",
      summary: "",
    },
  ],
  skills: [
    {
      id: "skill-1",
      name: "JavaScript",
      level: "Advanced",
      description: "",
    },
  ],
  languages: [
    {
      id: "lang-1",
      language: "English",
      fluency: "Professional Working",
    },
  ],
  certifications: [],
  projects: [],
};
