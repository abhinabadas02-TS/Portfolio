import mongoose from "mongoose";

const chatLogSchema = new mongoose.Schema(
  {
    // Groups messages from the same browser session together
    sessionId: {
      type: String,
      required: true,
      index: true,
    },
    userMessage: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    botReply: {
      type: String,
      required: true,
      trim: true,
      maxlength: 4000,
    },
    // Whether the AI judged the question in-scope (portfolio-related)
    // or declined it as off-topic
    wasOnTopic: {
      type: Boolean,
      default: true,
    },
    ipAddress: {
      type: String,
      select: false,
    },
  },
  { timestamps: true }
);

chatLogSchema.index({ createdAt: -1 });

export default mongoose.model("ChatLog", chatLogSchema);