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
import { sanitizeInputs, sanitizeSlug, sanitizeModel } from "@/lib/sanitize";

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
    const body = await req.json().catch(() => ({}));

    // Sanitize all inputs
    const slug = sanitizeSlug(body.slug);
    const inputs = sanitizeInputs(body.inputs);
    const requestedModel = sanitizeModel(body.model);
    const polish = body.polish === true;

    if (!slug) {
      return NextResponse.json({ error: "Invalid product" }, { status: 400 });
    }

    const product = getProduct(slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    if (requestedModel !== "fast") {
      return NextResponse.json(
        { error: "This model requires a Pro plan." },
        { status: 403 }
      );
    }

    // Rate limit
    const newCount = await rateLimitIncr(user.id, "gen");
    let totalCount = newCount;
    if (newCount === -1) {
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
      if (newCount !== -1) await rateLimitDecr(user.id, "gen");
      return NextResponse.json(
        {
          error: `Daily limit reached (${DAILY_LIMIT}). Resets at midnight.`,
          limitReached: true,
        },
        { status: 429 }
      );
    }

    // Polish limit check (don't increment yet)
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

    // Cache check
    const cacheKey = await generateCacheKey(slug, inputs, requestedModel, usePolish);
    const cached = await cacheGet(cacheKey);

    if (cached && cached.result) {
      // Only increment polish counter if cache was actually polished
      if (usePolish && cached.edited) {
        await rateLimitIncr(user.id, "polish");
      }

      await supabase.from("generations").insert({
        user_id: user.id,
        product_slug: slug,
        inputs,
        result: cached.result,
        model: MODEL_MAP[requestedModel],
        actual_model: cached.modelUsed || MODEL_MAP[requestedModel],
        quality_score: cached.score || null,
        was_polished: usePolish && cached.edited,
        fallback_count: 0,
      });

      return NextResponse.json({
        result: cached.result,
        polished: usePolish && cached.edited,
        score: cached.score || null,
        edited: cached.edited || false,
        remaining: DAILY_LIMIT - totalCount,
        cached: true,
      });
    }

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
      if (newCount !== -1) await rateLimitDecr(user.id, "gen");
      throw e;
    }

    // Only increment polish if it was actually used (Reviewer + Editor ran successfully)
    if (usePolish && result.edited) {
      await rateLimitIncr(user.id, "polish");
    }

    await supabase.from("generations").insert({
      user_id: user.id,
      product_slug: slug,
      inputs,
      result: result.finalText,
      model: MODEL_MAP[requestedModel],
      actual_model: result.modelUsed,
      quality_score: usePolish ? result.score : null,
      was_polished: usePolish && result.edited,
      fallback_count: result.fallbackCount,
    });

    cacheSet(
      cacheKey,
      {
        result: result.finalText,
        score: result.score,
        edited: result.edited,
        modelUsed: result.modelUsed,
      },
      86400
    ).catch(() => {});

    return NextResponse.json({
      result: result.finalText,
      polished: usePolish && result.edited,
      score: usePolish ? result.score : null,
      edited: result.edited,
      remaining: DAILY_LIMIT - totalCount,
      cached: false,
      fallbackUsed: result.fallbackCount > 0,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error" },
      { status: 500 }
    );
  }
}
