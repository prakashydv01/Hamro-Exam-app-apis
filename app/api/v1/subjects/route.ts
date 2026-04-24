import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MCQController } from "@/controllers/mcq.controller";
import { errorHandler } from "@/middlewares/error.middleware";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const faculty = searchParams.get("faculty");

    const data = await MCQController.getSubjects(faculty as string);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return errorHandler(error);
  }
}