import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";
import { createClient } from "@/lib/supabase/server";

const MODEL_MAP: Record<string, string> = {
  fast: "anthropic/claude-3.5-haiku",
  balanced: "google/gemini-2.0-flash-001",
  premium: "anthropic/claude-sonnet-4",
  ultra: "anthropic/claude-opus-4",
};

export async function POST(req: NextRequest) {
  try {
    const { slug, inputs, model } = await req.json();
    const product = getProduct(slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Check auth
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server not configured. Add OPENROUTER_API_KEY." },
        { status: 500 }
      );
    }

    const modelId = MODEL_MAP[model] || MODEL_MAP.fast;

    const userMessage = product.fields
      .map((f) => `${f.label}: ${inputs?.[f.id] || "(not provided)"}`)
      .join("\n");

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://verdhana-ai.vercel.app",
        "X-Title": "Verdhana AI",
      },
      body: JSON.stringify({
        model: modelId,
        messages: [
          { role: "system", content: product.systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.85,
        max_tokens: 1800,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `AI provider error: ${errText.slice(0, 300)}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const result = data?.choices?.[0]?.message?.content || "(no content)";

    // Save to database
    await supabase.from("generations").insert({
      user_id: user.id,
      product_slug: slug,
      inputs,
      result,
      model: modelId,
    });

    return NextResponse.json({ result, model: modelId });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error" },
      { status: 500 }
    );
  }
}
