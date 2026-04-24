import { z } from "zod";

/* =========================
   AUTH VALIDATORS
========================= */

// Register
export const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 chars"),
});

// Login
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

// Google
export const googleSchema = z.object({
  idToken: z.string().min(10),
});

/* =========================
   MCQ VALIDATORS
========================= */

// Practice query
export const practiceQuerySchema = z.object({
  subject: z.string(),
  faculty: z.string(),
  page: z.string().optional(),
  limit: z.string().optional(),
});

// Submit attempt
export const submitAttemptSchema = z.object({
  type: z.enum(["practice", "mocktest"]),
  faculty: z.string(),

  subject: z.string().optional(),

  answers: z.array(
    z.object({
      questionId: z.string(),
      selectedAnswer: z.number().nullable(),
    })
  ),

  startedAt: z.string(),
});

/* =========================
   HELPER FUNCTION
========================= */

export const validate = <T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T => {
  const result = schema.safeParse(data);

  if (!result.success) {
    const error: any = new Error(
      result.error.errors[0].message
    );
    error.statusCode = 400;
    throw error;
  }

  return result.data;
};