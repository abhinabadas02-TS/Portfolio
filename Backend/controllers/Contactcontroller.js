// import Contact from "../models/Contact.js";
// import { sendContactNotification } from "../config/Mailer.js";

// // ─────────────────────────────────────────────
// // POST /api/contact
// // Public — submit a contact form message
// // ─────────────────────────────────────────────
// export const submitContact = async (req, res) => {
//   try {
//     const { name, email, subject, message } = req.body;

//     // Basic required field check (Mongoose handles deeper validation)
//     if (!name?.trim() || !email?.trim() || !message?.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Name, email, and message are required.",
//       });
//     }

//     // Spam guard: max 3 messages per email per 24 hours
//     const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
//     const recentCount = await Contact.countDocuments({
//       email: email.toLowerCase().trim(),
//       createdAt: { $gte: oneDayAgo },
//     });

//     if (recentCount >= 3) {
//       return res.status(429).json({
//         success: false,
//         message: "Too many messages. Please wait 24 hours before sending again.",
//       });
//     }

//     // Save to MongoDB
//     const contact = await Contact.create({
//       name: name.trim(),
//       email: email.toLowerCase().trim(),
//       subject: subject?.trim() || "No subject",
//       message: message.trim(),
//       ipAddress: req.ip,
//       userAgent: req.headers["user-agent"],
//     });

//     // Fire-and-forget email notification (non-blocking)
//     sendContactNotification({ name, email, subject, message });

//     return res.status(201).json({
//       success: true,
//       message: "Message received! I'll get back to you within 24 hours.",
//       data: {
//         id: contact._id,
//         name: contact.name,
//         email: contact.email,
//         subject: contact.subject,
//         createdAt: contact.createdAt,
//       },
//     });
//   } catch (error) {
//     // Mongoose validation errors → 400
//     if (error.name === "ValidationError") {
//       const messages = Object.values(error.errors).map((e) => e.message);
//       return res.status(400).json({
//         success: false,
//         message: messages[0] || "Validation failed",
//         errors: messages,
//       });
//     }

//     console.error("submitContact error:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error. Please try again later.",
//     });
//   }
// };

// // ─────────────────────────────────────────────
// // GET /api/contact/messages  [Admin]
// // Returns all messages with pagination & filter
// // ─────────────────────────────────────────────
// export const getMessages = async (req, res) => {
//   try {
//     const page = Math.max(1, parseInt(req.query.page) || 1);
//     const limit = Math.min(50, parseInt(req.query.limit) || 20);
//     const status = req.query.status; // unread | read | replied
//     const skip = (page - 1) * limit;

//     const filter = {};
//     if (status && ["unread", "read", "replied"].includes(status)) {
//       filter.status = status;
//     }

//     const [messages, total] = await Promise.all([
//       Contact.find(filter)
//         .sort({ createdAt: -1 })
//         .skip(skip)
//         .limit(limit)
//         .lean(),
//       Contact.countDocuments(filter),
//     ]);

//     // Summary counts
//     const [unread, read, replied] = await Promise.all([
//       Contact.countDocuments({ status: "unread" }),
//       Contact.countDocuments({ status: "read" }),
//       Contact.countDocuments({ status: "replied" }),
//     ]);

//     return res.json({
//       success: true,
//       data: {
//         messages,
//         pagination: {
//           total,
//           page,
//           pages: Math.ceil(total / limit),
//           limit,
//         },
//         summary: { unread, read, replied, total: unread + read + replied },
//       },
//     });
//   } catch (error) {
//     console.error("getMessages error:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ─────────────────────────────────────────────
// // PATCH /api/contact/messages/:id  [Admin]
// // Update message status
// // ─────────────────────────────────────────────
// export const updateMessageStatus = async (req, res) => {
//   try {
//     const { status } = req.body;

//     if (!["unread", "read", "replied"].includes(status)) {
//       return res.status(400).json({
//         success: false,
//         message: "Status must be: unread | read | replied",
//       });
//     }

//     const message = await Contact.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true, runValidators: true }
//     );

//     if (!message) {
//       return res.status(404).json({ success: false, message: "Message not found" });
//     }

