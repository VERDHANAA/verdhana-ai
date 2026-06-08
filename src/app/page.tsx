"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";

// ─── DATA ────────────────────────────────────────────────────────────────────

const SPECIALISTS = [
  { slug: "facebook-ads",    icon: "📣", name: "Facebook Ads AI",     role: "PAID SOCIAL SPECIALIST",        color: "#E8F0FE", desc: "High-converting copy with 3 angle variations per brief." },
  { slug: "tiktok-scripts",  icon: "📱", name: "TikTok Scripts AI",   role: "SHORT VIDEO SPECIALIST",         color: "#F0FFF4", desc: "Scripts engineered to hold attention past 3 seconds." },
  { slug: "google-ads",      icon: "🔍", name: "Google Ads AI",       role: "SEARCH & DISPLAY SPECIALIST",   color: "#FFF8E1", desc: "15 headlines under 30 characters — built for CTR." },
  { slug: "instagram",       icon: "📸", name: "Instagram AI",        role: "VISUAL CONTENT SPECIALIST",     color: "#FCE4EC", desc: "Captions that earn comments, not scrolls." },
  { slug: "email-marketing", icon: "📧", name: "Email Marketing AI",  role: "RETENTION SPECIALIST",          color: "#F3E5F5", desc: "Reads like a human wrote it, not a brand template." },
  { slug: "youtube-titles",  icon: "▶️", name: "YouTube Titles AI",   role: "VIDEO CAMPAIGN SPECIALIST",     color: "#FFEBEE", desc: "Titles that earn clicks honestly." },
  { slug: "product-desc",    icon: "📦", name: "Product Copy AI",     role: "CONVERSION COPY SPECIALIST",    color: "#FBE9E7", desc: "Like a knowledgeable shop owner wrote every word." },
  { slug: "video-scripts",   icon: "🎬", name: "Video Scripts AI",    role: "STORYTELLING SPECIALIST",       color: "#E8EAF6", desc: "30s, 60s, 90s formats for Meta & YouTube." },
  { slug: "landing-pages",   icon: "🌐", name: "Landing Page AI",     role: "CRO SPECIALIST",                color: "#F1F8E9", desc: "Full page from hero to FAQ — ready to publish." },
  { slug: "push-notifs",     icon: "🔔", name: "Push Notifs AI",      role: "ENGAGEMENT SPECIALIST",         color: "#E0F7FA", desc: "Messages people don't immediately dismiss." },
  { slug: "sms-marketing",   icon: "💬", name: "SMS Marketing AI",    role: "DIRECT RESPONSE SPECIALIST",    color: "#ECEFF1", desc: "Campaigns that convert without feeling like spam." },
  { slug: "linkedin-ads",    icon: "💼", name: "LinkedIn Ads AI",     role: "B2B GROWTH SPECIALIST",         color: "#E3F2FD", desc: "B2B copy that respects the reader's time." },
];

const FEATURE_SECTIONS = [
  {
    bg: "#EAF4FF",
    label: "GENERATE",
    heading: "Brief in. Copy out. In seconds.",
    desc: "Each specialist knows your channel inside out. Paste your brief, pick your angle, and get platform-ready copy — no prompting expertise required.",
    features: ["3 copy angles per brief", "Optimized for each platform", "Up to 2,048 tokens per output"],
    mockupBg: "#D0E8FF",
    mockupContent: "facebook-ads",
  },
  {
    bg: "#F0FFF4",
    label: "REFINE",
    heading: "Polish until it's perfect.",
    desc: "One-click polish runs your draft through a second pass — tightening structure, fixing flow, and sharpening the hook. Your quota includes a daily polish.",
    features: ["AI-powered second pass", "Preserves your brand voice", "One polish per day, free"],
    mockupBg: "#C6F0D4",
    mockupContent: "email-marketing",
  },
  {
    bg: "#FFF8E1",
    label: "HISTORY",
    heading: "Every draft. Always there.",
    desc: "Your last 50 generations are saved automatically. Copy to clipboard, regenerate with the same brief, or pick up where you left off — across any device.",
    features: ["50 generations saved", "One-click copy", "Jump back to any specialist"],
    mockupBg: "#FFE8A0",
    mockupContent: "history",
  },
];

