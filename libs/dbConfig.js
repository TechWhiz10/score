// libs/dbConfig.js
import mongoose from "mongoose";

let isConnected;

export async function connectToMongoDB() {
  if (isConnected) {
    return { db: mongoose.connection };
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = true;
    console.log("MongoDB is connected");
    return { db: mongoose.connection };
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
}
