// AI Agents: Writer → Reviewer → Editor
// Threshold: score < 8 triggers Editor

type AgentResult = {
  draft: string;
  score: number;
  feedback: string;
  finalText: string;
  edited: boolean;
};

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

async function callOpenRouter(
  apiKey: string,
  model: string,
  system: string,
  user: string,
  temperature = 0.85,
  maxTokens = 1800
): Promise<string> {
  const res = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://verdhana-ai.vercel.app",
      "X-Title": "Verdhana AI",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature,
      max_tokens: maxTokens,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`AI provider error: ${errText.slice(0, 300)}`);
  }

  const data = await res.json();
  return data?.choices?.[0]?.message?.content || "";
}

const REVIEWER_SYSTEM = `You are a senior editor at a top marketing agency. Your job: review marketing copy and score it 1-10.

SCORING CRITERIA:
- 9-10: Natural, human-sounding, no AI tells, specific and convincing
- 7-8: Good but has minor issues (slight clichés, generic phrases)
- 5-6: Mediocre, sounds like AI, needs work
- 1-4: Poor, full of AI tells, overused phrases, generic

CHECK FOR THESE AI TELLS (deduct points):
- Banned words: unleash, unlock, elevate, transform, leverage, harness, empower, embark, journey, robust, seamless, cutting-edge, game-changer, revolutionize, supercharge, world-class, comprehensive, holistic, dynamic, vibrant, thriving, reshape, blueprint, engineered
- Clichés: "in today's fast-paced world", "are you tired of", "imagine if", "the secret to", "say goodbye to", "running on empty"
- Title Case headlines
- Round percentages (50%, 90%, 99%)
- Fictional full names like "Sarah Martinez"
- Three-part lists ("X, Y, and Z") when not needed
- Emojis

OUTPUT FORMAT (strict JSON, no markdown):
{"score": 8, "feedback": "Specific issues found and what to fix"}

Be honest and strict. A draft with 2+ banned words = max score 6.`;

const EDITOR_SYSTEM = `You are a senior copywriter rewriting marketing copy. You receive:
1. The original draft
2. The reviewer's feedback

Your job: rewrite the draft fixing every issue mentioned. Keep the same structure and length. Output ONLY the rewritten copy, nothing else.

CRITICAL RULES:
- Remove ALL banned words: unleash, unlock, elevate, transform, leverage, harness, empower, embark, journey, robust, seamless, cutting-edge, game-changer, revolutionize, supercharge, world-class, comprehensive, holistic, dynamic, vibrant, thriving, reshape, blueprint, engineered
- Use sentence case for headlines
- Use non-round numbers (47% instead of 50%)
- No emojis
- Active voice, specific details
- Vary sentence length
- Sound like a human professional, mildly tired of pitching`;

export async function runAgents(
  apiKey: string,
  productSystemPrompt: string,
  userMessage: string,
  writerModel: string,
  useSupervisor: boolean
): Promise<AgentResult> {
  // Step 1: Writer
  const draft = await callOpenRouter(
    apiKey,
    writerModel,
    productSystemPrompt,
    userMessage
  );

  if (!useSupervisor) {
    return {
      draft,
      score: 0,
      feedback: "",
      finalText: draft,
      edited: false,
    };
  }

  // Step 2: Reviewer (Gemini Flash - cheap)
  let score = 8;
  let feedback = "";
  try {
    const reviewerOutput = await callOpenRouter(
      apiKey,
      "google/gemini-2.0-flash-001",
      REVIEWER_SYSTEM,
      `Review this marketing copy:\n\n${draft}`,
      0.3,
      400
    );

    // Parse JSON from reviewer
    const jsonMatch = reviewerOutput.match(/\{[^}]+\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      score = parsed.score || 8;
      feedback = parsed.feedback || "";
    }
  } catch {
    // If reviewer fails, skip edit
    return {
      draft,
      score: 8,
      feedback: "Review skipped",
      finalText: draft,
      edited: false,
    };
  }

  // Step 3: Editor (only if score < 8)
  if (score < 8) {
    try {
      const edited = await callOpenRouter(
        apiKey,
        writerModel,
        EDITOR_SYSTEM,
        `Original draft:\n${draft}\n\nReviewer feedback:\n${feedback}\n\nRewrite the copy fixing all issues:`,
        0.7,
        1800
      );
      return {
        draft,
        score,
        feedback,
        finalText: edited,
        edited: true,
      };
    } catch {
      return {
        draft,
        score,
        feedback,
        finalText: draft,
        edited: false,
      };
    }
  }

  return {
    draft,
    score,
    feedback,
    finalText: draft,
    edited: false,
  };
}
