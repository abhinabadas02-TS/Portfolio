// import express from "express";
// import rateLimit from "express-rate-limit";
// import {
//   submitContact,
//   getMessages,
//   updateMessageStatus,
//   deleteMessage,
// } from "../controllers/Contactcontroller.js";
// import adminAuth from "../middleware/AdminAuth.js";

// const router = express.Router();

// // Rate limiter: max 5 submissions per IP per 15 minutes
// const contactLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 5,
//   message: {
//     success: false,
//     message: "Too many requests from this IP. Please try again in 15 minutes.",
//   },
//   standardHeaders: true,
//   legacyHeaders: false,
// });

// // ── Public ──────────────────────────────────────────
// // POST /api/contact
// router.post("/", contactLimiter, submitContact);

// // ── Admin (protected) ───────────────────────────────
// // GET  /api/contact/messages?page=1&limit=20&status=unread
// router.get("/messages", adminAuth, getMessages);

// // PATCH /api/contact/messages/:id
// router.patch("/messages/:id", adminAuth, updateMessageStatus);

// // DELETE /api/contact/messages/:id
// router.delete("/messages/:id", adminAuth, deleteMessage);

// export default router;































import express from "express";
import rateLimit from "express-rate-limit";
import {
  submitContact,
  getMessages,
  updateMessageStatus,
  deleteMessage,
} from "../controllers/Contactcontroller.js"; // ← exact filename casing
import adminAuth from "../middleware/adminAuth.js";   // ← exact filename casing

const router = express.Router();

// Rate limiter: max 5 submissions per IP per 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    success: false,
    message: "Too many requests from this IP. Please try again in 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Public ──────────────────────────────────────────
// POST /api/contact
router.post("/", contactLimiter, submitContact);

// ── Admin (protected) ───────────────────────────────
// GET  /api/contact/messages?page=1&limit=20&status=unread
router.get("/messages", adminAuth, getMessages);

// PATCH /api/contact/messages/:id
router.patch("/messages/:id", adminAuth, updateMessageStatus);

// DELETE /api/contact/messages/:id
router.delete("/messages/:id", adminAuth, deleteMessage);

export default router;