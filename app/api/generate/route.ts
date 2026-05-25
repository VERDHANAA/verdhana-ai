import { NextRequest, NextResponse } from "next/server";
import { getProduct } from "@/lib/products";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { slug, inputs } = await req.json();
    const product = getProduct(slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server not configured. Add OPENROUTER_API_KEY." },
        { status: 500 }
      );
    }

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
        model: "anthropic/claude-3.5-haiku",
        messages: [
          { role: "system", content: product.systemPrompt },
          { role: "user", content: userMessage },
        ],
        temperature: 0.8,
        max_tokens: 1500,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      return NextResponse.json(
        { error: `AI provider error: ${errText.slice(0, 200)}` },
        { status: 500 }
      );
    }

    const data = await res.json();
    const result = data?.choices?.[0]?.message?.content || "(no content)";
    return NextResponse.json({ result });
  } catch (e: any) {
    return NextResponse.json(
      { error: e.message || "Unknown error" },
      { status: 500 }
    );
  }
}
