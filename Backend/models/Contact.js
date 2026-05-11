import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [80, "Name too long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    },
    subject: {
      type: String,
      trim: true,
      maxlength: [150, "Subject too long"],
      default: "No subject",
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
      minlength: [10, "Message must be at least 10 characters"],
      maxlength: [2000, "Message too long (max 2000 characters)"],
    },
    // Status tracking
    status: {
      type: String,
      enum: ["unread", "read", "replied"],
      default: "unread",
    },
    // Store the sender's IP for spam protection (hashed/truncated)
    ipAddress: {
      type: String,
      select: false, // not returned in normal queries
    },
    // User agent for context
    userAgent: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

// Index for fast querying by status and date
contactSchema.index({ status: 1, createdAt: -1 });
contactSchema.index({ email: 1 });

export default mongoose.model("Contact", contactSchema);