import { Schema, model } from "mongoose";

const inviteCodeSchema = new Schema({
  code: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "recruiter", "jobSeeker"],
    required: true,
  },
  email: { type: String, required: true }, // Email of the invitee
  isUsed: { type: Boolean, default: false },
  expiresAt: { type: Date, required: true }, // Expiration time for the code
});

export default model("InviteCode", inviteCodeSchema);
