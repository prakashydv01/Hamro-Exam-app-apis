const rateLimitMap = new Map<string, { count: number; time: number }>();

const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 30; // per minute per IP

export const rateLimit = (ip: string) => {
  const now = Date.now();

  const userData = rateLimitMap.get(ip);

  if (!userData) {
    rateLimitMap.set(ip, { count: 1, time: now });
    return;
  }

  if (now - userData.time < WINDOW_SIZE) {
    userData.count++;

    if (userData.count > MAX_REQUESTS) {
      throw new Error("Too many requests. Try again later.");
    }
  } else {
    rateLimitMap.set(ip, { count: 1, time: now });
  }
};