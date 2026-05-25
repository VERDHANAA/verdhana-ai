export type Product = {
  slug: string;
  name: string;
  short: string;
  description: string;
  emoji: string;
  fields: { id: string; label: string; placeholder: string; type: "text" | "textarea" }[];
  systemPrompt: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "facebook-ads",
    name: "Facebook Ads Writer",
    short: "High-converting Facebook ad copy",
    description: "Generates 3 ad variations with hook, body, and CTA.",
    emoji: "📘",
    fields: [
      { id: "product", label: "Product / Service", placeholder: "e.g. Online yoga course", type: "text" },
      { id: "audience", label: "Target Audience", placeholder: "e.g. Women 25-45 interested in wellness", type: "text" },
      { id: "tone", label: "Tone", placeholder: "e.g. Friendly, urgent, professional", type: "text" },
    ],
    systemPrompt:
      "You are a world-class Facebook Ads copywriter. Generate exactly 3 distinct ad variations. Each must include: HOOK (attention-grabbing first line), BODY (2-3 sentences with benefits + social proof), CTA (clear action). Use emojis sparingly. Format with bold headers.",
  },
  {
    slug: "tiktok-ads",
    name: "TikTok Ad Script Writer",
    short: "Viral TikTok ad scripts",
    description: "Creates short, punchy TikTok ad scripts under 30 seconds.",
    emoji: "🎵",
    fields: [
      { id: "product", label: "Product / Service", placeholder: "e.g. Skincare serum", type: "text" },
      { id: "audience", label: "Target Audience", placeholder: "e.g. Gen Z, 18-24", type: "text" },
      { id: "hook_style", label: "Hook Style", placeholder: "e.g. Question, shock, POV", type: "text" },
    ],
    systemPrompt:
      "You are a viral TikTok ad scriptwriter. Create 3 scripts, each under 30 seconds. Format: [HOOK 0-3s] / [PROBLEM 3-10s] / [SOLUTION 10-22s] / [CTA 22-30s]. Use casual Gen-Z language. Add on-screen text suggestions in brackets.",
  },
  {
    slug: "google-headlines",
    name: "Google Ads Headlines",
    short: "Click-worthy Google Ads headlines",
    description: "Generates 15 headlines optimized for Google Ads (30 char limit).",
    emoji: "🔍",
    fields: [
      { id: "product", label: "Product / Service", placeholder: "e.g. Web hosting", type: "text" },
      { id: "keywords", label: "Target Keywords", placeholder: "e.g. cheap web hosting, fast hosting", type: "text" },
      { id: "usp", label: "Unique Selling Point", placeholder: "e.g. 99.9% uptime, free SSL", type: "text" },
    ],
    systemPrompt:
      "You are a Google Ads expert. Generate exactly 15 headlines, each UNDER 30 CHARACTERS. Mix categories: 5 benefit-focused, 5 keyword-focused, 5 emotional/urgency. Number each and show character count in parentheses.",
  },
  {
    slug: "instagram-captions",
    name: "Instagram Caption Writer",
    short: "Engaging Instagram captions",
    description: "Creates captions with hooks, story, value, CTA, and hashtags.",
    emoji: "📸",
    fields: [
      { id: "post_topic", label: "Post Topic", placeholder: "e.g. Morning routine tips", type: "text" },
      { id: "niche", label: "Niche", placeholder: "e.g. Fitness coach", type: "text" },
      { id: "goal", label: "Goal", placeholder: "e.g. Drive comments, sell course", type: "text" },
    ],
    systemPrompt:
      "You are an Instagram growth expert. Generate 3 captions. Each has: HOOK (first line, scroll-stopper), STORY/VALUE (2-4 short paragraphs), CTA (engagement question), 15 mixed hashtags (5 large + 5 medium + 5 niche).",
  },
  {
    slug: "email-marketing",
    name: "Email Marketing Writer",
    short: "Emails that convert",
    description: "Writes complete marketing emails with subject lines.",
    emoji: "✉️",
    fields: [
      { id: "campaign", label: "Campaign Type", placeholder: "e.g. Welcome, sale, abandoned cart", type: "text" },
      { id: "audience", label: "Audience", placeholder: "e.g. Existing customers", type: "text" },
      { id: "offer", label: "Offer / Main Message", placeholder: "e.g. 30% off summer sale", type: "textarea" },
    ],
    systemPrompt:
      "You are an email marketing expert. Generate: 5 SUBJECT LINE options (with predicted open rate), 1 full email (preheader, greeting, body 3-5 short paragraphs, CTA button text, P.S. line). Conversational tone, scannable.",
  },
  {
    slug: "youtube-titles",
    name: "YouTube Title Writer",
    short: "Click-worthy YouTube titles",
    description: "Generates titles optimized for CTR and SEO.",
    emoji: "▶️",
    fields: [
      { id: "video_topic", label: "Video Topic", placeholder: "e.g. How I made $10k in a month", type: "text" },
      { id: "niche", label: "Channel Niche", placeholder: "e.g. Personal finance", type: "text" },
      { id: "keyword", label: "Target Keyword", placeholder: "e.g. side hustle", type: "text" },
    ],
    systemPrompt:
      "You are a YouTube growth strategist. Generate 10 titles, each under 60 characters. Mix categories: curiosity, list/number, how-to, controversial, transformation. Include character count. Bonus: suggest the perfect thumbnail text for the top 3.",
  },
  {
    slug: "product-description",
    name: "Product Description Writer",
    short: "E-commerce product descriptions that sell",
    description: "Creates descriptions for Shopify, Amazon, Etsy, etc.",
    emoji: "🛍️",
    fields: [
      { id: "product_name", label: "Product Name", placeholder: "e.g. Bamboo Toothbrush", type: "text" },
      { id: "features", label: "Key Features", placeholder: "e.g. Biodegradable, soft bristles", type: "textarea" },
      { id: "audience", label: "Target Buyer", placeholder: "e.g. Eco-conscious millennials", type: "text" },
    ],
    systemPrompt:
      "You are an e-commerce copywriter. Generate: 1 PUNCHY HEADLINE, 1 SHORT DESC (50 words, benefit-focused), 1 LONG DESC (200 words with features → benefits transformation), 5 BULLET POINTS (scannable specs), 1 META DESCRIPTION (155 chars for SEO).",
  },
  {
    slug: "video-script",
    name: "Video Ad Script Writer",
    short: "Scripts for YouTube/Meta video ads",
    description: "Long-form video ad scripts (30s, 60s, 90s versions).",
    emoji: "🎬",
    fields: [
      { id: "product", label: "Product", placeholder: "e.g. Online course platform", type: "text" },
      { id: "audience", label: "Audience", placeholder: "e.g. Course creators", type: "text" },
      { id: "main_benefit", label: "Main Benefit", placeholder: "e.g. Launch course in 7 days", type: "text" },
    ],
    systemPrompt:
      "You are a direct-response video scriptwriter. Generate 3 scripts: 30s, 60s, 90s. Each has [VISUAL] and [VOICEOVER] columns. Structure: Pattern interrupt → Problem agitation → Solution intro → Social proof → CTA.",
  },
  {
    slug: "landing-page",
    name: "Landing Page Copy",
    short: "Full landing page copy",
    description: "Hero, features, social proof, FAQ, and CTA.",
    emoji: "🌐",
    fields: [
      { id: "product", label: "Product", placeholder: "e.g. AI writing tool", type: "text" },
      { id: "audience", label: "Audience", placeholder: "e.g. Marketers", type: "text" },
      { id: "main_benefit", label: "Main Promise", placeholder: "e.g. 10x your content output", type: "text" },
    ],
    systemPrompt:
      "You are a landing page copywriter. Generate full page copy: 1) Hero headline + subheadline + CTA button, 2) 3 key benefits (icon + headline + 2 lines), 3) Social proof section (3 testimonial templates), 4) How it works (3 steps), 5) FAQ (5 Q&A), 6) Final CTA.",
  },
  {
    slug: "push-notification",
    name: "Push Notification Writer",
    short: "High-CTR push notifications",
    description: "Short, irresistible push notifications.",
    emoji: "🔔",
    fields: [
      { id: "context", label: "App / Context", placeholder: "e.g. E-commerce app", type: "text" },
      { id: "goal", label: "Goal", placeholder: "e.g. Drive users back, promote sale", type: "text" },
    ],
    systemPrompt:
      "You are a mobile growth expert. Generate 10 push notifications. Each: TITLE (under 30 chars) + BODY (under 60 chars). Mix: urgency, curiosity, personalization, FOMO, reward. Include emoji where impactful.",
  },
  {
    slug: "sms-marketing",
    name: "SMS Marketing Writer",
    short: "SMS campaigns that convert",
    description: "SMS messages under 160 characters.",
    emoji: "💬",
    fields: [
      { id: "brand", label: "Brand", placeholder: "e.g. Local coffee shop", type: "text" },
      { id: "offer", label: "Offer / Campaign", placeholder: "e.g. Buy 1 get 1 free", type: "text" },
    ],
    systemPrompt:
      "You are an SMS marketing expert. Generate 8 SMS messages, each UNDER 160 CHARACTERS. Include character count. Mix categories: welcome, flash sale, abandoned cart, restock, VIP, review request. Add [LINK] and [NAME] placeholders.",
  },
  {
    slug: "linkedin-ads",
    name: "LinkedIn Ads Writer",
    short: "B2B LinkedIn ad copy",
    description: "Professional ads for B2B audiences.",
    emoji: "💼",
    fields: [
      { id: "product", label: "Product / Service", placeholder: "e.g. Sales automation tool", type: "text" },
      { id: "audience", label: "Target Role", placeholder: "e.g. Head of Sales at SaaS companies", type: "text" },
      { id: "pain_point", label: "Pain Point", placeholder: "e.g. Manual lead qualification", type: "text" },
    ],
    systemPrompt:
      "You are a B2B LinkedIn Ads expert. Generate 3 ads. Each: INTRO TEXT (150 chars, hook + insight), HEADLINE (under 70 chars), DESCRIPTION (under 100 chars). Professional, data-driven tone. No fluff.",
  },
];

export const getProduct = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);
