import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAuth } from "@/middlewares/auth.middleware";
import { UserService } from "@/services/user.service";
import { successResponse, errorResponse } from "@/utils/response";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // 🔐 auth
    const user = verifyAuth(req);

    // 📦 service
    const data = await UserService.getProfile(user.userId);

    return successResponse(data, "Profile fetched");
  } catch (error: any) {
    return errorResponse(error.message, error.statusCode || 500);
  }
}