import express from "express";
import rateLimit from "express-rate-limit";
import { trackPageView, getAnalyticsStats } from "../controllers/Analyticscontroller.js";
import adminAuth from "../middleware/AdminAuth.js";

const router = express.Router();

// Rate limiter: generous limit — every page navigation triggers this
const viewLimiter = rateLimit({
  windowMs: 60 * 1000,       // 1 minute
  max: 30,                   // 30 page views per minute per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: "Rate limit exceeded" },
});

// ── Public ──────────────────────────────────────────
// POST /api/analytics/pageview
router.post("/pageview", viewLimiter, trackPageView);

// ── Admin (protected) ───────────────────────────────
// GET /api/analytics/stats?days=7
router.get("/stats", adminAuth, getAnalyticsStats);

export default router;