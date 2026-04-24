import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import { connectDB } from "@/lib/db";

// 🔐 REGISTER API
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    const existing = await User.findOne({ email });

    if (existing) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      userId: user._id,
    });
  } catch (err) {
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}