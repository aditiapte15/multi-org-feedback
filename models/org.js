import mongoose from 'mongoose';

const OrgSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.models.Org || mongoose.model('Org', OrgSchema);
