import { NextResponse } from "next/server";

export const errorHandler = (error: any) => {
  console.error("ERROR:", error);

  return NextResponse.json(
    {
      success: false,
      message: error.message || "Internal Server Error",
    },
    {
      status: error.statusCode || 500,
    }
  );
};