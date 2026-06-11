"use client";
import { use, useState } from "react";
import Link from "next/link";

const specialistData: Record<string, { name: string; icon: string; role: string; placeholder: string }> = {
  "facebook-ads":    { name: "Facebook Ads",    icon: "📣", role: "PAID SOCIAL SPECIALIST",      placeholder: "Example: Facebook ad for a natural skincare product, targeting women 25-35, budget $50/day. Focus on skin transformation angle." },
  "tiktok-scripts":  { name: "TikTok Scripts",  icon: "📱", role: "SHORT VIDEO SPECIALIST",       placeholder: "Example: 15-second TikTok ad script for a health drink targeting Gen Z. Hook needs to land in under 2 seconds." },
  "google-ads":      { name: "Google Ads",      icon: "🔍", role: "SEARCH & DISPLAY SPECIALIST",  placeholder: "Example: 15 Google Ads headlines for a web development agency targeting SMBs. Max 30 characters each." },
  "instagram":       { name: "Instagram",       icon: "📸", role: "VISUAL CONTENT SPECIALIST",    placeholder: "Example: 5 Instagram captions for a local beauty brand. Tone: playful and empowering. Include hashtag strategy." },
  "email-marketing": { name: "Email Marketing", icon: "📧", role: "RETENTION SPECIALIST",         placeholder: "Example: Subject line + email blast for a 24-hour flash sale on fashion items. Urgency without desperation." },
  "youtube-titles":  { name: "YouTube Titles",  icon: "▶️",  role: "VIDEO CAMPAIGN SPECIALIST",   placeholder: "Example: 10 YouTube titles for a flagship smartphone review. Mix curiosity, SEO, and honest value." },
  "product-desc":    { name: "Product Copy",    icon: "📦", role: "CONVERSION COPY SPECIALIST",   placeholder: "Example: Product description for a premium handmade leather bag targeting upscale buyers. Tactile, specific, sensory." },
  "video-scripts":   { name: "Video Scripts",   icon: "🎬", role: "STORYTELLING SPECIALIST",      placeholder: "Example: 30-second video ad script for a food delivery app. Lead with a relatable problem, not a feature." },
  "landing-pages":   { name: "Landing Pages",   icon: "🌐", role: "CRO SPECIALIST",               placeholder: "Example: Landing page copy for an online digital marketing course targeting beginners. Hero to FAQ, full page." },
  "push-notifs":     { name: "Push Notifs",     icon: "🔔", role: "ENGAGEMENT SPECIALIST",        placeholder: "Example: 10 push notifications for an e-commerce app, flash sale. Short, clear, non-spammy." },
  "sms-marketing":   { name: "SMS Marketing",   icon: "💬", role: "DIRECT RESPONSE SPECIALIST",   placeholder: "Example: SMS campaign for an Eid sale at a fashion store. Max 160 chars. Must feel personal, not broadcast." },
  "linkedin-ads":    { name: "LinkedIn Ads",    icon: "💼", role: "B2B GROWTH SPECIALIST",        placeholder: "Example: LinkedIn ad for an HR SaaS tool targeting HR managers at 50+ employee companies. Credibility-first." },
  "copywriter":      { name: "Copywriter AI",   icon: "✍️", role: "COPYWRITER",                   placeholder: "Contoh: Headline iklan Facebook untuk produk skincare natural, target wanita 25-35 tahun, angle transformasi kulit." },
  "analis-pasar":    { name: "Analis Pasar",    icon: "📊", role: "MARKET ANALYST",               placeholder: "Contoh: Analisis kompetitor brand kopi premium di Indonesia, fokus pada strategi pricing dan positioning." },
  "strategi-konten": { name: "Strategi Konten", icon: "🎯", role: "CONTENT STRATEGIST",           placeholder: "Contoh: Content plan 30 hari untuk brand fashion lokal di Instagram, target millennials urban." },
  "social-media":    { name: "Social Media AI", icon: "📱", role: "SOCIAL MEDIA SPECIALIST",      placeholder: "Contoh: 5 caption Instagram untuk produk minuman kesehatan, tone energetik dan motivational." },
  "seo-specialist":  { name: "SEO Specialist",  icon: "🔍", role: "SEO SPECIALIST",               placeholder: "Contoh: Riset keyword untuk artikel blog tentang cara memulai bisnis online, target pemula Indonesia." },
  "email-marketer":  { name: "Email Marketer",  icon: "📧", role: "EMAIL MARKETER",               placeholder: "Contoh: Welcome email sequence 5 email untuk SaaS project management tool, fokus pada aktivasi user." },
  "ads-manager":     { name: "Ads Manager",     icon: "💰", role: "ADS MANAGER",                  placeholder: "Contoh: 3 variasi ad copy Google Ads untuk jasa konsultasi bisnis, budget 500K/hari." },
  "brand-strategist":{ name: "Brand Strategist",icon: "🎨", role: "BRAND STRATEGIST",             placeholder: "Contoh: Brand positioning untuk startup edtech target mahasiswa Indonesia, diferensiasi dari Ruangguru." },
  "video-scriptwriter":{ name:"Video Scriptwriter",icon:"🎬",role:"VIDEO SCRIPTWRITER",           placeholder: "Contoh: Script YouTube 5 menit tentang tips investasi saham untuk pemula, gaya conversational." },
  "pr-specialist":   { name: "PR Specialist",   icon: "📣", role: "PR SPECIALIST",               placeholder: "Contoh: Press release untuk peluncuran aplikasi delivery makanan sehat, angle health-conscious urban." },
  "data-analyst":    { name: "Data Analyst",    icon: "📈", role: "DATA ANALYST",                 placeholder: "Contoh: Analisis data campaign email: open rate 18%, CTR 2.3%, konversi 0.8%. Temukan bottleneck." },
  "customer-success":{ name: "Customer Success",icon: "🤝", role: "CUSTOMER SUCCESS",             placeholder: "Contoh: Template respons untuk pelanggan yang komplain tentang keterlambatan pengiriman. Empati + solusi." },
};

