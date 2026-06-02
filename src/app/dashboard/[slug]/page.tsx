"use client";

import { use, useState } from "react";

const specialistData: Record<string, { name: string; icon: string; desc: string; placeholder: string }> = {
  // Channel-based specialists (linked from dashboard and landing page)
  "facebook-ads": { name: "Facebook Ads Writer", icon: "📣", desc: "High-converting copy with 3 angle variations", placeholder: "Example: Write a Facebook ad for a natural skincare product, targeting women 25-35, budget $50/day..." },
  "tiktok-scripts": { name: "TikTok Ad Scripts", icon: "📱", desc: "Scripts that hold attention past 3 seconds", placeholder: "Example: Write a 15-second TikTok ad script for a health drink targeting Gen Z..." },
  "google-ads": { name: "Google Ads Headlines", icon: "🔍", desc: "15 headlines under 30 chars for CTR", placeholder: "Example: Write 15 Google Ads headlines for a web development agency targeting SMBs..." },
  "instagram": { name: "Instagram Captions", icon: "📸", desc: "Captions that earn comments, not scrolls", placeholder: "Example: Write 5 Instagram captions for a local beauty brand, playful and empowering tone..." },
  "email-marketing": { name: "Email Marketing", icon: "📧", desc: "Reads like a human, not a brand template", placeholder: "Example: Write a subject line and email blast for a 24-hour flash sale on fashion items..." },
  "youtube-titles": { name: "YouTube Titles", icon: "▶️", desc: "Titles that earn clicks honestly", placeholder: "Example: Write 10 YouTube titles for a flagship smartphone review video..." },
  "product-desc": { name: "Product Descriptions", icon: "🛍️", desc: "Like a knowledgeable shop owner wrote it", placeholder: "Example: Write a product description for a premium handmade leather bag targeting upscale buyers..." },
  "video-scripts": { name: "Video Ad Scripts", icon: "🎬", desc: "30s, 60s, 90s for Meta & YouTube", placeholder: "Example: Write a 30-second video ad script for a food delivery app using storytelling..." },
  "landing-pages": { name: "Landing Page Copy", icon: "🌐", desc: "Full page from hero to FAQ", placeholder: "Example: Write landing page copy for an online digital marketing course targeting beginners..." },
  "push-notifs": { name: "Push Notifications", icon: "🔔", desc: "Messages people don't immediately delete", placeholder: "Example: Write 10 push notifications for an e-commerce app, flash sale category..." },
  "sms-marketing": { name: "SMS Marketing", icon: "💬", desc: "Campaigns that don't feel like spam", placeholder: "Example: Write an SMS campaign for a Eid sale at a fashion store, max 160 chars..." },
  "linkedin-ads": { name: "LinkedIn Ads", icon: "💼", desc: "B2B copy that respects the reader's time", placeholder: "Example: Write a LinkedIn ad for an HR SaaS tool targeting HR managers at 50+ employee companies..." },
  // Role-based specialists
  "copywriter": { name: "Copywriter AI", icon: "✍️", desc: "Spesialis copy iklan & landing page", placeholder: "Contoh: Buat headline untuk iklan Facebook produk skincare natural untuk wanita 25-35 tahun..." },
  "analis-pasar": { name: "Analis Pasar", icon: "📊", desc: "Riset kompetitor & tren pasar", placeholder: "Contoh: Analisis kompetitor brand kopi premium di Indonesia, fokus pada strategi pricing..." },
  "strategi-konten": { name: "Strategi Konten", icon: "🎯", desc: "Kalender konten & content plan", placeholder: "Contoh: Buat content plan 30 hari untuk brand fashion lokal di Instagram..." },
  "social-media": { name: "Social Media AI", icon: "📱", desc: "Caption, hashtag & jadwal posting", placeholder: "Contoh: Buat 5 caption Instagram untuk produk minuman kesehatan, tone energetik..." },
  "seo-specialist": { name: "SEO Specialist", icon: "🔍", desc: "Keyword research & on-page SEO", placeholder: "Contoh: Riset keyword untuk artikel blog tentang cara memulai bisnis online di 2025..." },
  "email-marketer": { name: "Email Marketer", icon: "📧", desc: "Email sequence & newsletter", placeholder: "Contoh: Buat welcome email sequence 5 email untuk SaaS project management tool..." },
  "ads-manager": { name: "Ads Manager", icon: "💰", desc: "Copy iklan Google & Meta Ads", placeholder: "Contoh: Buat 3 variasi ad copy Google Ads untuk jasa konsultasi bisnis, budget 500K/hari..." },
  "brand-strategist": { name: "Brand Strategist", icon: "🎨", desc: "Positioning & brand identity", placeholder: "Contoh: Bantu develop brand positioning untuk startup edtech target mahasiswa Indonesia..." },
  "video-scriptwriter": { name: "Video Scriptwriter", icon: "🎬", desc: "Script YouTube & TikTok", placeholder: "Contoh: Buat script video YouTube 5 menit tentang tips investasi saham untuk pemula..." },
  "pr-specialist": { name: "PR Specialist", icon: "📣", desc: "Press release & media outreach", placeholder: "Contoh: Buat press release untuk peluncuran produk aplikasi delivery makanan sehat..." },
  "data-analyst": { name: "Data Analyst", icon: "📈", desc: "Analisis performa campaign", placeholder: "Contoh: Analisis data campaign email saya: open rate 18%, CTR 2.3%, konversi 0.8%..." },
  "customer-success": { name: "Customer Success", icon: "🤝", desc: "Template respons & FAQ", placeholder: "Contoh: Buat template respons untuk pelanggan yang komplain tentang keterlambatan pengiriman..." },
};

