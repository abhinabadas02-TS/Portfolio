// import { useState } from "react";

// const projects = [
//   {
//     id: "01",
//     title: "Tutor Web Application",
//     type: "Full Stack · MERN",
//     year: "2025",
//     desc: "A full-featured tutoring platform with real-time scheduling, secure authentication, and AI-powered tutoring assistance. Built with MERN stack integrating Google APIs and PayPal payments.",
//     highlights: [
//       "JWT authentication with secure session management",
//       "Google API integration for calendar & scheduling",
//       "AI Tutor Bot powered by Gemini API",
//       "PayPal payment gateway for seamless transactions",
//       "Real-time booking with conflict resolution logic",
//     ],
//     tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API", "JWT", "PayPal"],
//     color: "#00e5ff",
//     link: "#",
//   },
//   {
//     id: "02",
//     title: "Real-Time Cricket Auction",
//     type: "Full Stack · MERN + Socket.io",
//     year: "2025",
//     desc: "A high-concurrency live bidding platform inspired by IPL auctions. Features real-time bid updates, synchronized countdowns, and dynamic purse management across multiple teams.",
//     highlights: [
//       "Socket.io for sub-50ms bid validation and broadcasts",
//       "Synchronized timer across all connected clients",
//       "Dynamic purse management with team budgeting",
//       "High-concurrency architecture handling multiple simultaneous bids",
//       "Custom auction logic with player categorization",
//     ],
//     tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
//     color: "#ff2d78",
//     link: "#",
//   },
// ];

// export default function Projects() {
//   const [hovered, setHovered] = useState(null);

//   return (
//     <div className="page" style={{ padding: "60px clamp(20px,8vw,120px) 100px" }}>

//       {/* HEADER */}
//       <div style={{ marginBottom: "80px" }}>
//         <div className="section-tag animate-in">Selected Work</div>
//         <h1 className="section-title animate-in delay-1">
//           MY<br />
//           <span style={{ color: "var(--cyan)" }}>PROJECTS</span>
//         </h1>
//         <p className="animate-in delay-2" style={{
//           marginTop: "20px",
//           color: "var(--gray)",
//           fontSize: "0.9rem",
//           fontFamily: "var(--font-mono)",
//           maxWidth: "400px",
//           lineHeight: 1.7,
//         }}>
//           Two production-grade applications showcasing real-time systems, AI integration, and cloud-ready architecture.
//         </p>
//       </div>

//       {/* PROJECT CARDS */}
//       <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
//         {projects.map((p, i) => (
//           <div
//             key={p.id}
//             className="animate-in"
//             style={{ animationDelay: `${i * 0.15}s` }}
//             onMouseEnter={() => setHovered(p.id)}
//             onMouseLeave={() => setHovered(null)}
//           >
//             <div
//               className="cyber-card"
//               style={{
//                 padding: "0",
//                 overflow: "hidden",
//                 border: hovered === p.id ? `1px solid ${p.color}40` : "1px solid var(--gray2)",
//                 transition: "all 0.4s ease",
//               }}
//             >
//               {/* TOP BAR */}
//               <div style={{
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//                 padding: "16px 32px",
//                 borderBottom: "1px solid var(--gray2)",
//                 background: "rgba(255,255,255,0.01)",
//               }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
//                   <span style={{
//                     fontFamily: "var(--font-display)",
//                     fontSize: "3rem",
//                     color: p.color,
//                     opacity: 0.3,
//                     lineHeight: 1,
//                   }}>{p.id}</span>
//                   <div>
//                     <div style={{
//                       fontFamily: "var(--font-mono)",
//                       fontSize: "0.65rem",
//                       color: "var(--gray)",
//                       letterSpacing: "0.15em",
//                       textTransform: "uppercase",
//                     }}>{p.type}</div>
//                     <h2 style={{
//                       fontFamily: "var(--font-display)",
//                       fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
//                       letterSpacing: "0.05em",
//                       color: "var(--white)",
//                       lineHeight: 1.1,
//                     }}>{p.title}</h2>
//                   </div>
//                 </div>
//                 <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
//                   <span style={{
//                     fontFamily: "var(--font-mono)",
//                     fontSize: "0.7rem",
//                     color: "var(--gray)",
//                   }}>{p.year}</span>
//                   {p.link !== "#" && (
//                     <a href={p.link} target="_blank" rel="noreferrer"
//                       className="cyber-btn"
//                       style={{ padding: "8px 20px", fontSize: "0.7rem" }}>
//                       <span>↗ Live</span>
//                     </a>
//                   )}
//                 </div>
//               </div>

