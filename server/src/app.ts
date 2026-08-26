import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
import connectDB from "./config/database.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/users", userRoutes);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

startServer();
