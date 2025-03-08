export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Job Portal API Documentation",
      version: "1.0.0",
      description:
        "API documentation for the Job Portal project, providing endpoints for user authentication, job listings, and application management.",
    },
    servers: [
      {
        url: "https://job-portal-mern-tw7s.onrender.com", // Use environment variable for production
      },
    ],
  },
  apis: ["./routes/*.js", "./models/*.js"], // Path to the API docs (including models for better documentation)
};
