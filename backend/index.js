import applicationRouter from "./routes/application.routes.js";
import authRouter from "./routes/auth.routes.js";
import companyRoutes from "./routes/company.routes.js";
import connectDB from "./db/db.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import inviteCodeRouter from "./routes/invitecode.routes.js";
import jobsRouter from "./routes/job.routes.js";
import morgan from "morgan";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swaggerOptions.js"; // Ensure correct import

dotenv.config();

// Initialize Express app
const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.set("trust proxy", 1);

// CORS setup
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    origin: [
      "http://localhost:5173",
      "http://localhost:4173",
      "http://localhost:8000",
      "http://localhost:3000",
      "https://job-portal-mern-sigma.vercel.app",
      ...(process.env.FRONTEND_URL
        ? process.env.FRONTEND_URL.split(",").map((url) => url.trim())
        : []),
    ],
    credentials: true,
  })
);

app.options("*", cors());

app.use((err, req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next(err);
});

// Swagger setup
const specs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Test route (can be removed later)
app.get("/", (req, res) => {
  res.json({
    status: "Server is running!",
    allowedURL: process.env.FRONTEND_URL.split(",").map((url) => url.trim()),
  });
});

// Route handlers
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/jobs", jobsRouter);
app.use("/api/invitecode", inviteCodeRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/company", companyRoutes);

// Error-handling middleware (place this at the end)
app.use((err, req, res, next) => {
  console.error(err.stack); // Optional: log the error stack for debugging
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    status: err.status || 500,
  });
});

// Connect to MongoDB
connectDB().then(() => {
  // Start the server
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});
