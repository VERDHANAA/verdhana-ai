// Upstash Redis REST API helper
// Used for: caching AI responses, rate limiting

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisCall(command: string[]) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    console.error("Upstash Redis not configured");
    return null;
  }

  try {
    const res = await fetch(`${REDIS_URL}/${command.map(encodeURIComponent).join("/")}`, {
      headers: {
        Authorization: `Bearer ${REDIS_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error("Redis error:", await res.text());
      return null;
    }

    const data = await res.json();
    return data.result;
  } catch (e: any) {
    console.error("Redis call failed:", e.message);
    return null;
  }
}

// ============================================
// CACHE: store/get AI responses
// ============================================

export async function cacheGet(key: string): Promise<any | null> {
  const result = await redisCall(["GET", `cache:${key}`]);
  if (!result) return null;
  try {
    return JSON.parse(result);
  } catch {
    return result;
  }
}

export async function cacheSet(
  key: string,
  value: any,
  ttlSeconds: number = 86400 // default 24 hours
): Promise<boolean> {
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);
  const result = await redisCall([
    "SET",
    `cache:${key}`,
    stringValue,
    "EX",
    String(ttlSeconds),
  ]);
  return result === "OK";
}

// Generate cache key from product slug + inputs
export function generateCacheKey(
  slug: string,
  inputs: Record<string, string>,
  model: string,
  polish: boolean
): string {
  const inputStr = Object.keys(inputs)
    .sort()
    .map((k) => `${k}=${(inputs[k] || "").trim().toLowerCase()}`)
    .join("|");
  // Simple hash
  let hash = 0;
  const str = `${slug}::${model}::${polish ? "p" : ""}::${inputStr}`;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return `${slug}:${Math.abs(hash).toString(36)}`;
}

// ============================================
// RATE LIMIT: fast counter
// ============================================

export async function rateLimitIncr(
  userId: string,
  type: "gen" | "polish" = "gen"
): Promise<number> {
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
  const key = `rl:${type}:${userId}:${today}`;

  // INCR returns new count
  const count = await redisCall(["INCR", key]);
  if (count === null) return -1; // Redis failed, fallback to DB

  // Set expiry only on first increment (count === 1)
  if (count === 1) {
    await redisCall(["EXPIRE", key, "86400"]); // 24 hours
  }

  return typeof count === "number" ? count : parseInt(String(count), 10);
}

export async function rateLimitGet(
  userId: string,
  type: "gen" | "polish" = "gen"
): Promise<number> {
  const today = new Date().toISOString().split("T")[0];
  const key = `rl:${type}:${userId}:${today}`;
  const result = await redisCall(["GET", key]);
  if (result === null) return 0;
  return typeof result === "number" ? result : parseInt(String(result), 10) || 0;
}

export async function rateLimitDecr(
  userId: string,
  type: "gen" | "polish" = "gen"
): Promise<void> {
  // Used to rollback if generate fails
  const today = new Date().toISOString().split("T")[0];
  const key = `rl:${type}:${userId}:${today}`;
  await redisCall(["DECR", key]);
}
