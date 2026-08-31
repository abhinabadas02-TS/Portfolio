// ─────────────────────────────────────────────────────────────
//  This is the ONLY source of truth the AI chatbot is allowed
//  to answer from. Keep it in sync with the resume / frontend.
//  Update this file whenever the resume changes.
// ─────────────────────────────────────────────────────────────

export const portfolioData = {
  name: "Abhinaba Das",
  title: "Cloud Engineer & Full Stack Developer",
  contact: {
    email: "abhinabadas02@gmail.com",
    phone: "+91 8910285278",
    linkedin: "linkedin.com/in/abhinaba-das",
    github: "github.com/abhinaba-das",
    location: "India",
  },
  summary:
    "Cloud Engineer at Wipro with hands-on experience managing Azure infrastructure and automating cloud workflows. Skilled in the MERN stack, real-time communication via Socket.io, and delivering secure, scalable web applications with integrated AI features.",
  skills: {
    "Cloud & DevOps": ["Microsoft Azure", "Azure Logic Apps", "Git", "Postman", "Vercel", "Render"],
    "Web Development": ["React.js", "Node.js", "Express.js", "Socket.io", "Tailwind CSS"],
    "Languages": ["JavaScript (ES6+)", "Java", "Python", "C"],
    "Databases": ["MongoDB", "SQL Schema Design", "Data Structures & Algorithms"],
  },
  experience: [
    {
      role: "Cloud Engineer",
      company: "Wipro",
      client: "Estee Lauder",
      period: "Sept 2025 — Present",
      type: "Full-Time",
      responsibilities: [
        "Orchestrate Azure cloud environments, performing VM SKU upgrades and OS migrations to maintain system availability.",
        "Designed and deployed automated monitoring alerts using Azure Logic Apps to optimize incident response.",
        "Resolve critical infrastructure bottlenecks including firewall configurations, disk alerts, and resource decommissioning.",
        "Execute SQL dataset migrations and manage schema-level access controls for secure data handling.",
      ],
    },
  ],
  projects: [
    {
      title: "Tutor Web Application",
      type: "Full Stack (MERN)",
      year: "2025",
      description:
        "A booking system with secure JWT authentication, Google API integration, and real-time scheduling. Integrated an AI Tutor Bot using the Gemini API and PayPal for seamless transaction processing.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API", "JWT", "PayPal"],
    },
    {
      title: "Real-Time Cricket Auction Platform",
      type: "Full Stack (MERN & Socket.io)",
      year: "2025",
      description:
        "A high-concurrency bidding platform using Socket.io for low-latency, real-time bid validation. Complex auction logic for synchronized timers and dynamic purse management across teams.",
      tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    },
  ],
  education: [
    {
      degree: "BCA (Bachelor of Computer Applications)",
      school: "Techno Main Saltlake",
      year: "2021 — 2024",
      grade: "8.1 CGPA",
    },
    {
      degree: "Higher Secondary (10+2)",
      school: "Patha Bhavan Merlin Park",
      year: "2021",
      grade: "77%",
    },
    {
      degree: "Secondary (10th)",
      school: "D.V. (Boys) E.M/CLW/CRJ",
      year: "2019",
      grade: "60%",
    },
  ],
  languagesSpoken: ["English", "Bengali", "Hindi"],
  achievements: [
    { title: "AWS Online Conference", year: "July 2024", desc: "Attendee — explored cloud services and architecture." },
    { title: "School District Cricket Winner", year: "2019", desc: "Won the district-level school cricket championship." },
  ],
  availability: "Open to full-time roles, freelance projects, and collaborations. Prefers remote or hybrid roles. Response time under 24 hours via the contact form.",
};

// ─────────────────────────────────────────────────────────────
//  Renders the data above into a compact text block that gets
//  injected into the AI's system prompt as its only knowledge.
// ─────────────────────────────────────────────────────────────
export function formatPortfolioContext() {
  const d = portfolioData;

  const skillsText = Object.entries(d.skills)
    .map(([cat, items]) => `  - ${cat}: ${items.join(", ")}`)
    .join("\n");

  const expText = d.experience
    .map(
      (e) =>
        `  - ${e.role} at ${e.company} (Client: ${e.client}), ${e.period}, ${e.type}\n` +
        e.responsibilities.map((r) => `      • ${r}`).join("\n")
    )
    .join("\n");

  const projText = d.projects
    .map(
      (p) =>
        `  - ${p.title} (${p.type}, ${p.year})\n      ${p.description}\n      Tech: ${p.tech.join(", ")}`
    )
    .join("\n");

  const eduText = d.education
    .map((e) => `  - ${e.degree}, ${e.school}, ${e.year} — ${e.grade}`)
    .join("\n");

  const achText = d.achievements
    .map((a) => `  - ${a.title} (${a.year}): ${a.desc}`)
    .join("\n");

  return `
NAME: ${d.name}
TITLE: ${d.title}
SUMMARY: ${d.summary}

CONTACT INFO:
  - Email: ${d.contact.email}
  - Phone: ${d.contact.phone}
  - LinkedIn: ${d.contact.linkedin}
  - GitHub: ${d.contact.github}
  - Location: ${d.contact.location}

AVAILABILITY: ${d.availability}

TECHNICAL SKILLS:
${skillsText}

PROFESSIONAL EXPERIENCE:
${expText}

PROJECTS:
${projText}

EDUCATION:
${eduText}

LANGUAGES SPOKEN: ${d.languagesSpoken.join(", ")}

ACHIEVEMENTS:
${achText}
`.trim();
}