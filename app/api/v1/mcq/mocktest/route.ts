import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MCQController } from "@/controllers/mcq.controller";
import { verifyAuth } from "@/middlewares/auth.middleware";
import { errorHandler } from "@/middlewares/error.middleware";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    verifyAuth(req);

    const { searchParams } = new URL(req.url);
    const faculty = searchParams.get("faculty");

    if (!faculty) {
      return NextResponse.json(
        { message: "Faculty is required" },
        { status: 400 }
      );
    }

    const data = await MCQController.generateMockTest(faculty);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return errorHandler(error);
  }
}