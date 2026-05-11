import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const links = [
  { path: "/", label: "Home", num: "01" },
  { path: "/projects", label: "Projects", num: "02" },
  { path: "/experience", label: "Experience", num: "03" },
  { path: "/contact", label: "Contact", num: "04" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 0 clamp(20px, 5vw, 60px);
          height: 72px;
          display: flex; align-items: center; justify-content: space-between;
          transition: all 0.4s ease;
          border-bottom: 1px solid transparent;
        }
        .navbar.scrolled {
          background: rgba(5,5,8,0.92);
          backdrop-filter: blur(20px);
          border-bottom-color: rgba(0,229,255,0.1);
        }
        .nav-logo {
          font-family: var(--font-display);
          font-size: 1.6rem;
          letter-spacing: 0.1em;
          color: var(--white);
          position: relative;
        }
        .nav-logo span { color: var(--cyan); }
        .nav-logo::after {
          content: '';
          position: absolute;
          bottom: -2px; left: 0;
          width: 100%; height: 1px;
          background: linear-gradient(90deg, var(--cyan), transparent);
        }
        .nav-links {
          display: flex; align-items: center; gap: 4px;
          list-style: none;
        }
        .nav-link {
          position: relative;
          display: flex; align-items: center; gap: 6px;
          padding: 8px 16px;
          font-family: var(--font-mono);
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gray);
          transition: color 0.3s;
          overflow: hidden;
        }
        .nav-link::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 1px;
          background: var(--cyan);
          transition: width 0.3s ease;
        }
        .nav-link:hover { color: var(--white); }
        .nav-link:hover::before { width: 100%; }
        .nav-link.active { color: var(--cyan); }
        .nav-link.active::before { width: 100%; }
        .nav-num { color: var(--magenta); font-size: 0.6rem; }
        .hamburger {
          display: none;
          flex-direction: column; gap: 5px;
          background: none; border: none; padding: 8px;
        }
        .hamburger span {
          display: block; width: 24px; height: 1px;
          background: var(--white); transition: all 0.3s;
        }
        .hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(4px,4px); }
        .hamburger.open span:nth-child(2) { opacity: 0; }
        .hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(4px,-4px); }
        .mobile-menu {
          display: none;
          position: fixed; top: 72px; left: 0; right: 0;
          background: rgba(5,5,8,0.98);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(0,229,255,0.15);
          z-index: 99;
          flex-direction: column; padding: 20px;
          gap: 4px;
        }
        .mobile-menu.open { display: flex; }
        .mobile-link {
          display: flex; align-items: center; gap: 12px;
          padding: 14px 16px;
          font-family: var(--font-mono);
          font-size: 0.85rem; letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--gray);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          transition: color 0.3s;
        }
        .mobile-link.active, .mobile-link:hover { color: var(--cyan); }
        @media (max-width: 640px) {
          .nav-links { display: none; }
          .hamburger { display: flex; }
        }
      `}</style>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <NavLink to="/" className="nav-logo">
          AB<span>.</span>DAS
        </NavLink>
        <ul className="nav-links">
          {links.map(l => (
            <li key={l.path}>
              <NavLink
                to={l.path}
                className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              >
                <span className="nav-num">{l.num}</span>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <button className={`hamburger${open ? " open" : ""}`} onClick={() => setOpen(!open)}>
          <span /><span /><span />
        </button>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`}>
        {links.map(l => (
          <NavLink key={l.path} to={l.path}
            className={({ isActive }) => `mobile-link${isActive ? " active" : ""}`}>
            <span style={{ color: "var(--magenta)", fontSize: "0.7rem" }}>{l.num}</span>
            {l.label}
          </NavLink>
        ))}
      </div>
    </>
  );
}