// Upstash Redis REST API helper - hardened

import { sha256 } from "./sanitize";

const REDIS_URL = process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

async function redisCall(command: string[]) {
  if (!REDIS_URL || !REDIS_TOKEN) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5s timeout

    const res = await fetch(`${REDIS_URL}/${command.map(encodeURIComponent).join("/")}`, {
      headers: { Authorization: `Bearer ${REDIS_TOKEN}` },
      signal: controller.signal,
    });

    clearTimeout(timeout);

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
  ttlSeconds: number = 86400
): Promise<boolean> {
  const stringValue = typeof value === "string" ? value : JSON.stringify(value);
  // Limit value size (Upstash limit: 1MB)
  if (stringValue.length > 100000) {
    console.warn("Cache value too large, skipping cache");
    return false;
  }
  const result = await redisCall([
    "SET",
    `cache:${key}`,
    stringValue,
    "EX",
    String(ttlSeconds),
  ]);
  return result === "OK";
}

// SHA-256 cache key (collision-resistant)
export async function generateCacheKey(
  slug: string,
  inputs: Record<string, string>,
  model: string,
  polish: boolean
): Promise<string> {
  const inputStr = Object.keys(inputs)
    .sort()
    .map((k) => `${k}=${(inputs[k] || "").trim().toLowerCase()}`)
    .join("|");
  const hash = await sha256(`${slug}::${model}::${polish ? "p" : ""}::${inputStr}`);
  return `${slug}:${hash}`;
}

export async function rateLimitIncr(
  userId: string,
  type: "gen" | "polish" = "gen"
): Promise<number> {
  const today = new Date().toISOString().split("T")[0];
  const key = `rl:${type}:${userId}:${today}`;

  const count = await redisCall(["INCR", key]);
  if (count === null) return -1;

  if (count === 1) {
    await redisCall(["EXPIRE", key, "86400"]);
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
  const today = new Date().toISOString().split("T")[0];
  const key = `rl:${type}:${userId}:${today}`;
  await redisCall(["DECR", key]);
}
