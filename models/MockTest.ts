import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IMockTest extends Document {
  title: string;

  faculty: string;

  totalQuestions: number;
  duration: number; // in minutes

  negativeMarking: boolean;
  negativeValue: number; // e.g. 0.25

  subjects: {
    subject: string;
    questionCount: number;
  }[];

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const MockTestSchema = new Schema<IMockTest>(
  {
    title: {
      type: String,
      required: true,
    },

    faculty: {
      type: String,
      required: true,
      index: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },

    negativeMarking: {
      type: Boolean,
      default: false,
    },

    negativeValue: {
      type: Number,
      default: 0,
    },

    subjects: [
      {
        subject: String,
        questionCount: Number,
      },
    ],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default models.MockTest || model<IMockTest>("MockTest", MockTestSchema);