import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { MCQController } from "@/controllers/mcq.controller";
import { verifyAuth } from "@/middlewares/auth.middleware";
import { errorHandler } from "@/middlewares/error.middleware";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const user = verifyAuth(req);

    const body = await req.json();

    const result = await MCQController.submitAttempt(
      user.userId,
      body
    );

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return errorHandler(error);
  }
}