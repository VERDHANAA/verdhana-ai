"use client";
import Link from "next/link";
import { useState } from "react";

const SPECIALISTS = [
  { slug: "facebook-ads",     icon: "📣", name: "Facebook Ads",     desc: "High-converting copy with 3 angle variations" },
  { slug: "tiktok-scripts",   icon: "📱", name: "TikTok Scripts",   desc: "Scripts that hold attention past 3 seconds" },
  { slug: "google-ads",       icon: "🔍", name: "Google Ads",       desc: "15 headlines under 30 chars for CTR" },
  { slug: "instagram",        icon: "📸", name: "Instagram",        desc: "Captions that earn comments, not scrolls" },
  { slug: "email-marketing",  icon: "📧", name: "Email Marketing",  desc: "Reads like a human, not a brand template" },
  { slug: "youtube-titles",   icon: "▶️", name: "YouTube Titles",   desc: "Titles that earn clicks honestly" },
  { slug: "product-desc",     icon: "📦", name: "Product Desc.",    desc: "Like a knowledgeable shop owner wrote it" },
  { slug: "video-scripts",    icon: "🎬", name: "Video Scripts",    desc: "30s, 60s, 90s for Meta & YouTube" },
  { slug: "landing-pages",    icon: "🌐", name: "Landing Pages",    desc: "Full page from hero to FAQ" },
  { slug: "push-notifs",      icon: "🔔", name: "Push Notifs",      desc: "Messages people don't immediately delete" },
  { slug: "sms-marketing",    icon: "💬", name: "SMS Marketing",    desc: "Campaigns that don't feel like spam" },
  { slug: "linkedin-ads",     icon: "💼", name: "LinkedIn Ads",     desc: "B2B copy that respects the reader's time" },
];

