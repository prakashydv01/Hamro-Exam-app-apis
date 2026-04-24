import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET!;

export interface AuthRequest extends NextRequest {
  user?: { userId: string };
}

export const verifyAuth = (req: NextRequest) => {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Error("Unauthorized");
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, ACCESS_SECRET) as {
      userId: string;
    };

    return decoded; // return user data
  } catch (err) {
    throw new Error("Unauthorized");
  }
};