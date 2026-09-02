import express from "express";
import applicantRoutes from "./routes/applicantRoutes/applicantRoutes.js";
// import authRouter from "./routes/auth/authRoutes.js";

import cors from "cors";

// Recruiter routes
import recruiterRouter from "./routes/RecruiterRoutes/recruiterRoutes.js";
import companyRoutes from "./routes/RecruiterRoutes/companyRoutes.js";
import notificationRoutes from "./routes/notification/notification.js";
import jobMasterRoutes from "./routes/RecruiterRoutes/JobMasterRoutes.js";
import jobApplicationMasterRoutes from "./routes/RecruiterRoutes/JobapplicationMasterRoutes.js";
import chatMessageRoutes from "./routes/Chat-MessageRoutes/MessageRoute.js";
import interviewMasterRoutes from "./routes/RecruiterRoutes/InterviewMasterRoutes.js";
import authRouter from "./routes/adminRoutes.js";

// Website routes
import blogRoutes from "./routes/blogRoutes/blogRoutes.js";
import path from "path";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    credentials: true,
  }),
);
app.use(express.json());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Admin routes

// Auth routes
app.use("/api/admin", authRouter);

// Applicant routes
app.use("/api/applicants/", applicantRoutes);

// Recruiter routes
app.use("/api/recruiters", recruiterRouter);
app.use("/api/companies", companyRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/job_master", jobMasterRoutes);
app.use("/api/job_application_master", jobApplicationMasterRoutes);
app.use("/api/messages", chatMessageRoutes);
app.use("/api/interview_master", interviewMasterRoutes);

// Website routes
app.use("/api/blogs", blogRoutes);

export default app;