const FAQS = [
  { q: "Is it really free?", a: "Yes. Free forever for 10 generations/day with 1 AI Polish. No card required. Pro unlocks unlimited generations and all 4 model tiers." },
  { q: "How is this different from ChatGPT?", a: "12 specialists each trained for one task, plus a Reviewer + Editor that removes the AI tells ChatGPT generates by default: overused words, weak hooks, rhetorical questions." },
  { q: "What AI models do you use?", a: "Free: Claude Haiku. Pro: Gemini Flash, Claude Sonnet 4, Claude Opus 4. If a model fails, the system falls back automatically." },
  { q: "Will my content be used to train AI?", a: "No. Your inputs and outputs are stored privately. We don't share or train on user content." },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "#F9F6F0", minHeight: "100vh", color: "#37352F" }}>

      {/* NAV */}
      <header style={{
        width: "100%", position: "sticky", top: 0, zIndex: 50,
        background: "#ffffff", borderBottom: "1px solid #E8E6E1",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "0 24px", height: 64, maxWidth: 1200, margin: "0 auto",
        }}>
          <Link href="/" style={{ textDecoration: "none", color: "#37352F", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em" }}>
            Verdhana AI
          </Link>
          <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
            <Link href="/dashboard" style={{ fontSize: 14, color: "#787774", textDecoration: "none", fontWeight: 500 }}>Tools</Link>
            <Link href="/history" style={{ fontSize: 14, color: "#787774", textDecoration: "none", fontWeight: 500 }}>History</Link>
            <Link href="/account" style={{ fontSize: 14, color: "#787774", textDecoration: "none", fontWeight: 500 }}>Account</Link>
          </nav>
          <Link href="/signup" style={{
            background: "#1A1A1A", color: "#ffffff", padding: "8px 20px", borderRadius: 7,
            fontSize: 14, fontWeight: 600, textDecoration: "none", display: "inline-block",
          }}>
            Get started
          </Link>
        </div>
      </header>

      {/* HERO */}
      <section style={{
        maxWidth: 1200, margin: "0 auto", padding: "96px 24px 80px",
        textAlign: "center",
      }}>
        <h1 style={{
          fontSize: "clamp(40px, 6vw, 72px)", fontWeight: 700, lineHeight: 1.1,
          color: "#37352F", letterSpacing: "-0.03em", marginBottom: 20,
        }}>
          Marketing copy that sounds human.<br />
          <span style={{ color: "#787774" }}>Not like AI.</span>
        </h1>
        <p style={{
          fontSize: 18, color: "#787774", maxWidth: 560, margin: "0 auto 36px",
          lineHeight: 1.7, fontWeight: 400,
        }}>
          12 specialists trained to write the way good marketers actually write. Pick one, fill a brief, get copy worth using.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/signup" style={{
            background: "#1A1A1A", color: "#ffffff", padding: "12px 28px", borderRadius: 7,
            fontSize: 15, fontWeight: 600, textDecoration: "none", display: "inline-block",
          }}>
            Start writing — it's free
          </Link>
          <Link href="/dashboard" style={{
            background: "transparent", color: "#37352F", padding: "12px 28px", borderRadius: 7,
            fontSize: 15, fontWeight: 500, textDecoration: "none", display: "inline-block",
            border: "1px solid #E8E6E1",
          }}>
            Browse tools
          </Link>
        </div>
        <p style={{ marginTop: 16, fontSize: 13, color: "#787774" }}>
          10 generations a day. No card. No expiry.
        </p>
      </section>

      {/* FEATURES */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#37352F", marginBottom: 32, textAlign: "center" }}>
          Built different. On purpose.
        </h2>
        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16,
        }}>
          {[
            { title: "AI Quality Reviewer", body: "Every draft scored 1–10. Writer drafts, Reviewer checks, Editor refines. Copy that actually sounds human — not like a template." },
            { title: "Hard Logic", body: "No hallucinations. No fluff. Just 12 specialists trained for one specific task each." },
            { title: "Private by Default", body: "Your inputs and outputs are stored privately. We don't share or train on user content. Ever." },
            { title: "Auto Fallback", body: "If a model fails, the system falls back automatically. 99.99% uptime." },
          ].map((f, i) => (
            <div key={i} style={{
              background: "#ffffff", border: "1px solid #E8E6E1", borderRadius: 8,
              padding: 24,
            }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#37352F", marginBottom: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 14, color: "#787774", lineHeight: 1.6 }}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPECIALISTS */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#37352F", marginBottom: 8, textAlign: "center" }}>
          12 Specialists. One Platform.
        </h2>
        <p style={{ textAlign: "center", color: "#787774", fontSize: 15, marginBottom: 32 }}>
          Each specialist is trained for a single channel and output type.
        </p>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 12,
        }}
          className="specialists-grid"
        >
          {SPECIALISTS.map((sp) => (
            <Link
              key={sp.slug}
              href={`/dashboard/${sp.slug}`}
              style={{
                display: "block", textDecoration: "none", color: "#37352F",
                background: "#ffffff", border: "1px solid #E8E6E1", borderRadius: 8,
                padding: "16px",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F0EDE8")}
              onMouseLeave={e => (e.currentTarget.style.background = "#ffffff")}
            >
              <div style={{ fontSize: 24, marginBottom: 8 }}>{sp.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{sp.name}</div>
              <div style={{ fontSize: 12, color: "#787774", lineHeight: 1.5 }}>{sp.desc}</div>
            </Link>
          ))}
        </div>
        <style>{`
          @media (max-width: 768px) { .specialists-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .specialists-grid { grid-template-columns: 1fr 1fr !important; } }
        `}</style>
      </section>

      {/* COMPARE */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#37352F", marginBottom: 32, textAlign: "center" }}>
          Generic AI vs Verdhana
        </h2>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", border: "1px solid #E8E6E1",
          borderRadius: 8, overflow: "hidden",
        }}>
          <div style={{ padding: 32, background: "#ffffff", borderRight: "1px solid #E8E6E1" }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: "#787774", marginBottom: 20 }}>Standard AI</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {["Unleash your potential today", "Transform your business in 2025", "In today's fast-paced world..."].map((t, i) => (
                <li key={i} style={{ display: "flex", gap: 12, color: "#787774", textDecoration: "line-through", fontSize: 14 }}>
                  <span style={{ color: "#ba1a1a", flexShrink: 0 }}>✕</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ padding: 32, background: "#F9F6F0" }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: "#37352F", marginBottom: 20 }}>Verdhana AI</h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
              {["Specific observational openers", "Real numbers: 47%, 73%, 1,247", "Calm confidence, no hype"].map((t, i) => (
                <li key={i} style={{ display: "flex", gap: 12, color: "#37352F", fontSize: 14, fontWeight: 500 }}>
                  <span style={{ color: "#006970", flexShrink: 0 }}>✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#37352F", marginBottom: 32, textAlign: "center" }}>
          Good questions.
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{ border: "1px solid #E8E6E1", borderRadius: 8, overflow: "hidden", background: "#ffffff" }}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: "100%", padding: "16px 20px", display: "flex", justifyContent: "space-between",
                  alignItems: "center", background: "transparent", border: "none", cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 15, fontWeight: 600, color: "#37352F" }}>{faq.q}</span>
                <span style={{
                  fontSize: 18, color: "#787774", transform: openFaq === i ? "rotate(180deg)" : "none",
                  transition: "transform 0.2s", flexShrink: 0,
                }}>
                  ›
                </span>
              </button>
              {openFaq === i && (
                <div style={{
                  padding: "0 20px 16px", fontSize: 14, color: "#787774", lineHeight: 1.6,
                  borderTop: "1px solid #E8E6E1",paddingTop: 16,
                }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1A1A1A", color: "#ffffff", padding: "48px 24px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
            <div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Verdhana AI</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, maxWidth: 280 }}>
                Writing tools for marketers who care about quality.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Navigation</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {[["Tools", "/dashboard"], ["History", "/history"], ["Account", "/account"], ["Sign in", "/login"]].map(([l, h]) => (
                  <li key={l}><Link href={h} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.05em" }}>Connect</p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
                {[["Email", "mailto:hello@verdhanaai.com"], ["GitHub", "https://github.com/VERDHANAA"], ["Contact", "mailto:hello@verdhanaai.com"]].map(([l, h]) => (
                  <li key={l}><a href={h} style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", textDecoration: "none" }}>{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 24, textAlign: "center" }}>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2026 Verdhana AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
