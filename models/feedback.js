import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    orgId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Org",
      required: true,
    },
    responses: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

// Fix for Next.js hot-reload (avoids OverwriteModelError)
export default mongoose.models.Feedback || mongoose.model("Feedback", FeedbackSchema);
