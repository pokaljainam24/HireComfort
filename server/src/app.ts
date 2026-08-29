import express from "express";
import recruiterRouter from "./routes/RecruiterRoutes/recruiterRoutes.js";
import applicantRoutes from "./routes/applicantRoutes/applicantRoutes.js";
// import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/adminRoutes.js";

import cors from "cors";
import companyRoutes from "./routes/RecruiterRoutes/companyRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(express.json());
// Admin routes
app.use("/api/admin", adminRouter);

// Auth routes
// app.use("/api/auth", authRouter);

// Applicant routes
app.use("/api/applicants/", applicantRoutes);
// Recruiter routes
app.use("/api/recruiters", recruiterRouter);
app.use("/api/companies", companyRoutes);

export default app;
