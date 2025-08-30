import mongoose from "mongoose";

const responseSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: "Form", required: true },
  answers: { type: Object, required: true }, // key: question, value: answer
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Response ||
  mongoose.model("Response", responseSchema);
