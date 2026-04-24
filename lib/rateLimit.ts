import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const rateLimit = async ({
  key,
  limit = 30,
  window = 60, // seconds
}: {
  key: string;
  limit?: number;
  window?: number;
}) => {
  const now = Date.now();
  const windowKey = `rate:${key}`;

  const current = await redis.incr(windowKey);

  // set expiry only on first request
  if (current === 1) {
    await redis.expire(windowKey, window);
  }

  if (current > limit) {
    const ttl = await redis.ttl(windowKey);

    const error: any = new Error("Too many requests");
    error.statusCode = 429;
    error.retryAfter = ttl;

    throw error;
  }

  return {
    remaining: limit - current,
  };
};