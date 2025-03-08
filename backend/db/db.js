import { mongoose } from "mongoose";
mongoose.set("debug", true);
mongoose.set("strictPopulate", false);

const connectDB = async () => {
  mongoose.set("debug", true);
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
