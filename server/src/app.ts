import express from "express";
import userRoutes from "./routes/user.routes.js";
import recruiterRouter from "./routes/recruiter.routes.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

// Recruiter routes
app.use("/api/recruiters", recruiterRouter);

export default app;
