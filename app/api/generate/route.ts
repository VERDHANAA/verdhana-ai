import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { createClient } from "@/lib/supabase/server";
import { runAgents } from "@/lib/agents";

const DAILY_LIMIT = 10;
const FREE_POLISH_LIMIT = 1; // 1 sample AI Pengawas per day for free users

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

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Count today's total generations
    const { count: totalCount } = await supabase
      .from("generations")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id)
      .gte("created_at", startOfDay.toISOString());

    if ((totalCount || 0) >= DAILY_LIMIT) {
      return NextResponse.json(
        {
          error: `Daily limit reached (${DAILY_LIMIT}). Resets at midnight.`,
          limitReached: true,
        },
        { status: 429 }
      );
    }

    // If polish requested, check polish limit
    let usePolish = false;
    if (polish) {
      const { count: polishedCount } = await supabase
        .from("generations")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("was_polished", true)
        .gte("created_at", startOfDay.toISOString());

      if ((polishedCount || 0) >= FREE_POLISH_LIMIT) {
        return NextResponse.json(
          {
            error: `Free polish limit reached (${FREE_POLISH_LIMIT}/day). Upgrade to Pro for unlimited polish.`,
            polishLimitReached: true,
          },
          { status: 429 }
        );
      }
      usePolish = true;
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server not configured." }, { status: 500 });
    }

    const userMessage = product.fields
      .map((f) => `${f.label}: ${inputs?.[f.id] || "(not provided)"}`)
      .join("\n");

    const result = await runAgents(
      apiKey,
      product.systemPrompt,
      userMessage,
      MODEL_MAP[requestedModel],
      usePolish
    );

    await supabase.from("generations").insert({
      user_id: user.id,
      product_slug: slug,
      inputs,
      result: result.finalText,
      model: MODEL_MAP[requestedModel],
      quality_score: usePolish ? result.score : null,
      was_polished: usePolish,
    });

    return NextResponse.json({
      result: result.finalText,
      polished: usePolish,
      score: usePolish ? result.score : null,
      edited: result.edited,
      remaining: DAILY_LIMIT - ((totalCount || 0) + 1),
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error" },
      { status: 500 }
    );
  }
}
