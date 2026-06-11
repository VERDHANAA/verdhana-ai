"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const SPECIALISTS = [
  { slug: "facebook-ads",    icon: "📣", name: "Facebook Ads AI",    role: "PAID SOCIAL" },
  { slug: "tiktok-scripts",  icon: "📱", name: "TikTok Scripts AI",  role: "SHORT VIDEO" },
  { slug: "google-ads",      icon: "🔍", name: "Google Ads AI",      role: "SEARCH & DISPLAY" },
  { slug: "instagram",       icon: "📸", name: "Instagram AI",       role: "VISUAL CONTENT" },
  { slug: "email-marketing", icon: "📧", name: "Email Marketing AI", role: "RETENTION" },
  { slug: "youtube-titles",  icon: "▶️",  name: "YouTube Titles AI",  role: "VIDEO CAMPAIGN" },
  { slug: "product-desc",    icon: "📦", name: "Product Copy AI",    role: "CONVERSION COPY" },
  { slug: "video-scripts",   icon: "🎬", name: "Video Scripts AI",   role: "STORYTELLING" },
  { slug: "landing-pages",   icon: "🌐", name: "Landing Page AI",    role: "CRO" },
  { slug: "push-notifs",     icon: "🔔", name: "Push Notifs AI",     role: "ENGAGEMENT" },
  { slug: "sms-marketing",   icon: "💬", name: "SMS Marketing AI",   role: "DIRECT RESPONSE" },
  { slug: "linkedin-ads",    icon: "💼", name: "LinkedIn Ads AI",    role: "B2B GROWTH" },
];

const FAQS = [
  { q: "Is there a free trial?", a: "Yes — all plans include a 7-day free trial. No credit card required to start." },
  { q: "What languages are supported?", a: "All specialists are optimized for Bahasa Indonesia. English output is fully supported too." },
  { q: "How is this different from ChatGPT?", a: "Each specialist has a focused system prompt for one channel. A Facebook Ads specialist writes differently from a LinkedIn specialist. ChatGPT doesn't." },
  { q: "Is the output unique?", a: "Every generation is fresh. No templates, no recycled output. Your brief in, original copy out." },
  { q: "What happens to my data?", a: "Your inputs are never used to train models. Data is encrypted at rest and in transit." },
];

