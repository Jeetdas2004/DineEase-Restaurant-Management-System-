import mongoose from "mongoose";
import { seedInitialData } from "./seed.js";

let mongoServer = null;

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    if (process.env.MONGO_URL) {
      console.log("Connecting to provided MONGO_URL...");
      await mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("Database connected to MONGO_URL successfully");
      await seedInitialData();
      return;
    }
  } catch (error) {
    console.warn(`Connection to MONGO_URL failed (${error.message}). Falling back to memory database...`);
  }

  // Fallback: Start in-memory MongoDB (Local development only)
  if (!process.env.VERCEL) {
    try {
      console.log("Starting in-memory MongoDB server for local development...");
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log(`In-memory Database connected successfully at ${uri}`);
      await seedInitialData();
    } catch (err) {
      console.error("Critical error connecting to database:", err);
    }
  } else {
    console.error("Critical error: MONGO_URL is required when running on Vercel!");
  }
};
