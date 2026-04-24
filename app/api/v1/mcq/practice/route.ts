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

    const query = {
      subject: searchParams.get("subject"),
      faculty: searchParams.get("faculty"),
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "20",
    };

    const data = await MCQController.getPracticeQuestions(query);

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    return errorHandler(error);
  }
}