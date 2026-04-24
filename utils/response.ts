import { NextResponse } from "next/server";
import { ApiResponse } from "@/types";

export const successResponse = <T>(
  data: T,
  message = "Success",
  status = 200
) => {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      message,
      data,
    },
    { status }
  );
};

export const errorResponse = (
  message = "Something went wrong",
  status = 500
) => {
  return NextResponse.json(
    {
      success: false,
      message,
    },
    { status }
  );
};