function QualityGateDemo() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid rgba(123,111,238,0.2)", borderRadius: "14px", padding: "24px", width: "100%", maxWidth: "280px" }}>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--t3)", textTransform: "uppercase", marginBottom: "16px" }}>QUALITY SCORE</p>
      <div style={{ height: "6px", background: "var(--border)", borderRadius: "100px", overflow: "hidden", marginBottom: "12px" }}>
        <div style={{ height: "100%", background: "var(--primary)", borderRadius: "100px", animation: "scoreGrow 1.4s 0.6s ease-out forwards", width: 0, "--target-width": "87%" } as React.CSSProperties} />
      </div>
      <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "36px", color: "var(--primary)", letterSpacing: "-0.03em" }}>8.7</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--t3)" }}>/ 10</span>
        <span style={{ marginLeft: "8px", fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--green)", background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: "100px", padding: "3px 10px" }}>PASSED</span>
      </div>
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", background: "rgba(12,12,18,0.8)", transition: "border-color 0.2s ease-out" }}>
      <div style={{ maxWidth: "1080px", margin: "0 auto", padding: "0 24px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "18px", color: "var(--t1)", letterSpacing: "-0.03em" }}>Verdhana AI</span>
          <span style={{ width: "7px", height: "7px", borderRadius: "100px", background: "var(--primary)", animation: "pulseDot 2s ease-in-out infinite", flexShrink: 0 }} />
        </Link>

        <nav style={{ display: "flex", alignItems: "center", gap: "32px" }} className="desktop-only">
          {["Features", "Specialists", "Pricing"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }} className="desktop-only">
          <Link href="/login" className="btn-ghost" style={{ padding: "8px 20px", fontSize: "13px" }}>Sign in</Link>
          <Link href="/signup" className="btn-primary" style={{ padding: "8px 20px", fontSize: "13px" }}>Get started</Link>
        </div>

        <button onClick={() => setOpen(!open)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: "8px", padding: "8px", cursor: "pointer", color: "var(--t2)", display: "none" }} className="mobile-only">
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", padding: "16px 24px 24px" }} className="mobile-only">
          {["Features", "Specialists", "Pricing"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setOpen(false)} style={{ display: "block", padding: "12px 0", fontSize: "15px", color: "var(--t2)", textDecoration: "none", borderBottom: "1px solid var(--border)" }}>{l}</a>
          ))}
          <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
            <Link href="/login" className="btn-ghost" style={{ flex: 1, justifyContent: "center", padding: "10px" }}>Sign in</Link>
            <Link href="/signup" className="btn-primary" style={{ flex: 1, justifyContent: "center", padding: "10px" }}>Get started</Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div style={{ background: "var(--bg)", color: "var(--t1)" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 24px 80px", maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "64px", alignItems: "center", width: "100%" }} className="hero-grid">

          <div style={{ animation: "fadeUp 0.7s ease-out both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--primary-dim)", border: "1px solid rgba(123,111,238,0.25)", borderRadius: "100px", padding: "6px 14px", marginBottom: "28px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "100px", background: "var(--green)" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--t2)" }}>12 AI MARKETING SPECIALISTS</span>
            </div>

            <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(44px, 6vw, 72px)", lineHeight: 1.0, letterSpacing: "-0.04em", color: "var(--t1)", marginBottom: "24px" }}>
              Write marketing<br />
              copy that<br />
              <em style={{ fontStyle: "italic", color: "var(--primary)" }}>actually converts.</em>
            </h1>

            <p style={{ fontSize: "18px", color: "var(--t2)", lineHeight: 1.7, maxWidth: "440px", marginBottom: "36px" }}>
              One platform. 12 specialists trained for every marketing channel. Brief in, copy out — in seconds.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <Link href="/signup" className="btn-primary" style={{ fontSize: "15px", padding: "13px 28px" }}>
                Start free →
              </Link>
              <a href="#specialists" className="btn-ghost" style={{ fontSize: "15px", padding: "13px 28px" }}>
                See specialists
              </a>
            </div>
          </div>

          <div style={{ animation: "fadeUp 0.7s 0.15s ease-out both" }} className="desktop-only">
            <QualityGateDemo />
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────── */}
      <section id="features" style={{ padding: "80px 24px", maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--t3)", textTransform: "uppercase", marginBottom: "16px" }}>HOW IT WORKS</p>
          <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--t1)" }}>
            Brief in. Copy out.<br />In seconds.
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="features-grid">
          {[
            { step: "01", title: "Pick a specialist", desc: "Each of the 12 specialists is trained for one channel. Facebook Ads doesn't write like LinkedIn Ads. That's the point.", icon: "⚡" },
            { step: "02", title: "Write a brief", desc: "Describe your product, audience, and goal. The more specific you are, the better the output — but even a rough brief works.", icon: "✍️" },
            { step: "03", title: "Get your copy", desc: "Streaming output, ready in seconds. Quality score tells you if it's strong enough to publish — or if it needs a polish pass.", icon: "✓" },
          ].map(f => (
            <div key={f.step} className="card" style={{ padding: "32px" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--t3)", marginBottom: "20px" }}>STEP {f.step}</p>
              <div style={{ fontSize: "24px", marginBottom: "16px" }}>{f.icon}</div>
              <h3 style={{ fontSize: "17px", fontWeight: 600, color: "var(--t1)", marginBottom: "10px" }}>{f.title}</h3>
              <p style={{ fontSize: "14px", color: "var(--t2)", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SPECIALISTS ──────────────────────────────────── */}
      <section id="specialists" style={{ padding: "80px 24px", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto" }}>
          <div style={{ marginBottom: "48px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--t3)", textTransform: "uppercase", marginBottom: "16px" }}>12 SPECIALISTS</p>
            <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--t1)" }}>
              One platform.<br />Every channel.
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }} className="spec-grid">
            {SPECIALISTS.map(sp => (
              <Link key={sp.slug} href="/signup" style={{ textDecoration: "none", background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "14px", padding: "20px", display: "flex", flexDirection: "column", gap: "8px", transition: "all 0.2s ease-out", cursor: "pointer" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(123,111,238,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--t3)" }}>{sp.role}</p>
                <span style={{ fontSize: "20px" }}>{sp.icon}</span>
                <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--t1)" }}>{sp.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPARE ──────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", maxWidth: "1080px", margin: "0 auto" }}>
        <div style={{ marginBottom: "48px" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--t3)", textTransform: "uppercase", marginBottom: "16px" }}>THE DIFFERENCE</p>
          <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(32px, 4vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1.1, color: "var(--t1)" }}>
            Generic AI vs Verdhana
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", maxWidth: "720px" }} className="compare-grid">
          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "28px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--t3)", marginBottom: "20px" }}>STANDARD AI</p>
            {["Unleash your potential today", "Transform your business in 2025", "In today's fast-paced world…"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "12px", fontSize: "14px", color: "var(--t3)", textDecoration: "line-through" }}>
                <span style={{ color: "var(--accent)", flexShrink: 0 }}>✕</span>{t}
              </div>
            ))}
          </div>
          <div style={{ background: "var(--primary-dim)", border: "1px solid rgba(123,111,238,0.2)", borderRadius: "14px", padding: "28px" }}>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--primary)", marginBottom: "20px" }}>VERDHANA AI</p>
            {["Specific observational openers", "Real numbers: 47%, 73%, 1,247", "Calm confidence, no hype"].map((t, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", marginBottom: "12px", fontSize: "14px", color: "var(--t1)", fontWeight: 500 }}>
                <span style={{ color: "var(--green)", flexShrink: 0 }}>→</span>{t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--t3)", textTransform: "uppercase", marginBottom: "16px" }}>FAQ</p>
          <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(28px, 3vw, 40px)", letterSpacing: "-0.04em", color: "var(--t1)", marginBottom: "40px" }}>Good questions.</h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
            {FAQS.map((faq, i) => (
              <div key={i} style={{ border: "1px solid var(--border)", borderRadius: "10px", overflow: "hidden", background: "var(--surface-2)" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{ width: "100%", padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "transparent", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span style={{ fontSize: "15px", fontWeight: 500, color: "var(--t1)" }}>{faq.q}</span>
                  <span style={{ color: "var(--t3)", fontSize: "18px", transform: openFaq === i ? "rotate(180deg)" : "none", transition: "transform 0.2s ease-out", flexShrink: 0, marginLeft: "16px" }}>›</span>
                </button>
                {openFaq === i && (
                  <div style={{ padding: "0 20px 18px", fontSize: "14px", color: "var(--t2)", lineHeight: 1.7, borderTop: "1px solid var(--border)" }}>
                    <div style={{ paddingTop: "14px" }}>{faq.a}</div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section style={{ padding: "80px 24px", maxWidth: "1080px", margin: "0 auto", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 500, letterSpacing: "0.08em", color: "var(--t3)", textTransform: "uppercase", marginBottom: "20px" }}>GET STARTED</p>
        <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(36px, 5vw, 60px)", letterSpacing: "-0.04em", lineHeight: 1.0, color: "var(--t1)", marginBottom: "24px" }}>
          Stop writing generic copy.
        </h2>
        <p style={{ fontSize: "17px", color: "var(--t2)", marginBottom: "36px" }}>7-day free trial. No credit card.</p>
        <Link href="/signup" className="btn-primary" style={{ fontSize: "16px", padding: "14px 32px" }}>
          Start for free →
        </Link>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 24px", background: "var(--surface)" }}>
        <div style={{ maxWidth: "1080px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "16px", color: "var(--t1)", letterSpacing: "-0.02em" }}>Verdhana AI</span>
            <span style={{ width: "6px", height: "6px", borderRadius: "100px", background: "var(--primary)" }} />
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--t3)", letterSpacing: "0.05em" }}>© 2026 VERDHANA AI</p>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/login"  style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--t3)", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.2s ease-out" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--t2)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}>SIGN IN</Link>
            <Link href="/signup" style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--t3)", textDecoration: "none", letterSpacing: "0.05em", transition: "color 0.2s ease-out" }} onMouseEnter={e => (e.currentTarget.style.color = "var(--t2)")} onMouseLeave={e => (e.currentTarget.style.color = "var(--t3)")}>SIGN UP</Link>
          </div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          .hero-grid    { grid-template-columns: 1fr !important; }
          .features-grid { grid-template-columns: 1fr !important; }
          .spec-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .compare-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .spec-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}
