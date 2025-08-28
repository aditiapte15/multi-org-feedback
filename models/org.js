import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  questions: [
    {
      label: String,
      type: { type: String, enum: ["text", "radio", "checkbox"], default: "text" },
      options: [String],
      required: { type: Boolean, default: false },
    },
  ],
});

const OrgSchema = new mongoose.Schema({
  orgName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  forms: [FormSchema], // ✅ keep forms inside Org
});

export default mongoose.models.Org || mongoose.model("Org", OrgSchema);
