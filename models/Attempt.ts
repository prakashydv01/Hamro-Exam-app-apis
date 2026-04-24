import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IAttempt extends Document {
  userId: mongoose.Types.ObjectId;

  type: "practice" | "mocktest";

  faculty: string;
  subject?: string;

  questions: {
    questionId: mongoose.Types.ObjectId;
    selectedAnswer: number | null;
    correctAnswer: number;
    isCorrect: boolean;
  }[];

  totalQuestions: number;
  correctCount: number;
  wrongCount: number;
  skippedCount: number;

  score: number;
  negativeMarks: number;
  finalScore: number;

  startedAt: Date;
  submittedAt: Date;
}

const AttemptSchema = new Schema<IAttempt>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    type: {
      type: String,
      enum: ["practice", "mocktest"],
      required: true,
    },

    faculty: {
      type: String,
      required: true,
    },

    subject: String,

    questions: [
      {
        questionId: {
          type: Schema.Types.ObjectId,
          ref: "Question",
        },
        selectedAnswer: {
          type: Number,
          default: null,
        },
        correctAnswer: Number,
        isCorrect: Boolean,
      },
    ],

    totalQuestions: Number,
    correctCount: Number,
    wrongCount: Number,
    skippedCount: Number,

    score: Number,
    negativeMarks: Number,
    finalScore: Number,

    startedAt: Date,
    submittedAt: Date,
  },
  { timestamps: true }
);

export default models.Attempt || model<IAttempt>("Attempt", AttemptSchema);