function QualityGate({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean).length;
  const score = Math.min(9.8, Math.max(5.0, 5.0 + (words / 80) * 4.8));
  const display = score.toFixed(1);
  const passed = score >= 7;

  return (
    <div className="quality-gate" style={{ marginTop: "24px" }}>
      <p className="mono-label">QUALITY SCORE</p>
      <div className="score-bar-track">
        <div className="score-bar" style={{ "--target-width": `${score * 10}%` } as React.CSSProperties} />
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "32px", color: "var(--primary)", letterSpacing: "-0.03em" }}>{display}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--t3)" }}>/ 10</span>
        <span style={{ marginLeft: "8px", fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: passed ? "var(--green)" : "var(--accent)", background: passed ? "rgba(74,222,128,0.1)" : "rgba(238,111,111,0.1)", border: `1px solid ${passed ? "rgba(74,222,128,0.3)" : "rgba(238,111,111,0.3)"}`, borderRadius: "100px", padding: "3px 10px" }}>
          {passed ? "PASSED" : "NEEDS REVISION"}
        </span>
      </div>
    </div>
  );
}

export default function SlugPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const specialist = specialistData[slug] ?? {
    name: slug.replace(/-/g, " "),
    icon: "🤖",
    role: "AI SPECIALIST",
    placeholder: "Describe what you need...",
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
        setOutput(prev => prev + decoder.decode(value, { stream: true }));
      }
    } catch {
      setError("Couldn't connect to the server. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* Top bar */}
      <div style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)", padding: "0 28px", height: "56px", display: "flex", alignItems: "center", gap: "16px", position: "sticky", top: 0, zIndex: 50 }}>
        <Link href="/dashboard" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--t3)", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.2s ease-out" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--t2)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}>
          ← DASHBOARD
        </Link>
        <span style={{ color: "var(--border)" }}>|</span>
        <p className="mono-label" style={{ color: "var(--t2)" }}>{specialist.role}</p>
      </div>

      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "40px 28px 80px" }}>

        {/* Header */}
        <div style={{ marginBottom: "36px" }}>
          <span style={{ fontSize: "32px", display: "block", marginBottom: "12px" }}>{specialist.icon}</span>
          <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "28px", color: "var(--t1)", letterSpacing: "-0.04em", lineHeight: 1.1 }}>{specialist.name}</h1>
        </div>

        {/* Two-panel */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "start" }} className="gen-grid">

          {/* Input panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p className="mono-label">YOUR BRIEF</p>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: prompt.length > 3600 ? "var(--accent)" : "var(--t3)" }}>{prompt.length}/4000</span>
            </div>

            <textarea
              value={prompt}
              onChange={e => setPrompt(e.target.value)}
              placeholder={specialist.placeholder}
              rows={12}
              disabled={loading}
              className="textarea-field"
            />

            {error && (
              <div style={{ background: "rgba(238,111,111,0.1)", border: "1px solid rgba(238,111,111,0.3)", borderRadius: "10px", padding: "12px 16px", fontSize: "13px", color: "var(--accent)", lineHeight: 1.5 }}>
                {error}
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={loading || !prompt.trim() || prompt.length > 4000}
              className="btn-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              {loading ? "Writing your copy…" : "Generate copy →"}
            </button>
          </div>

          {/* Output panel */}
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <p className="mono-label">OUTPUT</p>

            {output ? (
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "24px" }}>
                <pre style={{ fontFamily: "var(--font-inter)", fontSize: "14px", color: "var(--t1)", whiteSpace: "pre-wrap", lineHeight: 1.7, margin: 0 }}>
                  {output}
                </pre>
                <QualityGate text={output} />
                {!loading && (
                  <div style={{ marginTop: "20px", display: "flex", gap: "8px" }}>
                    <button onClick={() => navigator.clipboard.writeText(output)} className="btn-ghost" style={{ padding: "8px 16px", fontSize: "13px" }}>
                      Copy
                    </button>
                    <button onClick={() => { setOutput(""); setPrompt(""); }} className="btn-ghost" style={{ padding: "8px 16px", fontSize: "13px" }}>
                      Reset
                    </button>
                  </div>
                )}
              </div>
            ) : loading ? (
              <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", minHeight: "280px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                <span style={{ fontSize: "28px", animation: "shimmer 1.5s ease-in-out infinite" }}>{specialist.icon}</span>
                <p className="mono-label" style={{ color: "var(--t3)", animation: "shimmer 1.5s ease-in-out infinite" }}>WRITING COPY…</p>
              </div>
            ) : (
              <div style={{ border: "1px dashed var(--border)", borderRadius: "14px", minHeight: "280px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--t3)", letterSpacing: "0.05em" }}>AWAITING BRIEF</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .gen-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
