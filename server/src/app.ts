import express from "express";
import recruiterRouter from "./routes/RecruiterRoutes/recruiterRoutes.js";
import applicantRoutes from "./routes/applicantRoutes/applicantRoutes.js";
import authRouter from "./routes/auth.routes.js";
import adminRouter from "./routes/adminRoutes.js";

import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/recruiter", recruiterRouter);

// routes
app.use("/api/recruiters", recruiterRouter);
app.use("/api/applicants", applicantRoutes);
app.use("/api/admin", adminRouter);

export default app;
