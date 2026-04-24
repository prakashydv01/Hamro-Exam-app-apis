import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return NextResponse.json({
      success: true,
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}