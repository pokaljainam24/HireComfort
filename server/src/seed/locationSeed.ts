// TODO: Create a seed data file and run it to populate the db.

import mongoose from "mongoose";
import countriesModel from "../models/admin/countriesModel.js";

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/your-database-name";
const LocationSeed = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("MongoDB connected");

    // --------------------------------
    // 1. Countries
    // --------------------------------

    const india = await countriesModel.findOneAndUpdate(
      { code: "IN" },
      {
        name: "India",
        code: "IN",
      },
      {
        upsert: true,
        new: true,
      },
    );
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    await mongoose.disconnect();
  }
};

// LocationSeed();
