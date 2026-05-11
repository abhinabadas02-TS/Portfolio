import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const roles = ["Cloud Engineer", "MERN Stack Dev", "Azure Specialist"];

function TypewriterText() {
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = roles[idx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          setTimeout(() => setDeleting(true), 1600);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setDeleting(false);
          setIdx((i) => (i + 1) % roles.length);
        }
      }
    }, deleting ? 50 : 80);
    return () => clearTimeout(timeout);
  }, [text, deleting, idx]);

  return (
    <span style={{ color: "var(--cyan)", fontFamily: "var(--font-mono)" }}>
      {text}
      <span style={{ animation: "blink 1s infinite", color: "var(--magenta)" }}>|</span>
    </span>
  );
}

const skills = [
  { cat: "Cloud & DevOps", items: ["Microsoft Azure", "Azure Logic Apps", "Git", "Postman", "Vercel", "Render"] },
  { cat: "Web Dev", items: ["React.js", "Node.js", "Express.js", "Socket.io", "Tailwind CSS"] },
  { cat: "Languages", items: ["JavaScript ES6+", "Java", "Python", "C"] },
  { cat: "Databases", items: ["MongoDB", "SQL", "Schema Design"] },
];

export default function Home() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.2 + 0.3,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        a: Math.random(),
      });
    }
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.a * 0.5})`;
        ctx.fill();
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return (
    <div className="page" style={{ position: "relative", overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.7
      }} />

      {/* HERO */}
      <section style={{
        minHeight: "calc(100vh - 80px)",
        display: "grid",
        gridTemplateColumns: "1fr",
        alignItems: "center",
        padding: "0 clamp(20px,8vw,120px)",
        position: "relative",
        zIndex: 2,
      }}>
        {/* BIG BG TEXT */}
        <div style={{
          position: "absolute",
          right: "-2%", top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(120px, 22vw, 300px)",
          color: "rgba(0,229,255,0.025)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          pointerEvents: "none",
          userSelect: "none",
          zIndex: 0,
        }}>DAS</div>

        <div style={{ maxWidth: "900px", position: "relative", zIndex: 1 }}>
          <div className="animate-in delay-1" style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            letterSpacing: "0.25em",
            color: "var(--magenta)",
            textTransform: "uppercase",
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "12px"
          }}>
            <span style={{ display: "inline-block", width: "40px", height: "1px", background: "var(--magenta)" }} />
            Available for work
            <span style={{
              display: "inline-block", width: "8px", height: "8px", borderRadius: "50%",
              background: "#00ff88", animation: "pulse 2s infinite"
            }} />
          </div>

          <h1 className="animate-in delay-2 glitch" data-text="ABHINABA DAS" style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(3.5rem, 12vw, 9rem)",
            lineHeight: 0.9,
            letterSpacing: "0.02em",
            marginBottom: "24px",
          }}>
            ABHINABA DAS
          </h1>

          <div className="animate-in delay-3" style={{
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            fontWeight: 300,
            color: "var(--gray)",
            marginBottom: "32px",
          }}>
            I'm a <TypewriterText />
          </div>

          <p className="animate-in delay-4" style={{
            fontSize: "0.95rem",
            lineHeight: 1.8,
            color: "var(--gray)",
            maxWidth: "540px",
            marginBottom: "48px",
          }}>
            Cloud Engineer at Wipro with hands-on experience managing Azure infrastructure and automating cloud workflows
          </p>

          <div className="animate-in delay-5" style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link to="/projects" className="cyber-btn">
              <span>View Projects</span>
            </Link>
            <Link to="/contact" className="cyber-btn" style={{
              borderColor: "var(--gray2)", color: "var(--white)"
            }}>
              <span>Get in Touch</span>
            </Link>
          </div>

          {/* STATS */}
          <div className="animate-in delay-6" style={{
            display: "flex", gap: "40px", flexWrap: "wrap",
            marginTop: "64px",
            paddingTop: "32px",
            borderTop: "1px solid var(--gray2)",
          }}>
            {[
              { num: "8.1", label: "CGPA", unit: "" },
              { num: "2+", label: "Projects", unit: "" },
              { num: "6+", label: "Months Exp", unit: "" },
              { num: "10+", label: "Tech Skills", unit: "" },
            ].map(s => (
              <div key={s.label}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  color: "var(--cyan)",
                  lineHeight: 1,
                }}>{s.num}</div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "var(--gray)",
                  textTransform: "uppercase",
                  marginTop: "4px",
                }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section style={{
        padding: "80px clamp(20px,8vw,120px)",
        position: "relative", zIndex: 2,
      }}>
        <div className="section-tag animate-in">Technical Arsenal</div>
        <h2 className="section-title animate-in delay-1" style={{ marginBottom: "48px" }}>
          SKILLS &<br /><span style={{ color: "var(--cyan)" }}>TOOLS</span>
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "2px",
        }}>
          {skills.map((group, i) => (
            <div key={group.cat} className="cyber-card animate-in" style={{
              padding: "28px",
              animationDelay: `${i * 0.1}s`
            }}>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "var(--magenta)",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}>
                {String(i + 1).padStart(2, "0")} / {group.cat}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {group.items.map(skill => (
                  <span key={skill} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SCROLL INDICATOR */}
      <div style={{
        position: "absolute",
        bottom: "32px", right: "clamp(20px,5vw,60px)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: "8px",
        zIndex: 2, opacity: 0.5,
      }}>
        <div style={{
          fontFamily: "var(--font-mono)", fontSize: "0.6rem",
          letterSpacing: "0.2em", color: "var(--gray)",
          writingMode: "vertical-rl",
        }}>SCROLL</div>
        <div style={{
          width: "1px", height: "60px",
          background: "linear-gradient(180deg, var(--cyan), transparent)",
          animation: "pulse 2s infinite"
        }} />
      </div>
    </div>
  );
}