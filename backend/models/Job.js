import { Schema, model } from "mongoose";

const jobSchema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
  },
  salaryRange: {
    min: { type: String },
    max: { type: String },
  },
  tags: [{ type: String }],
  socials: {
    linkedin: { type: String },
    twitter: { type: String },
    website: { type: String },
  },
  frequency: {
    type: String,
    enum: ["hourly", "monthly", "yearly"],
    required: true,
    default: "yearly",
  },
  skillsRequired: { type: String },
  postedAt: { type: Date, default: Date.now },
  applicants: [{ type: Schema.Types.ObjectId, ref: "Application" }],
  status: { type: String, enum: ["open", "closed"], default: "open" },
  jobType: {
    type: String,
    enum: ["full time", "part time", "internship"],
    required: true,
    default: "full time",
  },
  workFrom: {
    type: String,
    enum: ["remote", "on-site", "hybrid"],
    default: "on-site",
  },
  experience: {
    type: String,
    enum: ["entry-level", "mid-level", "senior-level"],
    required: true,
  },
});

export default model("Job", jobSchema);
