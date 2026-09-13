import express from "express";
import rateLimit from "express-rate-limit";
import { chatWithAI, getChatLogs } from "../controllers/chatController.js";
import adminAuth from "../middleware/AdminAuth.js";

const router = express.Router();

// Rate limiter: 15 messages per 5 minutes per IP — generous for a
// real conversation, but protects your Anthropic API budget from abuse.
const chatLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 15,
  message: {
    success: false,
    message: "You've sent a lot of messages — please wait a few minutes before continuing.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Public ──────────────────────────────────────────
// POST /api/chat
router.post("/", chatLimiter, chatWithAI);

// ── Admin (protected) ───────────────────────────────
// GET /api/chat/logs?page=1&limit=30
router.get("/logs", adminAuth, getChatLogs);

export default router;