//     return res.json({ success: true, data: message });
//   } catch (error) {
//     console.error("updateMessageStatus error:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ─────────────────────────────────────────────
// // DELETE /api/contact/messages/:id  [Admin]
// // Delete a message
// // ─────────────────────────────────────────────
// export const deleteMessage = async (req, res) => {
//   try {
//     const message = await Contact.findByIdAndDelete(req.params.id);

//     if (!message) {
//       return res.status(404).json({ success: false, message: "Message not found" });
//     }

//     return res.json({ success: true, message: "Message deleted successfully" });
//   } catch (error) {
//     console.error("deleteMessage error:", error);
//     return res.status(500).json({ success: false, message: "Server error" });
//   }
// };






























import Contact from "../models/Contact.js";
import { sendContactNotification } from "../config/mailer.js"; // ← lowercase 'm' — must match filename exactly

// ─────────────────────────────────────────────
// POST /api/contact
// Public — submit a contact form message
// ─────────────────────────────────────────────
export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Basic required field check (Mongoose handles deeper validation)
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    // Spam guard: max 3 messages per email per 24 hours
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentCount = await Contact.countDocuments({
      email: email.toLowerCase().trim(),
      createdAt: { $gte: oneDayAgo },
    });

    if (recentCount >= 3) {
      return res.status(429).json({
        success: false,
        message: "Too many messages. Please wait 24 hours before sending again.",
      });
    }

    // Save to MongoDB first — even if email fails, message is stored
    const contact = await Contact.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      subject: subject?.trim() || "No subject",
      message: message.trim(),
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    console.log(`✅ Contact saved to MongoDB: ${contact._id} from ${contact.email}`);

    // Send email notification to YOU (non-blocking — won't fail the API response)
    // The recruiter's email is passed as 'email' → used as replyTo in the notification
    sendContactNotification({
      name: contact.name,
      email: contact.email,       // ← recruiter's email (used as replyTo)
      subject: contact.subject,
      message: contact.message,
    }).then((sent) => {
      if (sent) {
        console.log(`📧 Email notification sent to ${process.env.EMAIL_TO || process.env.EMAIL_USER}`);
      } else {
        console.warn(`⚠️  Email notification failed for contact ${contact._id} — message still saved to DB`);
      }
    });

    return res.status(201).json({
      success: true,
      message: "Message received! I'll get back to you within 24 hours.",
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        createdAt: contact.createdAt,
      },
    });
  } catch (error) {
    // Mongoose validation errors → 400
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({
        success: false,
        message: messages[0] || "Validation failed",
        errors: messages,
      });
    }

    console.error("submitContact error:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// ─────────────────────────────────────────────
// GET /api/contact/messages  [Admin]
// Returns all messages with pagination & filter
// ─────────────────────────────────────────────
export const getMessages = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, parseInt(req.query.limit) || 20);
    const status = req.query.status; // unread | read | replied
    const skip = (page - 1) * limit;

    const filter = {};
    if (status && ["unread", "read", "replied"].includes(status)) {
      filter.status = status;
    }

    const [messages, total] = await Promise.all([
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Contact.countDocuments(filter),
    ]);

    // Summary counts
    const [unread, read, replied] = await Promise.all([
      Contact.countDocuments({ status: "unread" }),
      Contact.countDocuments({ status: "read" }),
      Contact.countDocuments({ status: "replied" }),
    ]);

    return res.json({
      success: true,
      data: {
        messages,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / limit),
          limit,
        },
        summary: { unread, read, replied, total: unread + read + replied },
      },
    });
  } catch (error) {
    console.error("getMessages error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// PATCH /api/contact/messages/:id  [Admin]
// Update message status
// ─────────────────────────────────────────────
export const updateMessageStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["unread", "read", "replied"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be: unread | read | replied",
      });
    }

    const message = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    return res.json({ success: true, data: message });
  } catch (error) {
    console.error("updateMessageStatus error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─────────────────────────────────────────────
// DELETE /api/contact/messages/:id  [Admin]
// Delete a message
// ─────────────────────────────────────────────
export const deleteMessage = async (req, res) => {
  try {
    const message = await Contact.findByIdAndDelete(req.params.id);

    if (!message) {
      return res.status(404).json({ success: false, message: "Message not found" });
    }

    return res.json({ success: true, message: "Message deleted successfully" });
  } catch (error) {
    console.error("deleteMessage error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};