const FAQS = [
  { q: "Apakah saya bisa coba gratis?", a: "Ya, semua plan termasuk free trial 7 hari tanpa perlu kartu kredit." },
  { q: "Bahasa apa saja yang didukung?", a: "Semua specialist dioptimalkan untuk Bahasa Indonesia, namun bisa juga menghasilkan output dalam Bahasa Inggris." },
  { q: "Bagaimana cara kerja AI specialist?", a: "Setiap specialist dilatih dengan prompt khusus untuk channel marketingnya masing-masing — copywriter berbeda dengan SEO specialist, dan seterusnya." },
  { q: "Apakah konten yang dihasilkan unik?", a: "Ya, setiap output di-generate fresh berdasarkan input kamu. Tidak ada template atau output yang didaur ulang." },
  { q: "Bagaimana dengan keamanan data saya?", a: "Input kamu tidak pernah digunakan untuk melatih model. Data tersimpan aman dan terenkripsi." },
];

const FOOTER_LINKS = {
  PRODUCT: ["Features", "Specialists", "Pricing", "Changelog"],
  COMPANY: ["About", "Blog", "Careers", "Press"],
  SUPPORT: ["Help Center", "Status", "Contact", "Privacy"],
  LEGAL: ["Terms", "Cookie Policy", "Licenses"],
};

// ─── STYLES ──────────────────────────────────────────────────────────────────

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');

    * { box-sizing: border-box; margin: 0; padding: 0; }

    :root { --serif: 'Playfair Display', Georgia, serif; }

    @keyframes blobFloat {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33%       { transform: translate(12px, -18px) scale(1.04); }
      66%       { transform: translate(-8px, -10px) scale(0.97); }
    }
    @keyframes blobFloat2 {
      0%, 100% { transform: translate(0, 0) scale(1); }
      33%       { transform: translate(-14px, 16px) scale(1.05); }
      66%       { transform: translate(10px, 8px) scale(0.96); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes shimmer {
      0%   { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
      50%  { box-shadow: 0 0 18px 4px rgba(255,255,255,0.35); }
      100% { box-shadow: 0 0 0 0 rgba(255,255,255,0); }
    }
    @keyframes underlineGrow {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes bounce {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-4px); }
    }

    .fade-item {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.55s ease, transform 0.55s ease;
    }
    .fade-item.visible {
      opacity: 1;
      transform: translateY(0);
    }
    .slide-left {
      opacity: 0;
      transform: translateX(-28px);
      transition: opacity 0.5s ease, transform 0.5s ease;
    }
    .slide-left.visible {
      opacity: 1;
      transform: translateX(0);
    }

    .footer-link {
      position: relative;
      display: inline-block;
      color: #aaa;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.2s;
    }
    .footer-link::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 1px;
      background: #fff;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.25s ease;
    }
    .footer-link:hover { color: #fff; }
    .footer-link:hover::after { transform: scaleX(1); }

    .social-icon:hover { animation: bounce 0.4s ease; }

    ::-webkit-scrollbar { display: none; }
    .snap-scroll { scroll-snap-type: x mandatory; overflow-x: auto; -webkit-overflow-scrolling: touch; cursor: grab; }
    .snap-scroll:active { cursor: grabbing; }
    .snap-card { scroll-snap-align: start; flex-shrink: 0; }

    @media (max-width: 768px) {
      .hero-title { font-size: clamp(36px, 10vw, 56px) !important; }
      .feature-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .footer-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .nav-links { display: none !important; }
    }
  `}</style>
);

// ─── NAVBAR ──────────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "14px 20px", display: "flex", justifyContent: "center" }}>
      <nav style={{
        width: "100%", maxWidth: 900,
        background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.7)",
        backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        borderRadius: 999,
        padding: "10px 20px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        boxShadow: scrolled ? "0 8px 32px rgba(0,0,0,0.12)" : "0 2px 12px rgba(0,0,0,0.07)",
        border: "1px solid rgba(255,255,255,0.6)",
        transition: "box-shadow 0.3s, background 0.3s",
      }}>
        {/* Logo */}
        <Link href="/" style={{ fontWeight: 800, fontSize: 17, color: "#111", textDecoration: "none", letterSpacing: "-0.4px" }}>
          Verdhana<span style={{ color: "#4CAF8C" }}>AI</span>
        </Link>

        {/* Nav links desktop */}
        <div className="nav-links" style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Features", "Specialists", "Pricing"].map(l => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 14, color: "#555", textDecoration: "none", fontWeight: 500 }}
              onMouseEnter={e => (e.currentTarget.style.color = "#111")}
              onMouseLeave={e => (e.currentTarget.style.color = "#555")}>
              {l}
            </a>
          ))}
        </div>

        {/* CTA + Hamburger */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/login" style={{
            background: "#111", color: "#fff", padding: "8px 20px",
            borderRadius: 999, fontSize: 13, fontWeight: 700, textDecoration: "none",
            transition: "opacity 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}>
            Get started
          </Link>
          <button
            onClick={() => setMenuOpen(o => !o)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 6, display: "flex", flexDirection: "column", gap: 4 }}
            aria-label="Menu">
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: 20, height: 2, background: "#333", borderRadius: 2, display: "block",
                transition: "transform 0.2s, opacity 0.2s",
                ...(menuOpen && i === 0 ? { transform: "rotate(45deg) translate(4px, 4px)" } : {}),
                ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                ...(menuOpen && i === 2 ? { transform: "rotate(-45deg) translate(4px, -4px)" } : {}),
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: "absolute", top: 72, left: 20, right: 20,
          background: "rgba(255,255,255,0.96)", backdropFilter: "blur(16px)",
          borderRadius: 20, padding: 24, boxShadow: "0 8px 40px rgba(0,0,0,0.12)",
          border: "1px solid rgba(0,0,0,0.07)",
        }}>
          {["Features", "Specialists", "Pricing", "Log in"].map(l => (
            <a key={l} href={l === "Log in" ? "/login" : `#${l.toLowerCase()}`}
              style={{ display: "block", padding: "12px 0", fontSize: 16, fontWeight: 600, color: "#111", textDecoration: "none", borderBottom: "1px solid #f0f0f0" }}>
              {l}
            </a>
          ))}
        </div>
      )}

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
          @media (max-width: 600px) { .compare-grid { grid-template-columns: 1fr !important; } }
          @media (max-width: 600px) { .compare-grid > div:first-child { border-right: none !important; border-bottom: 1px solid #E8E6E1; } }
          @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; } }
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
        }} className="compare-grid">
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
                  borderTop: "1px solid #E8E6E1", paddingTop: 16,
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
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 40, marginBottom: 40 }} className="footer-grid">
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

