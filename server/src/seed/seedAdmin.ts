import dotenv from "dotenv";
import bcrypt from "bcryptjs";

import connectDB from "../config/database.js";
import AdminMaster from "../models/AdminModel/AdminModel.js";

dotenv.config();

const seedAdmin = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash("admin1", 10);

    const admin = await AdminMaster.findOneAndUpdate(
      {
        username: "admin12346",
      },
      {
        username: "admin12346",
        password: hashedPassword,

        isActive: true,
        isDisplay: true,

        createdAt: new Date(),
        createdBy: "system",

        updatedAt: new Date(),
        updatedBy: null,

        deleteAt: null,
        deleteBy: null,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    console.log("Admin created/updated successfully");
    console.log("Username:", admin.username);
    console.log("Password: admin1");

    process.exit(0);
  } catch (error) {
    console.error("Admin seed failed:", error);
    process.exit(1);
  }
};

seedAdmin();
