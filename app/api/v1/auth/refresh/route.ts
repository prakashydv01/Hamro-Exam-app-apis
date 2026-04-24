import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { refreshToken } = await req.json();

    if (!refreshToken) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 401 }
      );
    }

    const decoded = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(decoded.userId);

    return NextResponse.json({
      success: true,
      accessToken: newAccessToken,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 401 }
    );
  }
}