import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Attempt from "@/models/Attempt";
import { verifyAuth } from "@/middlewares/auth.middleware";
import { errorHandler } from "@/middlewares/error.middleware";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const user = verifyAuth(req);

    const { searchParams } = new URL(req.url);
    const attemptId = searchParams.get("attemptId");

    if (!attemptId) {
      return NextResponse.json(
        { success: false, message: "attemptId is required" },
        { status: 400 }
      );
    }

    const attempt = await Attempt.findOne({
      _id: attemptId,
      userId: user.userId,
    }).populate("questions.questionId");

    if (!attempt) {
      return NextResponse.json(
        { success: false, message: "Result not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: attempt,
    });
  } catch (error) {
    return errorHandler(error);
  }
}