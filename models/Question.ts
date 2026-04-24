import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IQuestion extends Document {
  question: string;
  options: string[];
  correctAnswer: number; // index (0,1,2,3)

  faculty: string; // bsc-csit
  subject: string; // physics, math

  difficulty: "easy" | "medium" | "hard";

  explanation?: string;

  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    question: {
      type: String,
      required: true,
    },

    options: {
      type: [String],
      required: true,
      validate: [(val: string[]) => val.length === 4, "Must have 4 options"],
    },

    correctAnswer: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },

    faculty: {
      type: String,
      required: true,
      index: true,
    },

    subject: {
      type: String,
      required: true,
      index: true,
    },

    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },

    explanation: String,
  },
  { timestamps: true }
);

export default models.Question || model<IQuestion>("Question", QuestionSchema);