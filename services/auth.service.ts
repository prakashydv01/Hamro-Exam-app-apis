import bcrypt from "bcryptjs";
import User from "@/models/User";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/lib/auth";

export const AuthService = {
  async register({ name, email, password }: any) {
    const existing = await User.findOne({ email });
    if (existing) {
      const err: any = new Error("User already exists");
      err.statusCode = 400;
      throw err;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return {
      id: user._id,
      email: user.email,
    };
  },

  async login({ email, password }: any) {
    const user = await User.findOne({ email });

    if (!user || !user.password) {
      const err: any = new Error("Invalid credentials");
      err.statusCode = 400;
      throw err;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const err: any = new Error("Invalid credentials");
      err.statusCode = 400;
      throw err;
    }

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

  async googleLogin(payload: any) {
    const { email, name, picture, sub } = payload;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        googleId: sub,
        avatar: picture,
        password: null,
      });
    }

    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    return {
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    };
  },
};