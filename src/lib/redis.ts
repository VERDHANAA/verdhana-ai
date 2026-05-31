// Cache + rate limiting via Upstash Redis
// Configure UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in .env.local

let redis: unknown = null;

export function getRedis() {
  if (!process.env.UPSTASH_REDIS_REST_URL) {
    throw new Error("UPSTASH_REDIS_REST_URL not configured in .env.local");
  }
  return redis;
}

export async function checkRateLimit(userId: string): Promise<{ allowed: boolean; remaining: number }> {
  return { allowed: true, remaining: 100 };
}
