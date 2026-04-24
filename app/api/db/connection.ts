import { connectDB } from "@/lib/db";

export const connectToDatabase = async () => {
  try {
    const connection = await connectDB();
    console.log("Database connected successfully");
    return connection;
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};