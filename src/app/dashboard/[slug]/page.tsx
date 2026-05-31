"use client";

import { use, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { CardColor } from "@/components/ui/Card";

const specialistData: Record<string, { name: string; icon: string; desc: string; color: CardColor; placeholder: string }> = {
  // Channel-based specialists (linked from dashboard and landing page)
  "facebook-ads": { name: "Facebook Ads Writer", icon: "📣", desc: "High-converting copy with 3 angle variations", color: "yellow", placeholder: "Example: Write a Facebook ad for a natural skincare product, targeting women 25-35, budget $50/day..." },
  "tiktok-scripts": { name: "TikTok Ad Scripts", icon: "📱", desc: "Scripts that hold attention past 3 seconds", color: "blue", placeholder: "Example: Write a 15-second TikTok ad script for a health drink targeting Gen Z..." },
  "google-ads": { name: "Google Ads Headlines", icon: "🔍", desc: "15 headlines under 30 chars for CTR", color: "green", placeholder: "Example: Write 15 Google Ads headlines for a web development agency targeting SMBs..." },
  "instagram": { name: "Instagram Captions", icon: "📸", desc: "Captions that earn comments, not scrolls", color: "pink", placeholder: "Example: Write 5 Instagram captions for a local beauty brand, playful and empowering tone..." },
  "email-marketing": { name: "Email Marketing", icon: "📧", desc: "Reads like a human, not a brand template", color: "yellow", placeholder: "Example: Write a subject line and email blast for a 24-hour flash sale on fashion items..." },
  "youtube-titles": { name: "YouTube Titles", icon: "▶️", desc: "Titles that earn clicks honestly", color: "green", placeholder: "Example: Write 10 YouTube titles for a flagship smartphone review video..." },
  "product-desc": { name: "Product Descriptions", icon: "🛍️", desc: "Like a knowledgeable shop owner wrote it", color: "blue", placeholder: "Example: Write a product description for a premium handmade leather bag targeting upscale buyers..." },
  "video-scripts": { name: "Video Ad Scripts", icon: "🎬", desc: "30s, 60s, 90s for Meta & YouTube", color: "purple", placeholder: "Example: Write a 30-second video ad script for a food delivery app using storytelling..." },
  "landing-pages": { name: "Landing Page Copy", icon: "🌐", desc: "Full page from hero to FAQ", color: "pink", placeholder: "Example: Write landing page copy for an online digital marketing course targeting beginners..." },
  "push-notifs": { name: "Push Notifications", icon: "🔔", desc: "Messages people don't immediately delete", color: "yellow", placeholder: "Example: Write 10 push notifications for an e-commerce app, flash sale category..." },
  "sms-marketing": { name: "SMS Marketing", icon: "💬", desc: "Campaigns that don't feel like spam", color: "green", placeholder: "Example: Write an SMS campaign for a Eid sale at a fashion store, max 160 chars..." },
  "linkedin-ads": { name: "LinkedIn Ads", icon: "💼", desc: "B2B copy that respects the reader's time", color: "blue", placeholder: "Example: Write a LinkedIn ad for an HR SaaS tool targeting HR managers at 50+ employee companies..." },
  // Role-based specialists
  "copywriter": { name: "Copywriter AI", icon: "✍️", desc: "Spesialis copy iklan & landing page", color: "yellow", placeholder: "Contoh: Buat headline untuk iklan Facebook produk skincare natural untuk wanita 25-35 tahun..." },
  "analis-pasar": { name: "Analis Pasar", icon: "📊", desc: "Riset kompetitor & tren pasar", color: "green", placeholder: "Contoh: Analisis kompetitor brand kopi premium di Indonesia, fokus pada strategi pricing..." },
  "strategi-konten": { name: "Strategi Konten", icon: "🎯", desc: "Kalender konten & content plan", color: "pink", placeholder: "Contoh: Buat content plan 30 hari untuk brand fashion lokal di Instagram..." },
  "social-media": { name: "Social Media AI", icon: "📱", desc: "Caption, hashtag & jadwal posting", color: "blue", placeholder: "Contoh: Buat 5 caption Instagram untuk produk minuman kesehatan, tone energetik..." },
  "seo-specialist": { name: "SEO Specialist", icon: "🔍", desc: "Keyword research & on-page SEO", color: "purple", placeholder: "Contoh: Riset keyword untuk artikel blog tentang cara memulai bisnis online di 2025..." },
  "email-marketer": { name: "Email Marketer", icon: "📧", desc: "Email sequence & newsletter", color: "yellow", placeholder: "Contoh: Buat welcome email sequence 5 email untuk SaaS project management tool..." },
  "ads-manager": { name: "Ads Manager", icon: "💰", desc: "Copy iklan Google & Meta Ads", color: "green", placeholder: "Contoh: Buat 3 variasi ad copy Google Ads untuk jasa konsultasi bisnis, budget 500K/hari..." },
  "brand-strategist": { name: "Brand Strategist", icon: "🎨", desc: "Positioning & brand identity", color: "pink", placeholder: "Contoh: Bantu develop brand positioning untuk startup edtech target mahasiswa Indonesia..." },
  "video-scriptwriter": { name: "Video Scriptwriter", icon: "🎬", desc: "Script YouTube & TikTok", color: "blue", placeholder: "Contoh: Buat script video YouTube 5 menit tentang tips investasi saham untuk pemula..." },
  "pr-specialist": { name: "PR Specialist", icon: "📣", desc: "Press release & media outreach", color: "purple", placeholder: "Contoh: Buat press release untuk peluncuran produk aplikasi delivery makanan sehat..." },
  "data-analyst": { name: "Data Analyst", icon: "📈", desc: "Analisis performa campaign", color: "yellow", placeholder: "Contoh: Analisis data campaign email saya: open rate 18%, CTR 2.3%, konversi 0.8%..." },
  "customer-success": { name: "Customer Success", icon: "🤝", desc: "Template respons & FAQ", color: "green", placeholder: "Contoh: Buat template respons untuk pelanggan yang komplain tentang keterlambatan pengiriman..." },
};

export default function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const specialist = specialistData[slug] ?? {
    name: slug.replace(/-/g, " "),
    icon: "🤖",
    desc: "AI Specialist",
    color: "blue" as CardColor,
    placeholder: "Masukkan prompt Anda di sini...",
  };

  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setOutput("");
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, slug }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Terjadi kesalahan. Coba lagi.");
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) return;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        setOutput((prev) => prev + decoder.decode(value, { stream: true }));
      }
    } catch {
      setError("Couldn't connect to the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 sm:p-6 w-full max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="text-4xl">{specialist.icon}</div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black">{specialist.name}</h1>
            <Badge color={specialist.color}>{specialist.name}</Badge>
          </div>
          <p className="text-gray-600 font-medium text-sm">{specialist.desc}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Input */}
        <div className="lg:col-span-3 space-y-4">
          <div>
            <label className="block text-sm font-black mb-2 uppercase tracking-widest">Your brief</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={specialist.placeholder}
              rows={8}
              disabled={loading}
              className="w-full border-2 border-black rounded-[5px] px-4 py-3 bg-white text-sm font-medium resize-none focus:outline-none focus:shadow-[4px_4px_0px_#000] transition-shadow disabled:opacity-60"
            />
            <p className="text-xs text-gray-400 mt-1 font-medium text-right">{prompt.length}/4000</p>
          </div>
          {error && (
            <div className="border-2 border-red-600 bg-red-50 rounded-[5px] px-4 py-3 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}
          <Button
            variant="primary"
            size="lg"
            className="w-full"
            onClick={handleGenerate}
            disabled={loading || !prompt.trim() || prompt.length > 4000}
          >
            {loading ? "Writing your copy..." : "Generate copy →"}
          </Button>
        </div>

        {/* Output */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-black mb-2 uppercase tracking-widest">Your copy</label>
          {output ? (
            <Card color="white" className="min-h-[200px]">
              <pre className="text-sm font-medium whitespace-pre-wrap text-gray-800 leading-relaxed">{output}</pre>
              {!loading && (
                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" size="sm" onClick={() => navigator.clipboard.writeText(output)}>
                    Copy
                  </Button>
                  <Button variant="secondary" size="sm" onClick={() => { setOutput(""); setPrompt(""); }}>
                    Try again
                  </Button>
                </div>
              )}
            </Card>
          ) : loading ? (
            <div className="border-2 border-black rounded-[5px] min-h-[200px] flex items-center justify-center bg-white shadow-[4px_4px_0px_#000]">
              <div className="text-center">
                <div className="text-3xl mb-2 animate-pulse">{specialist.icon}</div>
                <p className="text-sm font-semibold text-gray-500">Writing your copy...</p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-[5px] min-h-[200px] flex items-center justify-center text-gray-400 text-sm font-medium">
              Your copy will appear here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
