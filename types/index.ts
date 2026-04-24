// ========================
// AUTH
// ========================

export interface JwtPayload {
  userId: string;
}

// ========================
// USER
// ========================

export interface IUserSafe {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

// ========================
// MCQ
// ========================

export interface IAnswer {
  questionId: string;
  selectedAnswer: number | null;
}

export interface ISubmitAttempt {
  type: "practice" | "mocktest";
  faculty: string;
  subject?: string;
  answers: IAnswer[];
  startedAt: string;
}

// ========================
// API RESPONSE
// ========================

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
}

// ========================
// ERROR
// ========================

export interface ApiError extends Error {
  statusCode?: number;
  retryAfter?: number;
}