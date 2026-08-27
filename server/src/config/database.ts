import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const url = process.env.DB_URL;
    console.log("Database URL:", url); // Log the database URL for debugging

    if (!url)
      throw Error(
        "Could not connect to the database. The Database url is empty.",
      );
    const conn = await mongoose.connect(url);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    } else {
      console.error(error);
    }
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;