// ─── HERO ─────────────────────────────────────────────────────────────────────

function MockupCard() {
  return (
    <div style={{
      background: "#fff", borderRadius: 20, boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
      overflow: "hidden", width: "100%", maxWidth: 720, margin: "0 auto",
    }}>
      {/* Browser bar */}
      <div style={{ background: "#f4f4f4", padding: "10px 16px", display: "flex", alignItems: "center", gap: 6, borderBottom: "1px solid #e8e8e8" }}>
        {["#FF5F57", "#FFBD2E", "#28C840"].map(c => <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />)}
        <div style={{ flex: 1, background: "#e8e8e8", borderRadius: 6, height: 20, marginLeft: 8 }} />
      </div>
      {/* Dashboard content */}
      <div style={{ padding: 20, background: "#FAFAFA" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10, marginBottom: 12 }}>
          {SPECIALISTS.slice(0, 8).map(sp => (
            <div key={sp.slug} style={{
              background: sp.color, borderRadius: 12, padding: "12px 10px",
              display: "flex", flexDirection: "column", gap: 4,
            }}>
              <span style={{ fontSize: 18 }}>{sp.icon}</span>
              <span style={{ fontSize: 9, fontWeight: 700, color: "#333", lineHeight: 1.2 }}>{sp.name.replace(" AI", "")}</span>
            </div>
          ))}
        </div>
        <div style={{ background: "#fff", borderRadius: 12, padding: 14, border: "1px solid #eee" }}>
          <div style={{ height: 8, background: "#e8e8e8", borderRadius: 4, width: "60%", marginBottom: 8 }} />
          <div style={{ height: 8, background: "#e8e8e8", borderRadius: 4, width: "80%", marginBottom: 8 }} />
          <div style={{ height: 8, background: "#e8e8e8", borderRadius: 4, width: "45%" }} />
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section style={{
      minHeight: "100vh", background: "linear-gradient(160deg, #E8F5F0 0%, #F0F7FF 50%, #FFF8F0 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "120px 24px 80px", position: "relative", overflow: "hidden",
    }}>
      {/* Blobs */}
      <div style={{
        position: "absolute", top: "10%", left: "5%", width: 420, height: 420,
        background: "radial-gradient(circle, rgba(76,175,140,0.18) 0%, transparent 70%)",
        borderRadius: "50%", animation: "blobFloat 8s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "8%", right: "4%", width: 360, height: 360,
        background: "radial-gradient(circle, rgba(100,160,255,0.16) 0%, transparent 70%)",
        borderRadius: "50%", animation: "blobFloat2 10s ease-in-out infinite", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: "40%", right: "12%", width: 240, height: 240,
        background: "radial-gradient(circle, rgba(255,180,100,0.14) 0%, transparent 70%)",
        borderRadius: "50%", animation: "blobFloat 12s ease-in-out infinite 2s", pointerEvents: "none",
      }} />

      {/* Heading */}
      <div style={{ textAlign: "center", maxWidth: 760, position: "relative", zIndex: 2 }}>
        <p style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "#4CAF8C", marginBottom: 20, textTransform: "uppercase", animation: "fadeUp 0.6s ease both" }}>
          12 AI Marketing Specialists
        </p>
        <h1 className="hero-title" style={{
          fontFamily: "var(--serif, Georgia, serif)",
          fontSize: "clamp(44px, 7vw, 80px)", fontWeight: 800, color: "#111", lineHeight: 1.1,
          letterSpacing: "-0.03em", marginBottom: 24,
          animation: "fadeUp 0.7s ease 0.1s both",
        }}>
          Write marketing copy<br />
          that <em style={{ fontStyle: "italic", color: "#4CAF8C" }}>actually converts.</em>
        </h1>
        <p style={{
          fontSize: 18, color: "#666", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px",
          animation: "fadeUp 0.7s ease 0.2s both",
        }}>
          One platform. 12 specialists trained for every marketing channel.
          From Facebook ads to LinkedIn copy — brief in, copy out, in seconds.
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.7s ease 0.3s both" }}>
          <Link href="/signup" style={{
            background: "#111", color: "#fff", padding: "15px 36px",
            borderRadius: 999, fontSize: 15, fontWeight: 700, textDecoration: "none",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.animation = "shimmer 1s ease";
            }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; }}>
            Start free — no card needed
          </Link>
          <a href="#specialists" style={{
            background: "rgba(255,255,255,0.8)", color: "#111", padding: "15px 36px",
            borderRadius: 999, fontSize: 15, fontWeight: 600, textDecoration: "none",
            border: "1.5px solid rgba(0,0,0,0.12)", backdropFilter: "blur(8px)",
            transition: "background 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,1)")}
            onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.8)")}>
            See all specialists →
          </a>
        </div>
      </div>

      {/* Mockup */}
      <div style={{ width: "100%", maxWidth: 760, marginTop: 64, position: "relative", zIndex: 2, animation: "fadeUp 0.8s ease 0.4s both" }}>
        <MockupCard />
      </div>
    </section>
  );
}