export default function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const specialist = specialistData[slug] ?? {
    name: slug.replace(/-/g, " "),
    icon: "🤖",
    desc: "AI Specialist",
    placeholder: "Enter your prompt here...",
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
        setError(data.error ?? "Something went wrong. Please try again.");
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
    <div style={{ background: "#F9F6F0", minHeight: "100vh", color: "#37352F" }}>
      {/* Simple top bar */}
      <div style={{
        background: "#ffffff", borderBottom: "1px solid #E8E6E1",
        padding: "0 24px", height: 52, display: "flex", alignItems: "center", gap: 16,
      }}>
        <a href="/dashboard" style={{ fontSize: 13, color: "#787774", textDecoration: "none", fontWeight: 500 }}>
          ← Dashboard
        </a>
        <span style={{ color: "#E8E6E1" }}>|</span>
        <span style={{ fontSize: 13, color: "#37352F", fontWeight: 500 }}>
          {specialist.icon} {specialist.name}
        </span>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>{specialist.icon}</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#37352F", marginBottom: 4 }}>{specialist.name}</h1>
          <p style={{ fontSize: 14, color: "#787774" }}>{specialist.desc}</p>
        </div>

        {/* 2-panel layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="slug-grid">

          {/* Input panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#37352F" }}>Your brief</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={specialist.placeholder}
              rows={10}
              disabled={loading}
              style={{
                width: "100%", border: "1px solid #E8E6E1", borderRadius: 7,
                padding: "12px 14px", background: "#ffffff", fontSize: 14,
                color: "#37352F", resize: "vertical", outline: "none",
                fontFamily: "inherit", lineHeight: 1.6,
                transition: "border-color 0.15s",
                opacity: loading ? 0.6 : 1,
              }}
              onFocus={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
              onBlur={e => (e.currentTarget.style.borderColor = "#E8E6E1")}
            />
            <p style={{ fontSize: 11, color: "#787774", textAlign: "right" }}>{prompt.length}/4000</p>

            {error && (
              <div style={{
                background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 7,
                padding: "10px 14px", fontSize: 13, color: "#b91c1c",
              }}>
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim() || prompt.length > 4000}
              style={{
                width: "100%", background: "#1A1A1A", color: "#ffffff",
                padding: "11px 16px", borderRadius: 7, fontSize: 14, fontWeight: 600,
                border: "none", cursor: (loading || !prompt.trim() || prompt.length > 4000) ? "not-allowed" : "pointer",
                opacity: (loading || !prompt.trim()) ? 0.6 : 1,
              }}
            >
              {loading ? "Writing your copy..." : "Generate copy →"}
            </button>
          </div>

          {/* Output panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#37352F" }}>Your copy</label>
            {output ? (
              <div style={{
                background: "#ffffff", border: "1px solid #E8E6E1", borderRadius: 7,
                padding: "16px", flex: 1, display: "flex", flexDirection: "column",
              }}>
                <pre style={{
                  fontSize: 14, color: "#37352F", whiteSpace: "pre-wrap",
                  lineHeight: 1.6, fontFamily: "inherit", flex: 1, margin: 0,
                }}>
                  {output}
                </pre>
                {!loading && (
                  <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                    <button
                      onClick={() => navigator.clipboard.writeText(output)}
                      style={{
                        background: "#F9F6F0", border: "1px solid #E8E6E1", borderRadius: 6,
                        padding: "7px 14px", fontSize: 13, cursor: "pointer", fontWeight: 500, color: "#37352F",
                      }}
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => { setOutput(""); setPrompt(""); }}
                      style={{
                        background: "#F9F6F0", border: "1px solid #E8E6E1", borderRadius: 6,
                        padding: "7px 14px", fontSize: 13, cursor: "pointer", fontWeight: 500, color: "#37352F",
                      }}
                    >
                      Try again
                    </button>
                  </div>
                )}
              </div>
            ) : loading ? (
              <div style={{
                background: "#ffffff", border: "1px solid #E8E6E1", borderRadius: 7,
                minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center",
                flexDirection: "column", gap: 8,
              }}>
                <div style={{ fontSize: 28, opacity: 0.4 }}>{specialist.icon}</div>
                <p style={{ fontSize: 13, color: "#787774" }}>Writing your copy...</p>
              </div>
            ) : (
              <div style={{
                border: "1px dashed #E8E6E1", borderRadius: 7, minHeight: 220,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#787774", fontSize: 13,
              }}>
                Your copy will appear here.
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .slug-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
