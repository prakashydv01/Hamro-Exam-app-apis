import { NextRequest } from "next/server";
import { connectDB } from "@/lib/db";
import { verifyAuth } from "@/middlewares/auth.middleware";
import { UserService } from "@/services/user.service";
import { successResponse, errorResponse } from "@/utils/response";
import { z } from "zod";

// ✅ inline validator (or move to validators.ts)
const updateSchema = z.object({
  name: z.string().min(2).optional(),
  avatar: z.string().url().optional(),
});

export async function PUT(req: NextRequest) {
  try {
    await connectDB();

    // 🔐 auth
    const user = verifyAuth(req);

    // 📥 body
    const body = await req.json();

    const data = updateSchema.parse(body);

    // 📦 service
    const updatedUser = await UserService.updateProfile(
      user.userId,
      data
    );

    return successResponse(updatedUser, "Profile updated");
  } catch (error: any) {
    return errorResponse(error.message, error.statusCode || 500);
  }
}