//               {/* BODY */}
//               <div style={{
//                 display: "grid",
//                 gridTemplateColumns: hovered === p.id ? "1fr 1fr" : "1fr 0px",
//                 transition: "all 0.5s ease",
//                 overflow: "hidden",
//               }}>
//                 {/* LEFT: DESC + TECH */}
//                 <div style={{ padding: "32px" }}>
//                   <p style={{
//                     color: "var(--gray)",
//                     fontSize: "0.9rem",
//                     lineHeight: 1.8,
//                     marginBottom: "28px",
//                     maxWidth: "600px",
//                   }}>{p.desc}</p>

//                   <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
//                     {p.tech.map(t => (
//                       <span key={t} className="skill-tag" style={{
//                         borderColor: `${p.color}30`,
//                         color: p.color,
//                       }}>{t}</span>
//                     ))}
//                   </div>
//                 </div>

//                 {/* RIGHT: HIGHLIGHTS (shown on hover) */}
//                 <div style={{
//                   padding: hovered === p.id ? "32px" : "32px 0",
//                   borderLeft: "1px solid var(--gray2)",
//                   overflow: "hidden",
//                   opacity: hovered === p.id ? 1 : 0,
//                   transition: "opacity 0.4s ease 0.2s",
//                 }}>
//                   <div style={{
//                     fontFamily: "var(--font-mono)",
//                     fontSize: "0.65rem",
//                     letterSpacing: "0.2em",
//                     color: p.color,
//                     textTransform: "uppercase",
//                     marginBottom: "16px",
//                   }}>KEY FEATURES</div>
//                   <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
//                     {p.highlights.map((h, j) => (
//                       <li key={j} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
//                         <span style={{ color: p.color, fontFamily: "var(--font-mono)", fontSize: "0.7rem", marginTop: "2px" }}>›</span>
//                         <span style={{ color: "var(--gray)", fontSize: "0.85rem", lineHeight: 1.6 }}>{h}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* COMING SOON */}
//       <div className="animate-in delay-3" style={{ marginTop: "2px" }}>
//         <div className="cyber-card" style={{
//           padding: "40px 32px",
//           textAlign: "center",
//           border: "1px dashed var(--gray2)",
//         }}>
//           <div style={{
//             fontFamily: "var(--font-mono)",
//             fontSize: "0.65rem",
//             letterSpacing: "0.2em",
//             color: "var(--gray)",
//             textTransform: "uppercase",
//           }}>MORE COMING SOON</div>
//           <div style={{
//             fontFamily: "var(--font-display)",
//             fontSize: "2rem",
//             color: "var(--gray2)",
//             marginTop: "8px",
//             letterSpacing: "0.05em",
//           }}>PROJECTS IN PROGRESS</div>
//         </div>
//       </div>
//     </div>
//   );
// }
























import { useState } from "react";

