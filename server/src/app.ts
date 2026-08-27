import express from "express";
import recruiterRouter from "./routes/RecruiterRoutes/recruiterRoutes.js";
import applicantRoutes from "./routes/applicantRoutes/applicantRoutes.js"; 
import companyRoutes from "./routes/RecruiterRoutes/companyRoutes.js";


const app = express();

app.use(express.json());

app.use("/api/applicants", applicantRoutes);

// Recruiter routes
app.use("/api/recruiters", recruiterRouter);
app.use("/api/companies", companyRoutes); 


export default app;
