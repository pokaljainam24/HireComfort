import express from "express";
import recruiterRouter from "./routes/RecruiterRoutes/recruiterRoutes.js";
import applicantRoutes from "./routes/applicantRoutes/applicantRoutes.js";
// import authRouter from "./routes/auth/authRoutes.js";
import adminRouter from "./routes/admin/adminRoutes.js";

import cors from "cors";
import companyRoutes from "./routes/RecruiterRoutes/companyRoutes.js";
import notificationRoutes from "./routes/notification/notification.js";
import jobMasterRoutes from "./routes/RecruiterRoutes/JobMasterRoutes.js";
import jobApplicationMasterRoutes from "./routes/RecruiterRoutes/JobapplicationMasterRoutes.js";
import chatMessageRoutes from "./routes/Chat-MessageRoutes/MessageRoute.js";
import interviewMasterRoutes from "./routes/RecruiterRoutes/InterviewMasterRoutes.js";

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
app.use("/api/notification", notificationRoutes);
app.use("/api/job_master", jobMasterRoutes);
app.use("/api/job_application_master", jobApplicationMasterRoutes);
app.use("/api/messages", chatMessageRoutes);
app.use("/api/interview_master", interviewMasterRoutes);

export default app;
