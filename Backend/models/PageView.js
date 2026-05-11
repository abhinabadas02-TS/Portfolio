import mongoose from "mongoose";

// One document per page per day — avoids collection bloat
const pageViewSchema = new mongoose.Schema(
  {
    page: {
      type: String,
      required: true,
      enum: ["/", "/projects", "/experience", "/contact"],
    },
    // ISO date string "YYYY-MM-DD" — for daily bucketing
    date: {
      type: String,
      required: true,
    },
    // Total hits for this page on this day
    count: {
      type: Number,
      default: 1,
    },
    // Unique visitor IPs (stored as hashed, for rough unique count)
    uniqueVisitors: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

// Compound unique index: one doc per page per day
pageViewSchema.index({ page: 1, date: 1 }, { unique: true });

export default mongoose.model("PageView", pageViewSchema);