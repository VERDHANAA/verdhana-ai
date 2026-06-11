"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SPECIALISTS = [
  { slug: "facebook-ads",    icon: "📣", name: "Facebook Ads",    role: "PAID SOCIAL",      desc: "High-converting copy with 3 angle variations." },
  { slug: "tiktok-scripts",  icon: "📱", name: "TikTok Scripts",  role: "SHORT VIDEO",       desc: "Scripts engineered to hold attention past 3 seconds." },
  { slug: "google-ads",      icon: "🔍", name: "Google Ads",      role: "SEARCH & DISPLAY",  desc: "15 headlines under 30 characters — built for CTR." },
  { slug: "instagram",       icon: "📸", name: "Instagram",       role: "VISUAL CONTENT",    desc: "Captions that earn comments, not scrolls." },
  { slug: "email-marketing", icon: "📧", name: "Email Marketing", role: "RETENTION",         desc: "Reads like a human wrote it, not a brand template." },
  { slug: "youtube-titles",  icon: "▶️",  name: "YouTube Titles", role: "VIDEO CAMPAIGN",    desc: "Titles that earn clicks honestly." },
  { slug: "product-desc",    icon: "📦", name: "Product Copy",    role: "CONVERSION COPY",   desc: "Like a knowledgeable shop owner wrote every word." },
  { slug: "video-scripts",   icon: "🎬", name: "Video Scripts",   role: "STORYTELLING",      desc: "30s, 60s, 90s formats for Meta & YouTube." },
  { slug: "landing-pages",   icon: "🌐", name: "Landing Pages",   role: "CRO",               desc: "Full page from hero to FAQ — ready to publish." },
  { slug: "push-notifs",     icon: "🔔", name: "Push Notifs",     role: "ENGAGEMENT",        desc: "Messages people don't immediately dismiss." },
  { slug: "sms-marketing",   icon: "💬", name: "SMS Marketing",   role: "DIRECT RESPONSE",   desc: "Campaigns that convert without feeling like spam." },
  { slug: "linkedin-ads",    icon: "💼", name: "LinkedIn Ads",    role: "B2B GROWTH",        desc: "B2B copy that respects the reader's time." },
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

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <div style={{ width: "32px", height: "32px", border: "2px solid var(--border)", borderTopColor: "var(--primary)", borderRadius: "100px", animation: "spin 0.8s linear infinite" }} />
          <p className="mono-label">LOADING</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex" }}>

      {/* Sidebar */}
      <aside style={{ width: "220px", flexShrink: 0, background: "rgba(0,0,0,0.25)", borderRight: "1px solid var(--border)", padding: "24px 16px", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, overflowY: "auto" }} className="desktop-only">
        <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "0 12px", marginBottom: "32px" }}>
          <Link href="/" style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "16px", color: "var(--t1)", textDecoration: "none", letterSpacing: "-0.02em" }}>Verdhana AI</Link>
          <span style={{ width: "6px", height: "6px", borderRadius: "100px", background: "var(--primary)", animation: "pulseDot 2s ease-in-out infinite", flexShrink: 0 }} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "4px", flex: 1 }}>
          <p className="mono-label" style={{ padding: "0 12px", marginBottom: "8px" }}>TOOLS</p>
          <Link href="/dashboard" className="sidebar-item active">
            <span>⚡</span> All Specialists
          </Link>
          <Link href="/history" className="sidebar-item">
            <span>📋</span> History
          </Link>
          <Link href="/account" className="sidebar-item">
            <span>👤</span> Account
          </Link>
        </div>

        <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ background: "var(--primary-dim)", border: "1px solid rgba(123,111,238,0.2)", borderRadius: "10px", padding: "12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="mono-label" style={{ color: "var(--t2)" }}>DAILY</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--primary)", fontWeight: 500 }}>{quota ?? "…"}<span style={{ color: "var(--t3)" }}>/10</span></span>
          </div>
          <button onClick={handleSignOut} className="btn-ghost" style={{ width: "100%", justifyContent: "center", padding: "8px 16px", fontSize: "13px" }}>
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main style={{ flex: 1, marginLeft: "220px", padding: "40px 40px 80px" }} className="desktop-main">
        <div style={{ maxWidth: "1040px" }}>
          <div style={{ marginBottom: "36px" }}>
            <p className="mono-label" style={{ marginBottom: "12px" }}>12 SPECIALISTS</p>
            <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "clamp(28px, 4vw, 40px)", color: "var(--t1)", letterSpacing: "-0.04em", lineHeight: 1.1, marginBottom: "12px" }}>
              Your marketing team.
            </h1>
            <p style={{ fontSize: "15px", color: "var(--t2)", maxWidth: "480px" }}>
              Each specialist is trained for one channel. Pick one, write a brief, get copy — in seconds.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }} className="specialists-grid">
            {SPECIALISTS.map((sp) => (
              <Link key={sp.slug} href={`/dashboard/${sp.slug}`} className="specialist-card">
                <div style={{ marginBottom: "4px" }}>
                  <p className="mono-label">{sp.role}</p>
                </div>
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>{sp.icon}</div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--t1)", marginBottom: "6px" }}>{sp.name}</h3>
                <p style={{ fontSize: "13px", color: "var(--t2)", lineHeight: 1.5, flex: 1 }}>{sp.desc}</p>
                <div style={{ marginTop: "16px", fontSize: "12px", color: "var(--primary)", fontWeight: 500 }}>Open →</div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      {/* Mobile bottom nav */}
      <nav className="mobile-sidebar" style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "var(--surface)", borderTop: "1px solid var(--border)", display: "none", justifyContent: "space-around", padding: "12px 0 20px", zIndex: 50 }}>
        {[
          { href: "/dashboard", icon: "⚡", label: "Tools" },
          { href: "/history",   icon: "📋", label: "History" },
          { href: "/account",   icon: "👤", label: "Account" },
        ].map(item => (
          <Link key={item.href} href={item.href} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textDecoration: "none", color: "var(--t2)", fontSize: "11px", fontFamily: "var(--font-mono)" }}>
            <span style={{ fontSize: "18px" }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <style>{`
        @media (max-width: 768px) {
          .desktop-main { margin-left: 0 !important; padding: 24px 20px 100px !important; }
          .specialists-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .specialists-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
