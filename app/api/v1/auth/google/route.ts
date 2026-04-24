import { NextRequest, NextResponse } from "next/server";
import { OAuth2Client } from "google-auth-library";
import User from "@/models/User";
import { connectDB } from "@/lib/db";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/auth";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { message: "No token provided" },
        { status: 400 }
      );
    }

    // ✅ Verify Google token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email) {
      return NextResponse.json(
        { message: "Invalid Google token" },
        { status: 401 }
      );
    }

    const { email, name, picture, sub } = payload;

    // 🔍 Check user
    let user = await User.findOne({ email });

    if (!user) {
      // 👉 Create new user
      user = await User.create({
        name,
        email,
        password: null, // Google user has no password
        googleId: sub,
        avatar: picture,
      });
    }

    // 🔑 Generate your tokens
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
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Google auth failed" },
      { status: 500 }
    );
  }
}