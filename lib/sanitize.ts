// Input sanitization helpers

const MAX_INPUT_LENGTH = 2000;
const MAX_FIELD_COUNT = 20;

export function sanitizeInputs(
  inputs: Record<string, any> | undefined | null
): Record<string, string> {
  if (!inputs || typeof inputs !== "object") return {};

  const cleaned: Record<string, string> = {};
  const keys = Object.keys(inputs).slice(0, MAX_FIELD_COUNT);

  for (const key of keys) {
    // Only allow simple alphanumeric keys
    if (!/^[a-zA-Z0-9_-]{1,50}$/.test(key)) continue;

    const value = inputs[key];
    if (typeof value !== "string") continue;

    // Strip control characters, limit length
    const trimmed = value
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "")
      .trim()
      .slice(0, MAX_INPUT_LENGTH);

    if (trimmed.length > 0) {
      cleaned[key] = trimmed;
    }
  }

  return cleaned;
}

export function sanitizeSlug(slug: any): string | null {
  if (typeof slug !== "string") return null;
  if (!/^[a-z0-9-]{1,50}$/.test(slug)) return null;
  return slug;
}

export function sanitizeModel(model: any): string {
  const allowed = ["fast", "balanced", "premium", "ultra"];
  if (typeof model !== "string") return "fast";
  return allowed.includes(model) ? model : "fast";
}

// Hash function using Web Crypto (replaces simple-hash cache key)
export async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 24); // Truncate to 24 chars (still unique enough)
}
