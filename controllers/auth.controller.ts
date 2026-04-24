import bcrypt from "bcryptjs";
import User from "@/models/User";
import { generateAccessToken, generateRefreshToken } from "@/lib/auth";

export const AuthController = {
  async register(data: any) {
    const { name, email, password } = data;

    const existing = await User.findOne({ email });
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    return {
      userId: user._id,
    };
  },

  async login(data: any) {
    const { email, password } = data;

    const user = await User.findOne({ email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password!);
    if (!isMatch) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  },
};