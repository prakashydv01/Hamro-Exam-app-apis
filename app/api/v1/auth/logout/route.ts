import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Token required" },
        { status: 400 }
      );
    }

    const user = await User.findOne({ refreshToken });

    if (user) {
      user.refreshToken = null;
      await user.save();
    }

    return NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Logout failed" },
      { status: 500 }
    );
  }
}