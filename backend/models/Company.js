import { Schema, model } from "mongoose";

// Company Schema
const companySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  logo: { type: String },
  website: { type: String },
  industry: { type: String },
  size: {
    type: String,
    enum: ["1-10", "11-50", "51-200", "201-500", "501-1000", "1000+"],
  },
  location: {
    city: { type: String },
    state: { type: String },
    country: { type: String },
  },
  foundedYear: { type: Number },
  socials: {
    linkedin: { type: String },
    twitter: { type: String },
  },
  recruiters: [{ type: Schema.Types.ObjectId, ref: "User" }],
  jobs: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Company = model("Company", companySchema);
