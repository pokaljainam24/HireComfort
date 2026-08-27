import express from "express";
import userRoutes from "./routes/user.routes.js";
import recruiterRouter from "./routes/RecruiterRoutes/recruiterRoutes.js";
import applicantRoutes from "./routes/applicantRoutes/applicantRoutes.js"; 
import companyRoutes from "./routes/RecruiterRoutes/companyRoutes.js";


const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/applicants", applicantRoutes);

// Recruiter routes
app.use("/api/recruiters", recruiterRouter);
app.use("/api/companies", companyRoutes); // Add this line to handle company routes


export default app;
