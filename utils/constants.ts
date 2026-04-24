// ========================
// AUTH
// ========================

export const JWT = {
  ACCESS_EXPIRES_IN: "15m",
  REFRESH_EXPIRES_IN: "7d",
};

// ========================
// PAGINATION
// ========================

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 20,
  MAX_LIMIT: 50,
};

// ========================
// MCQ
// ========================

export const MCQ = {
  DEFAULT_NEGATIVE_MARK: 0.25,
};

// ========================
// RATE LIMIT
// ========================

export const RATE_LIMIT = {
  WINDOW: 60, // seconds
  MAX_REQUESTS: 30,
};

// ========================
// MESSAGES
// ========================

export const MESSAGES = {
  SUCCESS: "Success",
  UNAUTHORIZED: "Unauthorized",
  NOT_FOUND: "Resource not found",
  SERVER_ERROR: "Internal server error",
};