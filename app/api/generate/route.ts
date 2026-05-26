import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { createClient } from "@/lib/supabase/server";
import { runAgents } from "@/lib/agents";
import {
  cacheGet,
  cacheSet,
  generateCacheKey,
  rateLimitIncr,
  rateLimitGet,
  rateLimitDecr,
} from "@/lib/redis";

const DAILY_LIMIT = 10;
const FREE_POLISH_LIMIT = 1;

const MODEL_MAP: Record<string, string> = {
  fast: "anthropic/claude-3.5-haiku",
  balanced: "google/gemini-2.0-flash-001",
  premium: "anthropic/claude-sonnet-4",
  ultra: "anthropic/claude-opus-4",
};

export async function POST(req: NextRequest) {
  try {
    const { slug, inputs, model, polish } = await req.json();
    const product = getProduct(slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const requestedModel = model || "fast";
    if (requestedModel !== "fast") {
      return NextResponse.json(
        { error: "This model requires a Pro plan." },
        { status: 403 }
      );
    }

    // ====== RATE LIMIT (Redis first, fallback to DB) ======
    const newCount = await rateLimitIncr(user.id, "gen");

    let totalCount = newCount;
    if (newCount === -1) {
      // Redis down, fallback to Supabase counting
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
      const { count } = await supabase
        .from("generations")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", startOfDay.toISOString());
      totalCount = (count || 0) + 1;
    }

    if (totalCount > DAILY_LIMIT) {
      // Rollback Redis counter
      if (newCount !== -1) await rateLimitDecr(user.id, "gen");
      return NextResponse.json(
        {
          error: `Daily limit reached (${DAILY_LIMIT}). Resets at midnight.`,
          limitReached: true,
        },
        { status: 429 }
      );
    }

    // ====== POLISH LIMIT ======
    let usePolish = false;
    if (polish) {
      const polishCount = await rateLimitGet(user.id, "polish");
      if (polishCount >= FREE_POLISH_LIMIT) {
        if (newCount !== -1) await rateLimitDecr(user.id, "gen");
        return NextResponse.json(
          {
            error: `Free polish limit reached (${FREE_POLISH_LIMIT}/day). Upgrade to Pro for unlimited.`,
            polishLimitReached: true,
          },
          { status: 429 }
        );
      }
      usePolish = true;
    }

    // ====== CACHE CHECK ======
    const cacheKey = generateCacheKey(slug, inputs, requestedModel, usePolish);
    const cached = await cacheGet(cacheKey);

    if (cached && cached.result) {
      // Cache hit - still increment polish counter if used (so user counts as having tried)
      if (usePolish) await rateLimitIncr(user.id, "polish");

      // Log to DB for analytics (with cache flag)
      await supabase.from("generations").insert({
        user_id: user.id,
        product_slug: slug,
        inputs,
        result: cached.result,
        model: MODEL_MAP[requestedModel],
        quality_score: cached.score || null,
        was_polished: usePolish,
      });

      return NextResponse.json({
        result: cached.result,
        polished: usePolish,
        score: cached.score || null,
        edited: cached.edited || false,
        remaining: DAILY_LIMIT - totalCount,
        cached: true,
      });
    }

    // ====== GENERATE ======
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      if (newCount !== -1) await rateLimitDecr(user.id, "gen");
      return NextResponse.json({ error: "Server not configured." }, { status: 500 });
    }

    const userMessage = product.fields
      .map((f) => `${f.label}: ${inputs?.[f.id] || "(not provided)"}`)
      .join("\n");

    let result;
    try {
      result = await runAgents(
        apiKey,
        product.systemPrompt,
        userMessage,
        MODEL_MAP[requestedModel],
        usePolish
      );
    } catch (e: any) {
      // Rollback counters on error
      if (newCount !== -1) await rateLimitDecr(user.id, "gen");
      throw e;
    }

    // ====== POLISH INCR (only if actually used polish successfully) ======
    if (usePolish) await rateLimitIncr(user.id, "polish");

    // ====== SAVE TO DB ======
    await supabase.from("generations").insert({
      user_id: user.id,
      product_slug: slug,
      inputs,
      result: result.finalText,
      model: MODEL_MAP[requestedModel],
      quality_score: usePolish ? result.score : null,
      was_polished: usePolish,
    });

    // ====== SAVE TO CACHE (fire and forget) ======
    cacheSet(
      cacheKey,
      {
        result: result.finalText,
        score: result.score,
        edited: result.edited,
      },
      86400 // 24h
    ).catch(() => {});

    return NextResponse.json({
      result: result.finalText,
      polished: usePolish,
      score: usePolish ? result.score : null,
      edited: result.edited,
      remaining: DAILY_LIMIT - totalCount,
      cached: false,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error" },
      { status: 500 }
    );
  }
}
