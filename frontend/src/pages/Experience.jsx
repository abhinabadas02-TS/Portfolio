const experiences = [
  {
    id: "01",
    role: "Cloud Engineer",
    company: "Wipro",
    client: "Client: Estee Lauder",
    period: "Sept 2025 — Present",
    type: "Full-Time",
    points: [
      "Orchestrate Azure cloud environments, performing VM SKU upgrades and OS migrations to maintain system availability.",
      "Designed and deployed automated monitoring alerts using Azure Logic Apps to optimize incident response.",
      "Resolve critical infrastructure bottlenecks including firewall configurations, disk alerts, and resource decommissioning.",
      "Execute SQL dataset migrations and manage schema-level access controls for secure data handling.",
    ],
    tech: ["Microsoft Azure", "Azure Logic Apps", "SQL", "Git", "Postman"],
    color: "#00e5ff",
  },
];

const education = [
  {
    id: "01",
    degree: "BCA — Bachelor of Computer Applications",
    school: "Techno Main Saltlake",
    year: "2021 — 2024",
    grade: "8.1 CGPA",
    color: "#00e5ff",
  },
  {
    id: "02",
    degree: "Higher Secondary (10+2)",
    school: "Patha Bhavan Merlin Park",
    year: "2021",
    grade: "77%",
    color: "#ff2d78",
  },
  {
    id: "03",
    degree: "Secondary (10th)",
    school: "D.V. (Boys) E.M/CLW/CRJ",
    year: "2019",
    grade: "60%",
    color: "#ffd700",
  },
];

const achievements = [
  { icon: "☁", title: "AWS Online Conference", year: "July 2024", desc: "Attendee at AWS Online Conference, exploring cloud services and architecture." },
  { icon: "🏏", title: "Cricket District Winner", year: "2019", desc: "School District Cricket Winner — teamwork and competitive spirit." },
];

export default function Experience() {
  return (
    <div className="page" style={{ padding: "60px clamp(20px,8vw,120px) 100px" }}>
      {/* HEADER */}
      <div style={{ marginBottom: "80px" }}>
        <div className="section-tag animate-in">Career Path</div>
        <h1 className="section-title animate-in delay-1">
          WORK &<br />
          <span style={{ color: "var(--cyan)" }}>EDUCATION</span>
        </h1>
      </div>

      {/* EXPERIENCE */}
      <div style={{ marginBottom: "80px" }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          color: "var(--magenta)",
          textTransform: "uppercase",
          marginBottom: "32px",
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <span style={{ width: "20px", height: "1px", background: "var(--magenta)", display: "inline-block" }} />
          Professional Experience
        </div>

        {experiences.map((exp, i) => (
          <div key={exp.id} className="animate-in cyber-card" style={{
            padding: "40px",
            animationDelay: `${i * 0.15}s`,
            marginBottom: "2px",
          }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "32px",
            }}>
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--magenta)",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                }}>
                  {exp.client} · {exp.type}
                </div>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "var(--white)",
                  letterSpacing: "0.05em",
                  lineHeight: 1,
                }}>{exp.role}</h2>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "1.5rem",
                  color: "var(--cyan)",
                  letterSpacing: "0.08em",
                  marginTop: "4px",
                }}>{exp.company}</div>
              </div>
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
                gap: "8px",
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--cyan)",
                  border: "1px solid rgba(0,229,255,0.2)",
                  padding: "6px 14px",
                  background: "rgba(0,229,255,0.05)",
                }}>● ACTIVE</span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--gray)",
                }}>{exp.period}</span>
              </div>
            </div>

            {/* RESPONSIBILITIES */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: "var(--gray)",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}>Responsibilities</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {exp.points.map((pt, j) => (
                  <div key={j} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span style={{
                      color: "var(--cyan)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      marginTop: "2px",
                      minWidth: "12px",
                    }}>›</span>
                    <p style={{ color: "var(--gray)", fontSize: "0.9rem", lineHeight: 1.75 }}>{pt}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* TECH STACK */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {exp.tech.map(t => (
                <span key={t} className="skill-tag">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* EDUCATION */}
      <div style={{ marginBottom: "80px" }}>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          color: "var(--magenta)",
          textTransform: "uppercase",
          marginBottom: "32px",
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <span style={{ width: "20px", height: "1px", background: "var(--magenta)", display: "inline-block" }} />
          Education
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2px" }}>
          {education.map((edu, i) => (
            <div key={edu.id} className="cyber-card animate-in" style={{
              padding: "28px",
              animationDelay: `${i * 0.1}s`,
            }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "3rem",
                color: edu.color,
                opacity: 0.15,
                lineHeight: 1,
                marginBottom: "16px",
              }}>{edu.id}</div>

              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--gray)",
                letterSpacing: "0.1em",
                marginBottom: "6px",
              }}>{edu.year}</div>

              <h3 style={{
                fontFamily: "var(--font-body)",
                fontWeight: 500,
                fontSize: "0.95rem",
                color: "var(--white)",
                marginBottom: "6px",
                lineHeight: 1.4,
              }}>{edu.degree}</h3>

              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: edu.color,
                marginBottom: "4px",
              }}>{edu.school}</div>

              <div style={{
                display: "inline-block",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                color: edu.color,
                border: `1px solid ${edu.color}30`,
                padding: "3px 10px",
                background: `${edu.color}08`,
                marginTop: "8px",
              }}>{edu.grade}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ACHIEVEMENTS */}
      <div>
        <div style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          color: "var(--magenta)",
          textTransform: "uppercase",
          marginBottom: "32px",
          display: "flex", alignItems: "center", gap: "12px",
        }}>
          <span style={{ width: "20px", height: "1px", background: "var(--magenta)", display: "inline-block" }} />
          Achievements & More
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2px" }}>
          {achievements.map((a, i) => (
            <div key={a.title} className="cyber-card animate-in" style={{
              padding: "28px",
              animationDelay: `${i * 0.1}s`,
              display: "flex", gap: "20px", alignItems: "flex-start",
            }}>
              <div style={{
                fontSize: "2rem",
                lineHeight: 1,
                minWidth: "48px",
                height: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,229,255,0.05)",
                border: "1px solid rgba(0,229,255,0.15)",
              }}>{a.icon}</div>
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--cyan)",
                  letterSpacing: "0.1em",
                  marginBottom: "4px",
                }}>{a.year}</div>
                <h3 style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: "var(--white)",
                  marginBottom: "6px",
                }}>{a.title}</h3>
                <p style={{
                  fontSize: "0.82rem",
                  color: "var(--gray)",
                  lineHeight: 1.6,
                }}>{a.desc}</p>
              </div>
            </div>
          ))}

          {/* Languages */}
          <div className="cyber-card animate-in delay-2" style={{ padding: "28px" }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--magenta)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: "16px",
            }}>Languages Spoken</div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {["English", "Bengali", "Hindi"].map(lang => (
                <span key={lang} className="skill-tag" style={{ color: "var(--white)", borderColor: "var(--gray2)" }}>
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}