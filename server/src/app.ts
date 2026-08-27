import express from "express";
import userRoutes from "./routes/user.routes.js";
import recruiterRouter from "./routes/RecruiterRoutes/recruiterRoutes.js";
import applicantRoutes from "./routes/applicantRoutes/applicantRoutes.js"; 


const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/applicants", applicantRoutes);
app.use("/api/recruiters", recruiterRouter);

export default app;
