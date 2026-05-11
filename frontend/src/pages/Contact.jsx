import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const socials = [
  {
    label: "Email",
    value: "abhinabadas02@gmail.com",
    href: "mailto:abhinabadas02@gmail.com",
    icon: "✉",
  },
  {
    label: "Phone",
    value: "+91 8910285278",
    href: "tel:+918910285278",
    icon: "📞",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/abhinaba-das",
    href: "https://linkedin.com/in/abhinaba-das",
    icon: "in",
    isText: true,
  },
  {
    label: "GitHub",
    value: "github.com/abhinaba-das",
    href: "https://github.com/abhinaba-das",
    icon: "</>",
    isText: true,
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Name, email, and message are required.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSent(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page" style={{ padding: "60px clamp(20px,8vw,120px) 100px" }}>
      {/* HEADER */}
      <div style={{ marginBottom: "80px" }}>
        <div className="section-tag animate-in">Let's Connect</div>
        <h1 className="section-title animate-in delay-1">
          GET IN<br />
          <span style={{ color: "var(--cyan)" }}>TOUCH</span>
        </h1>
        <p className="animate-in delay-2" style={{
          marginTop: "20px",
          color: "var(--gray)",
          fontSize: "0.9rem",
          fontFamily: "var(--font-mono)",
          maxWidth: "460px",
          lineHeight: 1.8,
        }}>
          Open to full-time roles, freelance projects, and collaborations. Response time: &lt; 24hrs.
        </p>
      </div>

      <div className="contact-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.4fr",
        gap: "2px",
        alignItems: "start",
      }}>
        {/* LEFT: CONTACT INFO */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {socials.map((s, i) => (
            <a
              key={s.label}
              href={s.href}
              target={s.isText ? "_blank" : undefined}
              rel="noreferrer"
              className="cyber-card animate-in"
              style={{
                padding: "24px 28px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                animationDelay: `${i * 0.1}s`,
                textDecoration: "none",
              }}
            >
              <div style={{
                width: "48px", height: "48px",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: s.isText ? "0.75rem" : "1.3rem",
                fontFamily: s.isText ? "var(--font-mono)" : "inherit",
                fontWeight: "bold",
                color: "var(--cyan)",
                border: "1px solid rgba(0,229,255,0.2)",
                background: "rgba(0,229,255,0.04)",
                flexShrink: 0,
              }}>{s.icon}</div>
              <div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "var(--gray)",
                  textTransform: "uppercase",
                  marginBottom: "4px",
                }}>{s.label}</div>
                <div style={{
                  fontSize: "0.85rem",
                  color: "var(--white)",
                  fontFamily: "var(--font-mono)",
                }}>{s.value}</div>
              </div>
              <div style={{ marginLeft: "auto", color: "var(--gray)", fontSize: "1rem" }}>↗</div>
            </a>
          ))}

          {/* AVAILABILITY */}
          <div className="cyber-card animate-in delay-4" style={{ padding: "28px" }}>
            <div style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              color: "var(--gray)",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}>Current Status</div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{
                width: "10px", height: "10px", borderRadius: "50%",
                background: "#00ff88",
                boxShadow: "0 0 10px #00ff88, 0 0 20px #00ff8840",
                animation: "pulse 2s infinite",
                display: "inline-block",
              }} />
              <span style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.8rem",
                color: "#00ff88",
              }}>Available for opportunities</span>
            </div>
            <div style={{
              marginTop: "12px",
              fontSize: "0.82rem",
              color: "var(--gray)",
              lineHeight: 1.7,
            }}>
              Based in <span style={{ color: "var(--white)" }}>India</span> ·
              Open to remote & hybrid roles.
            </div>
          </div>
        </div>

        {/* RIGHT: FORM */}
        <div className="cyber-card animate-in delay-2" style={{ padding: "40px" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "4rem",
                color: "var(--cyan)",
                marginBottom: "16px",
              }}>✓</div>
              <div style={{
                fontFamily: "var(--font-display)",
                fontSize: "2rem",
                color: "var(--white)",
                letterSpacing: "0.05em",
              }}>MESSAGE SENT</div>
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                color: "var(--gray)",
                marginTop: "12px",
              }}>I'll get back to you within 24 hours.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="cyber-btn"
                style={{ marginTop: "32px" }}
              >
                <span>Send Another</span>
              </button>
            </div>
          ) : (
            <>
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.2em",
                color: "var(--cyan)",
                textTransform: "uppercase",
                marginBottom: "28px",
              }}>// SEND MESSAGE</div>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: "var(--gray)",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}>Name *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="cyber-input"
                    />
                  </div>
                  <div>
                    <label style={{
                      display: "block",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.6rem",
                      letterSpacing: "0.15em",
                      color: "var(--gray)",
                      textTransform: "uppercase",
                      marginBottom: "8px",
                    }}>Email *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@email.com"
                      className="cyber-input"
                    />
                  </div>
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    color: "var(--gray)",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}>Subject</label>
                  <input
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project / Opportunity / Collab"
                    className="cyber-input"
                  />
                </div>

                <div>
                  <label style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    color: "var(--gray)",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                  }}>Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about the opportunity..."
                    className="cyber-input"
                    style={{ minHeight: "150px" }}
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.75rem",
                    color: "var(--magenta)",
                    padding: "10px 14px",
                    border: "1px solid rgba(255,45,120,0.3)",
                    background: "rgba(255,45,120,0.05)",
                  }}>
                    ⚠ {error}
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  className="cyber-btn"
                  style={{ width: "100%", justifyContent: "center", padding: "16px" }}
                  disabled={loading}
                >
                  <span>{loading ? "TRANSMITTING..." : "SEND MESSAGE →"}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}