const projects = [
  {
    id: "01",
    title: "Tutor Web Application",
    type: "Full Stack · MERN",
    year: "2025",
    desc: "A full-featured tutoring platform with real-time scheduling, secure authentication, and AI-powered tutoring assistance. Built with MERN stack integrating Google APIs and PayPal payments.",
    highlights: [
      "JWT authentication with secure session management",
      "Google API integration for calendar & scheduling",
      "AI Tutor Bot powered by Gemini API",
      "PayPal payment gateway for seamless transactions",
      "Real-time booking with conflict resolution logic",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Gemini API", "JWT", "PayPal"],
    color: "#00e5ff",
    link: "#",
    status: "Live",
  },
  {
    id: "02",
    title: "Real-Time Cricket Auction",
    type: "Full Stack · MERN + Socket.io",
    year: "2025",
    desc: "A high-concurrency live bidding platform inspired by IPL auctions. Features real-time bid updates, synchronized countdowns, and dynamic purse management across multiple teams.",
    highlights: [
      "Socket.io for sub-50ms bid validation and broadcasts",
      "Synchronized timer across all connected clients",
      "Dynamic purse management with team budgeting",
      "High-concurrency architecture handling multiple simultaneous bids",
      "Custom auction logic with player categorization",
    ],
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.io", "Tailwind CSS"],
    color: "#ff2d78",
    link: "#",
    status: "Live",
  },
];

export default function Projects() {
  const [active, setActive] = useState(null);

  const toggle = (id) => setActive(prev => prev === id ? null : id);

  return (
    <div className="page" style={{ padding: "60px clamp(20px,8vw,120px) 100px" }}>
      <style>{`
        .proj-card {
          position: relative;
          background: linear-gradient(135deg, rgba(15,15,24,0.95), rgba(10,10,20,0.98));
          border: 1px solid var(--gray2);
          transition: border-color 0.35s ease;
          overflow: hidden;
        }

        .proj-number-bg {
          font-family: var(--font-display);
          font-size: clamp(6rem, 14vw, 11rem);
          line-height: 1;
          letter-spacing: -0.04em;
          position: absolute;
          top: -8px;
          right: 20px;
          pointer-events: none;
          user-select: none;
          opacity: 0.05;
          transition: opacity 0.4s ease;
        }
        .proj-card:hover .proj-number-bg { opacity: 0.1; }

        .meta-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 10px;
          font-family: var(--font-mono);
          font-size: 0.6rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid;
        }

        .tech-chip {
          display: inline-flex;
          padding: 4px 11px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.06em;
          border: 1px solid;
          transition: background 0.2s;
        }

        .toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          border: 1px solid;
          background: transparent;
          cursor: none;
          transition: all 0.25s ease;
          white-space: nowrap;
        }

        /* CSS grid trick for smooth expand — no height:auto jank */
        .expand-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.42s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .expand-wrap.open {
          grid-template-rows: 1fr;
        }
        .expand-inner {
          overflow: hidden;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .feature-item:last-child { border-bottom: none; }
      `}</style>

      {/* ── PAGE HEADER ── */}
      <div style={{ marginBottom: "72px" }}>
        <div className="section-tag animate-in">Selected Work</div>
        <h1 className="section-title animate-in delay-1">
          MY<br />
          <span style={{ color: "var(--cyan)" }}>PROJECTS</span>
        </h1>
        <p className="animate-in delay-2" style={{
          marginTop: "20px",
          color: "var(--gray)",
          fontSize: "0.88rem",
          fontFamily: "var(--font-mono)",
          maxWidth: "420px",
          lineHeight: 1.75,
        }}>
          Production-grade applications — real-time systems, AI integration, cloud-ready architecture.
        </p>
      </div>

      {/* ── PROJECT CARDS ── */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {projects.map((p, i) => (
          <div
            key={p.id}
            className="proj-card animate-in"
            style={{
              animationDelay: `${i * 0.15}s`,
              borderColor: active === p.id ? `${p.color}35` : undefined,
            }}
          >
            {/* Decorative background number */}
            <div className="proj-number-bg" style={{ color: p.color }}>{p.id}</div>

            {/* Top accent line — always visible, brightens when active */}
            <div style={{
              height: "2px",
              background: `linear-gradient(90deg, ${p.color}, transparent 70%)`,
              opacity: active === p.id ? 0.7 : 0.2,
              transition: "opacity 0.4s ease",
            }} />

            {/* ── CARD BODY ── */}
            <div style={{ padding: "28px 32px 32px" }}>

              {/* Row 1: meta tags */}
              <div style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "8px",
                marginBottom: "16px",
              }}>
                <span className="meta-tag" style={{
                  color: p.color,
                  borderColor: `${p.color}35`,
                  background: `${p.color}08`,
                }}>
                  <span style={{
                    width: "5px", height: "5px", borderRadius: "50%",
                    background: p.color,
                    boxShadow: `0 0 6px ${p.color}`,
                    display: "inline-block",
                  }} />
                  {p.status}
                </span>
                <span className="meta-tag" style={{
                  color: "var(--gray)",
                  borderColor: "var(--gray2)",
                }}>{p.type}</span>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  color: "var(--gray)",
                  letterSpacing: "0.1em",
                }}>{p.year}</span>
              </div>

              {/* Row 2: Title + action buttons side by side */}
              <div style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: "24px",
                flexWrap: "wrap",
                marginBottom: "18px",
              }}>
                <h2 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2rem, 5vw, 3.2rem)",
                  letterSpacing: "0.04em",
                  color: "var(--white)",
                  lineHeight: 1,
                  flex: 1,
                  minWidth: "200px",
                }}>{p.title}</h2>

                {/* Buttons */}
                <div style={{ display: "flex", gap: "8px", alignItems: "center", paddingTop: "4px", flexShrink: 0 }}>
                  {p.link !== "#" && (
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="toggle-btn"
                      style={{ color: p.color, borderColor: `${p.color}40` }}
                    >
                      ↗ Live
                    </a>
                  )}
                  <button
                    onClick={() => toggle(p.id)}
                    className="toggle-btn"
                    style={{
                      color: active === p.id ? "var(--bg)" : "var(--white)",
                      borderColor: active === p.id ? p.color : "var(--gray2)",
                      background: active === p.id ? p.color : "transparent",
                      boxShadow: active === p.id ? `0 0 20px ${p.color}30` : "none",
                    }}
                  >
                    <span style={{
                      display: "inline-block",
                      width: "10px", height: "10px",
                      borderRadius: "50%",
                      border: `1px solid ${active === p.id ? "var(--bg)" : p.color}`,
                      position: "relative",
                    }}>
                      <span style={{
                        position: "absolute",
                        inset: "2px",
                        borderRadius: "50%",
                        background: active === p.id ? "var(--bg)" : p.color,
                        transition: "transform 0.2s",
                        transform: active === p.id ? "scale(1)" : "scale(0)",
                      }} />
                    </span>
                    {active === p.id ? "Close" : "View Features"}
                  </button>
                </div>
              </div>

              {/* Row 3: Description */}
              <p style={{
                color: "var(--gray)",
                fontSize: "0.88rem",
                lineHeight: 1.8,
                maxWidth: "640px",
                marginBottom: "24px",
              }}>{p.desc}</p>

              {/* Row 4: Tech stack */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {p.tech.map(t => (
                  <span key={t} className="tech-chip" style={{
                    color: p.color,
                    borderColor: `${p.color}25`,
                    background: `${p.color}05`,
                  }}>{t}</span>
                ))}
              </div>
            </div>

            {/* ── EXPANDABLE FEATURES PANEL ── */}
            <div className={`expand-wrap${active === p.id ? " open" : ""}`}>
              <div className="expand-inner">
                <div style={{
                  margin: "0 32px",
                  borderTop: `1px solid ${p.color}20`,
                }} />
                <div style={{
                  padding: "24px 32px 32px",
                  background: `linear-gradient(180deg, ${p.color}06 0%, transparent 100%)`,
                }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.28em",
                    color: p.color,
                    textTransform: "uppercase",
                    marginBottom: "16px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                    <span style={{ width: "20px", height: "1px", background: p.color, display: "inline-block" }} />
                    Key Features
                  </div>

                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                    columnGap: "40px",
                  }}>
                    {p.highlights.map((h, j) => (
                      <div key={j} className="feature-item">
                        <span style={{
                          fontFamily: "var(--font-display)",
                          fontSize: "1.1rem",
                          color: p.color,
                          opacity: 0.45,
                          minWidth: "30px",
                          lineHeight: 1.55,
                        }}>
                          {String(j + 1).padStart(2, "0")}
                        </span>
                        <span style={{
                          color: "var(--gray)",
                          fontSize: "0.84rem",
                          lineHeight: 1.65,
                        }}>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── COMING SOON ── */}
      <div className="animate-in delay-3" style={{ marginTop: "16px" }}>
        <div style={{
          padding: "36px 32px",
          border: "1px dashed var(--gray2)",
          background: "rgba(255,255,255,0.01)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}>
          <div>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.58rem",
              letterSpacing: "0.28em",
              color: "var(--gray)",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}>More Coming Soon</div>
            <div style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.4rem, 3.5vw, 2rem)",
              color: "var(--gray2)",
              letterSpacing: "0.06em",
            }}>PROJECTS IN PROGRESS</div>
          </div>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.68rem",
            color: "var(--gray)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}>
            <span style={{
              width: "8px", height: "8px", borderRadius: "50%",
              background: "#ffd700",
              boxShadow: "0 0 8px #ffd70060",
              animation: "pulse 2s infinite",
              display: "inline-block",
            }} />
            Building
          </div>
        </div>
      </div>
    </div>
  );
}