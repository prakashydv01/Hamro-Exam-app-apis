import mongoose, { Schema, Document, models, model } from "mongoose";

export interface IFaculty extends Document {
  name: string;
  slug: string;

  description?: string;

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const FacultySchema = new Schema<IFaculty>(
  {
    name: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true, // e.g. bsc-csit
    },

    description: String,

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default models.Faculty || model<IFaculty>("Faculty", FacultySchema);