// ─── FEATURE GRID ─────────────────────────────────────────────────────────────

const GRID_FEATURES = [
  { icon: "✍️", label: "12 AI Specialists" },
  { icon: "⚡", label: "Instant Generation" },
  { icon: "🎯", label: "Channel-Optimized" },
  { icon: "📊", label: "Quality Scoring" },
  { icon: "✨", label: "AI Polish" },
];

function FeatureGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".fade-item");
    if (!items) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const els = ref.current?.querySelectorAll(".fade-item") ?? [];
          els.forEach((el, i) => {
            setTimeout(() => el.classList.add("visible"), i * 110);
          });
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={ref} style={{ background: "#F5F0EB", padding: "96px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{
          fontFamily: "var(--serif, Georgia, serif)",
          fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: "#111",
          marginBottom: 56, letterSpacing: "-0.02em",
        }}>
          Everything you need<br />to write better, faster.
        </h2>

        <div className="feature-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {GRID_FEATURES.map((f, i) => (
            <div key={f.label} className="fade-item" style={{
              background: "#fff", borderRadius: 20, padding: "28px 24px",
              display: "flex", alignItems: "center", gap: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              ...(i === GRID_FEATURES.length - 1 && GRID_FEATURES.length % 2 !== 0
                ? { gridColumn: "1 / -1", maxWidth: "50%", margin: "0 auto", width: "100%" }
                : {}),
            }}>
              <span style={{ fontSize: 32 }}>{f.icon}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: "#111" }}>{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FEATURE SECTIONS ─────────────────────────────────────────────────────────

function MockupPreview({ content, bg }: { content: string; bg: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const pct = (window.innerHeight - rect.top) / window.innerHeight;
      ref.current.style.transform = `translateY(${Math.min(0, (pct - 0.5) * -20)}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div ref={ref} style={{
      background: bg, borderRadius: 24, padding: 28,
      boxShadow: "0 16px 48px rgba(0,0,0,0.10)", marginTop: 32,
      transition: "transform 0.1s linear",
    }}>
      <div style={{ background: "rgba(255,255,255,0.7)", borderRadius: 16, padding: 20 }}>
        <div style={{ height: 10, background: "rgba(0,0,0,0.1)", borderRadius: 5, width: "70%", marginBottom: 10 }} />
        <div style={{ height: 10, background: "rgba(0,0,0,0.08)", borderRadius: 5, width: "90%", marginBottom: 10 }} />
        <div style={{ height: 10, background: "rgba(0,0,0,0.06)", borderRadius: 5, width: "55%", marginBottom: 20 }} />
        <div style={{ background: "rgba(0,0,0,0.08)", borderRadius: 12, padding: 16 }}>
          <div style={{ height: 8, background: "rgba(0,0,0,0.1)", borderRadius: 4, width: "80%", marginBottom: 8 }} />
          <div style={{ height: 8, background: "rgba(0,0,0,0.08)", borderRadius: 4, width: "60%" }} />
        </div>
      </div>
    </div>
  );
}

function FeatureSectionItem({ section, idx }: { section: typeof FEATURE_SECTIONS[0]; idx: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll(".slide-left");
    if (!items) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          items.forEach((el, i) => setTimeout(() => el.classList.add("visible"), i * 120));
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    if (listRef.current) observer.observe(listRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} style={{ background: section.bg, padding: "96px 24px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.14em", color: "#888", marginBottom: 16, textTransform: "uppercase" }}>
          {section.label}
        </p>
        <h2 style={{
          fontFamily: "var(--serif, Georgia, serif)",
          fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, color: "#111",
          marginBottom: 16, letterSpacing: "-0.02em", maxWidth: 520,
        }}>
          {section.heading}
        </h2>
        <p style={{ fontSize: 16, color: "#666", lineHeight: 1.7, maxWidth: 480, marginBottom: 32 }}>
          {section.desc}
        </p>

        <div ref={listRef} style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
          {section.features.map(f => (
            <div key={f} className="slide-left" style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 16, color: "#4CAF8C" }}>✓</span>
              <span style={{ fontSize: 15, fontWeight: 700, color: "#222" }}>{f}</span>
            </div>
          ))}
        </div>

        <a href="/signup" style={{
          display: "inline-block", background: "#fff", color: "#111",
          padding: "12px 28px", borderRadius: 999, fontSize: 14, fontWeight: 700,
          textDecoration: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.13)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.10)"; }}>
          Learn more →
        </a>

        <MockupPreview content={section.mockupContent} bg={section.mockupBg} />
      </div>
    </section>
  );
}

// ─── SPECIALIST SECTION ───────────────────────────────────────────────────────

function SpecialistSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const velocity = useRef(0);
  const lastX = useRef(0);
  const rafId = useRef<number>(0);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    isDragging.current = true;
    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
    lastX.current = e.pageX;
    cancelAnimationFrame(rafId.current);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.2;
    velocity.current = e.pageX - lastX.current;
    lastX.current = e.pageX;
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  }, []);

  const onMouseUp = useCallback(() => {
    isDragging.current = false;
    const inertia = () => {
      if (!sliderRef.current || Math.abs(velocity.current) < 0.5) return;
      sliderRef.current.scrollLeft -= velocity.current * 0.92;
      velocity.current *= 0.88;
      rafId.current = requestAnimationFrame(inertia);
    };
    rafId.current = requestAnimationFrame(inertia);
  }, []);

  return (
    <section id="specialists" style={{ padding: "96px 0", background: "#fff", overflow: "hidden" }}>
      <div style={{ padding: "0 24px", maxWidth: 900, marginBottom: 48 }}>
        <h2 style={{
          fontFamily: "var(--serif, Georgia, serif)",
          fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, color: "#111",
          letterSpacing: "-0.02em",
        }}>
          Meet your 12<br />AI specialists.
        </h2>
        <p style={{ fontSize: 16, color: "#888", marginTop: 12 }}>Each one trained for a specific channel. Drag to explore.</p>
      </div>

      <div
        ref={sliderRef}
        className="snap-scroll"
        style={{ display: "flex", gap: 16, padding: "8px 24px 24px", userSelect: "none" }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {SPECIALISTS.map((sp) => (
          <div
            key={sp.slug}
            className="snap-card"
            style={{
              width: "calc(50% - 16px)", minWidth: 260, background: sp.color,
              borderRadius: 24, padding: 28, boxShadow: "0 4px 20px rgba(0,0,0,0.07)",
              transition: "transform 0.25s ease, box-shadow 0.25s ease",
              display: "flex", flexDirection: "column", gap: 10,
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.03)";
              e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.14)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.07)";
            }}
          >
            <span style={{ fontSize: 36 }}>{sp.icon}</span>
            <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.12em", color: "#888", textTransform: "uppercase" }}>
              {sp.role}
            </p>
            <p style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: "-0.02em", fontFamily: "var(--serif, Georgia, serif)" }}>
              {sp.name}
            </p>
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6, fontStyle: "italic" }}>{sp.desc}</p>
            <Link href={`/dashboard/${sp.slug}`} style={{
              marginTop: "auto", display: "inline-block", fontSize: 13, fontWeight: 700,
              color: "#111", textDecoration: "none", paddingTop: 12,
            }}>
              Try now →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────

function CTABanner() {
  return (
    <section style={{ background: "#111", padding: "96px 24px", textAlign: "center" }}>
      <h2 style={{
        fontFamily: "var(--serif, Georgia, serif)",
        fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 800, color: "#fff",
        marginBottom: 20, letterSpacing: "-0.02em",
      }}>
        Start writing copy that converts.
      </h2>
      <p style={{ fontSize: 17, color: "#aaa", marginBottom: 40 }}>
        Free. 10 generations a day. No credit card.
      </p>
      <Link href="/signup" style={{
        background: "#4CAF8C", color: "#fff", padding: "16px 44px",
        borderRadius: 999, fontSize: 16, fontWeight: 700, textDecoration: "none",
        display: "inline-block", transition: "opacity 0.2s, transform 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "translateY(0)"; }}>
        Get started free →
      </Link>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ background: "#111111", padding: "64px 24px 40px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        {/* Logo */}
        <div style={{ marginBottom: 48 }}>
          <p style={{ fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 8 }}>
            Verdhana<span style={{ color: "#4CAF8C" }}>AI</span>
          </p>
          <p style={{ fontSize: 13, color: "#666" }}>12 AI marketing specialists. One platform.</p>
        </div>

        {/* Links grid */}
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 32, marginBottom: 64 }}>
          {Object.entries(FOOTER_LINKS).map(([cat, links]) => (
            <div key={cat}>
              <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.12em", color: "#fff", marginBottom: 16, textTransform: "uppercase" }}>
                {cat}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {links.map(l => (
                  <a key={l} href="#" className="footer-link">{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid #222", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
          <p style={{ fontSize: 12, color: "#555" }}>© 2026 Verdhana AI. All rights reserved.</p>
          <div style={{ display: "flex", gap: 10 }}>
            {["𝕏", "in", "▶", "📸"].map((icon, i) => (
              <div key={i} className="social-icon" style={{
                width: 36, height: 36, border: "1px solid #333", borderRadius: 8,
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", fontSize: 14, color: "#aaa",
                transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#555"; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.color = "#aaa"; }}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function LandingPage() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Hero />
      <FeatureGrid />
      {FEATURE_SECTIONS.map((s, i) => <FeatureSectionItem key={i} section={s} idx={i} />)}
      <SpecialistSection />
      <CTABanner />
      <Footer />
    </>
  );
}
