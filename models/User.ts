import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string | null;
  avatar?: string;
  googleId?: string;

  role: "student" | "admin";

  isVerified: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    password: {
      type: String,
      default: null, // null for Google users
    },

    googleId: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
      default: null,
    },

    role: {
      type: String,
      enum: ["student", "admin"],
      default: "student",
    },

    isVerified: {
      type: Boolean,
      default: true, // Google users auto verified
    },
  },
  {
    timestamps: true,
  }
);

// Prevent model overwrite in dev (Next.js issue)
export default models.User || model<IUser>("User", UserSchema);