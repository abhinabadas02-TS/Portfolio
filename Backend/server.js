// import "dotenv/config";
// import express from "express";
// import cors from "cors";
// import rateLimit from "express-rate-limit";
// import connectDB from "./config/db.js";
// import contactRoutes from "./routes/Contact.js";
// import analyticsRoutes from "./routes/Analytics.js";

// const app = express();
// const PORT = process.env.PORT || 5000;

// // ─────────────────────────────────────────────
// //  Connect to MongoDB
// // ─────────────────────────────────────────────
// await connectDB();

// // ─────────────────────────────────────────────
// //  Global Middleware
// // ─────────────────────────────────────────────

// // CORS — only allow your frontend
// app.use(
//   cors({
//     origin: (origin, callback) => {
//       const allowed = [
//         process.env.FRONTEND_URL,
//         "http://localhost:5173",
//         "http://localhost:3000",
//       ].filter(Boolean);

//       // Allow requests with no origin (e.g. Postman, curl)
//       if (!origin || allowed.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error(`CORS blocked: origin ${origin} not allowed`));
//       }
//     },
//     methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

// // Body parsing
// app.use(express.json({ limit: "16kb" }));
// app.use(express.urlencoded({ extended: false, limit: "16kb" }));

// // Global rate limiter (broad protection on all routes)
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 min
//     max: 200,
//     standardHeaders: true,
//     legacyHeaders: false,
//     message: { success: false, message: "Too many requests. Please slow down." },
//   })
// );

// // Trust proxy (needed for accurate IP in rate limiting on Render/Vercel/etc.)
// app.set("trust proxy", 1);

// // ─────────────────────────────────────────────
// //  Routes
// // ─────────────────────────────────────────────

// // Health check — used by Render, UptimeRobot, etc.
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Abhinaba Das — Portfolio API is running 🚀",
//     version: "1.0.0",
//     timestamp: new Date().toISOString(),
//     endpoints: {
//       contact: {
//         submit:  "POST /api/contact",
//         list:    "GET  /api/contact/messages  [Admin]",
//         update:  "PATCH /api/contact/messages/:id  [Admin]",
//         delete:  "DELETE /api/contact/messages/:id  [Admin]",
//       },
//       analytics: {
//         track: "POST /api/analytics/pageview",
//         stats: "GET  /api/analytics/stats  [Admin]",
//       },
//     },
//   });
// });

// // Feature routes
// app.use("/api/contact", contactRoutes);
// app.use("/api/analytics", analyticsRoutes);

// // ─────────────────────────────────────────────
// //  404 Handler
// // ─────────────────────────────────────────────
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: `Route not found: ${req.method} ${req.originalUrl}`,
//   });
// });

// // ─────────────────────────────────────────────
// //  Global Error Handler
// // ─────────────────────────────────────────────
// app.use((err, req, res, next) => {
//   console.error("Unhandled error:", err);

//   // CORS errors
//   if (err.message?.startsWith("CORS blocked")) {
//     return res.status(403).json({ success: false, message: err.message });
//   }

//   res.status(err.status || 500).json({
//     success: false,
//     message:
//       process.env.NODE_ENV === "production"
//         ? "Internal server error"
//         : err.message,
//   });
// });

// // ─────────────────────────────────────────────
// //  Start
// // ─────────────────────────────────────────────
// app.listen(PORT, () => {
//   console.log(`\n🚀 Server running on port ${PORT}`);
//   console.log(`   Mode: ${process.env.NODE_ENV || "development"}`);
//   console.log(`   URL:  http://localhost:${PORT}\n`);
// });



















import "dotenv/config";
import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import connectDB from "./config/db.js";
import { verifyMailer } from "./config/Mailer.js";
import { verifyAIClient } from "./config/aiClient.js";
import contactRoutes from "./routes/contact.js";
import analyticsRoutes from "./routes/analytics.js";
import chatRoutes from "./routes/chat.js";

const app = express();
const PORT = process.env.PORT || 5000;

// ─────────────────────────────────────────────
//  Connect to MongoDB
// ─────────────────────────────────────────────
await connectDB();

// Verify Gmail SMTP and AI client on startup — logs clear success/error
verifyMailer();
verifyAIClient();

// ─────────────────────────────────────────────
//  Global Middleware
// ─────────────────────────────────────────────

// CORS — only allow your frontend
app.use(
  cors({
    origin: (origin, callback) => {
      const allowed = [
        process.env.FRONTEND_URL,
        "http://localhost:5173",
        "http://localhost:3000",
      ].filter(Boolean);

      // Allow requests with no origin (e.g. Postman, curl)
      if (!origin || allowed.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS blocked: origin ${origin} not allowed`));
      }
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: false, limit: "16kb" }));

// Global rate limiter (broad protection on all routes)
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: { success: false, message: "Too many requests. Please slow down." },
  })
);

// Trust proxy (needed for accurate IP in rate limiting on Render/Vercel/etc.)
app.set("trust proxy", 1);

// ─────────────────────────────────────────────
//  Routes
// ─────────────────────────────────────────────

// Health check — used by Render, UptimeRobot, etc.
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Abhinaba Das — Portfolio API is running 🚀",
    version: "1.0.0",
    timestamp: new Date().toISOString(),
    endpoints: {
      contact: {
        submit:  "POST /api/contact",
        list:    "GET  /api/contact/messages  [Admin]",
        update:  "PATCH /api/contact/messages/:id  [Admin]",
        delete:  "DELETE /api/contact/messages/:id  [Admin]",
      },
      analytics: {
        track: "POST /api/analytics/pageview",
        stats: "GET  /api/analytics/stats  [Admin]",
      },
      chat: {
        send: "POST /api/chat",
        logs: "GET  /api/chat/logs  [Admin]",
      },
    },
  });
});

// Feature routes
app.use("/api/contact", contactRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/chat", chatRoutes);

// ─────────────────────────────────────────────
//  404 Handler
// ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ─────────────────────────────────────────────
//  Global Error Handler
// ─────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);

  // CORS errors
  if (err.message?.startsWith("CORS blocked")) {
    return res.status(403).json({ success: false, message: err.message });
  }

  res.status(err.status || 500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message,
  });
});

// ─────────────────────────────────────────────
//  Start
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 Server running on port ${PORT}`);
  console.log(`   Mode: ${process.env.NODE_ENV || "development"}`);
  console.log(`   URL:  http://localhost:${PORT}\n`);
});