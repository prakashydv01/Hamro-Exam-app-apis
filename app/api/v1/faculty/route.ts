import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MCQController } from "@/controllers/mcq.controller";
import { errorHandler } from "@/middlewares/error.middleware";

export async function GET() {
  try {
    await connectDB();

    const data = await MCQController.getFaculties();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return errorHandler(error);
  }
}