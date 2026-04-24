import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  try {
    const dbState = mongoose.connection.readyState;

    let dbStatus = "disconnected";

    if (dbState === 1) dbStatus = "connected";
    if (dbState === 2) dbStatus = "connecting";
    if (dbState === 0) dbStatus = "disconnected";

    return NextResponse.json({
      success: true,
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),

      services: {
        database: dbStatus,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        status: "error",
        message: "Health check failed",
      },
      { status: 500 }
    );
  }
}