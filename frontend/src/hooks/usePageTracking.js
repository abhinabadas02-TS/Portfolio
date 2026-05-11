// src/hooks/usePageTracking.js
// Drop this hook into your App.jsx to auto-track every page visit.
//
// Usage in App.jsx:
//   import usePageTracking from "./hooks/usePageTracking";
//   function AnimatedRoutes() {
//     usePageTracking();
//     return ( <Routes> ... </Routes> );
//   }

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Pages we track — must match backend enum
const TRACKED_PAGES = ["/", "/projects", "/experience", "/contact"];

export default function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname;

    if (!TRACKED_PAGES.includes(page)) return;

    // Fire-and-forget — never block the UI
    fetch(`${API_URL}/api/analytics/pageview`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ page }),
    }).catch(() => {
      // Silently fail — analytics should never crash the app
    });
  }, [location.pathname]);
}