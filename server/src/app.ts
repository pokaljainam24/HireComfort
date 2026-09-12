import express from "express";
import cookieParser from "cookie-parser";
import applicantRoutes from "./routes/applicantRoutes/applicantRoutes.js";
// import authRouter from "./routes/auth/authRoutes.js";

import cors from "cors";

// AdminPannel Menues routes
import joobCategoryRoutes from "./routes/jobCategoryRoutes/jobCategoryRoutes.js";
import jobSubCategoryRoutes from "./routes/jobSubCategoryRoutes/jobSubCategoryRoutes.js";
import blogRoutes from "./routes/blogRoutes/blogRoutes.js";
import cmsRoutes from "./routes/cmsRoutes/cmsRoutes.js";
import faqRoutes from "./routes/FaqRoutes/faqRoutes.js";
import emailCredentialRoutes from "./routes/EmailCredentialRoutes/emailCredentialRoutes.js";
import emailTemplatesRoutes from "./routes/EmailTemplatesRoutes/emailTemplatesRoutes.js";
import QualificationRoutes from "./routes/QualificationRoutes/qualificationRoutes.js";
import SkillRoutes from "./routes/SkillsRoutes/skillsRoutes.js";
import contactRoutes from "./routes/ContactRoutes/contactRoutes.js";

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
// Industry Routes
import industryRoutes from "./routes/IndustryRoutes/IndustryRoutes.js";

// Employment Type Routes
import employmentTypeRoutes from "./routes/EmploymentTypeRoutes/EmploymentTypeRoutes.js";

// Country Routes
import countryRoutes from "./routes/CountryRoutes/CountryRoutes.js";

// State Routes
import stateRoutes from "./routes/StateRoutes/StateRoutes.js";

// City Routes
import cityRoutes from "./routes/CityRoutes/CityRoutes.js";

// auth
import signupRoutes from "./routes/SignUpRoutes/SignUpRoutes.js";

// login routes
import loginRoutes from "./routes/LoginRoutes/LoginRoutes.js";
//visitor routes
import visitorRoutes from "./routes/VisitorRoutes/VisitorRoutes.js";

import path from "path";

const app = express();


app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use(cookieParser());

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Admin Menues routes
app.use("/api/job-categories", joobCategoryRoutes);
app.use("/api/job-sub-categories", jobSubCategoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/cms", cmsRoutes);
app.use("/api/faqs", faqRoutes);
app.use("/api/email-credentials", emailCredentialRoutes);
app.use("/api/email-templates", emailTemplatesRoutes);
app.use("/api/qualifications", QualificationRoutes);
app.use("/api/skills", SkillRoutes);
app.use("/api/contacts", contactRoutes);

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
// Industry Routes
app.use("/api/industries", industryRoutes);

// Employment Type Routes
app.use("/api/employment-types", employmentTypeRoutes);

app.use("/api/countries", countryRoutes);

app.use("/api/states", stateRoutes);

app.use("/api/cities", cityRoutes);

app.use("/api/auth", signupRoutes);

app.use("/api/auth", loginRoutes);

app.use("/api/visitor", visitorRoutes);


export default app;


