"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SPECIALISTS = [
  { slug: "facebook-ads",    icon: "📣", name: "Facebook Ads",    desc: "High-converting copy with 3 angle variations", color: "#FFF0F5" },
  { slug: "tiktok-scripts",  icon: "📱", name: "TikTok Scripts",  desc: "Scripts that hold attention past 3 seconds",    color: "#F0F5FF" },
  { slug: "google-ads",      icon: "🔍", name: "Google Ads",      desc: "15 headlines under 30 chars for CTR",          color: "#FFFBF0" },
  { slug: "instagram",       icon: "📸", name: "Instagram",       desc: "Captions that earn comments, not scrolls",     color: "#FFF0F8" },
  { slug: "email-marketing", icon: "📧", name: "Email Marketing", desc: "Reads like a human, not a brand template",     color: "#F0FBF8" },
  { slug: "youtube-titles",  icon: "▶️",  name: "YouTube Titles", desc: "Titles that earn clicks honestly",             color: "#FFF5F0" },
  { slug: "product-desc",    icon: "📦", name: "Product Desc.",   desc: "Like a knowledgeable shop owner wrote it",     color: "#F5F0FF" },
  { slug: "video-scripts",   icon: "🎬", name: "Video Scripts",   desc: "30s, 60s, 90s for Meta & YouTube",            color: "#F0F8FF" },
  { slug: "landing-pages",   icon: "🌐", name: "Landing Pages",   desc: "Full page from hero to FAQ",                  color: "#F0FFF5" },
  { slug: "push-notifs",     icon: "🔔", name: "Push Notifs",     desc: "Messages people don't immediately delete",    color: "#FFFBF0" },
  { slug: "sms-marketing",   icon: "💬", name: "SMS Marketing",   desc: "Campaigns that don't feel like spam",         color: "#FFF0F5" },
  { slug: "linkedin-ads",    icon: "💼", name: "LinkedIn Ads",    desc: "B2B copy that respects the reader's time",    color: "#F0F5FF" },
];

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [quota, setQuota] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { init(); }, []);

  async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    setLoading(false);
    try {
      const res = await fetch("/api/usage");
      const data = await res.json();
      setQuota(data.remaining ?? 10);
    } catch { setQuota(10); }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  if (loading) return (
    <div style={{ background: "#F5FBF8", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 14, color: "#6B8B7E" }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ background: "#F5FBF8", minHeight: "100vh", color: "#1A1A1A", fontFamily: "var(--font-space-grotesk), system-ui, sans-serif" }}>

      {/* NAV */}
      <header style={{ width: "100%", position: "sticky", top: 0, zIndex: 50, background: "#ffffff", borderBottom: "1px solid #C8E6D8" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 24px", height: 60, maxWidth: 1200, margin: "0 auto" }}>
          <Link href="/" style={{ textDecoration: "none", color: "#1A1A1A", fontWeight: 700, fontSize: 16 }}>
            Verdhana AI
          </Link>
          <nav style={{ display: "flex", gap: 24, alignItems: "center" }} className="desktop-nav">
            <Link href="/dashboard" style={{ fontSize: 14, color: "#4CAF8C", textDecoration: "none", fontWeight: 600, borderBottom: "2px solid #4CAF8C", paddingBottom: 2 }}>Tools</Link>
            <Link href="/history"   style={{ fontSize: 14, color: "#6B8B7E", textDecoration: "none", fontWeight: 500 }}>History</Link>
            <Link href="/account"   style={{ fontSize: 14, color: "#6B8B7E", textDecoration: "none", fontWeight: 500 }}>Account</Link>
          </nav>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ background: "#F0FAF5", border: "1px solid #C8E6D8", borderRadius: 20, padding: "4px 12px", fontSize: 13, color: "#4CAF8C", fontWeight: 600 }}>
              {quota !== null ? `${quota}/10` : "…"}
            </span>
            <button
              onClick={handleSignOut}
              style={{ background: "none", border: "1px solid #C8E6D8", borderRadius: 8, padding: "5px 14px", fontSize: 13, color: "#6B8B7E", cursor: "pointer", fontWeight: 500 }}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 100px" }}>
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 700, color: "#1A1A1A", marginBottom: 8, letterSpacing: "-0.02em" }}>
            Your specialists
          </h1>
          <p style={{ fontSize: 15, color: "#6B8B7E" }}>
            12 AI tools trained for high-impact marketing copy. Pick one and start writing.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }} className="dash-grid">
          {SPECIALISTS.map((sp) => (
            <Link
              key={sp.slug}
              href={`/dashboard/${sp.slug}`}
              style={{
                display: "flex", flexDirection: "column", textDecoration: "none", color: "#1A1A1A",
                background: sp.color, border: "1px solid #C8E6D8", borderRadius: 16,
                padding: "20px 18px", transition: "transform 0.15s, box-shadow 0.15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 20px rgba(76,175,140,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div style={{ fontSize: 28, marginBottom: 10 }}>{sp.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 5, color: "#1A1A1A" }}>{sp.name}</div>
              <div style={{ fontSize: 12, color: "#6B8B7E", lineHeight: 1.55, flex: 1 }}>{sp.desc}</div>
              <div style={{ marginTop: 14, fontSize: 12, fontWeight: 600, color: "#4CAF8C" }}>Open →</div>
            </Link>
          ))}
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="mobile-nav" style={{
        position: "fixed", bottom: 0, left: 0, width: "100%",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "10px 0", background: "#ffffff", borderTop: "1px solid #C8E6D8", zIndex: 50,
      }}>
        <Link href="/dashboard" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#4CAF8C", textDecoration: "none", padding: "6px 16px", fontSize: 11, fontWeight: 600 }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>🛠</span>
          Tools
        </Link>
        <Link href="/history" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#6B8B7E", textDecoration: "none", padding: "6px 16px", fontSize: 11, fontWeight: 500 }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>📋</span>
          History
        </Link>
        <Link href="/account" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#6B8B7E", textDecoration: "none", padding: "6px 16px", fontSize: 11, fontWeight: 500 }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>👤</span>
          Account
        </Link>
      </nav>

      <style>{`
        @media (max-width: 900px) { .dash-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 600px) { .dash-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (min-width: 769px) { .mobile-nav { display: none !important; } }
        @media (max-width: 768px) { .desktop-nav { display: none !important; } }
      `}</style>
    </div>
  );
}
