"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SPECIALISTS = [
  { slug: "facebook-ads",    icon: "📣", name: "Facebook Ads",    desc: "High-converting copy with 3 angle variations" },
  { slug: "tiktok-scripts",  icon: "📱", name: "TikTok Scripts",  desc: "Scripts that hold attention past 3 seconds" },
  { slug: "google-ads",      icon: "🔍", name: "Google Ads",      desc: "15 headlines under 30 chars for CTR" },
  { slug: "instagram",       icon: "📸", name: "Instagram",       desc: "Captions that earn comments, not scrolls" },
  { slug: "email-marketing", icon: "📧", name: "Email Marketing", desc: "Reads like a human, not a brand template" },
  { slug: "youtube-titles",  icon: "▶️", name: "YouTube Titles",  desc: "Titles that earn clicks honestly" },
  { slug: "product-desc",    icon: "📦", name: "Product Desc.",   desc: "Like a knowledgeable shop owner wrote it" },
  { slug: "video-scripts",   icon: "🎬", name: "Video Scripts",   desc: "30s, 60s, 90s for Meta & YouTube" },
  { slug: "landing-pages",   icon: "🌐", name: "Landing Pages",   desc: "Full page from hero to FAQ" },
  { slug: "push-notifs",     icon: "🔔", name: "Push Notifs",     desc: "Messages people don't immediately delete" },
  { slug: "sms-marketing",   icon: "💬", name: "SMS Marketing",   desc: "Campaigns that don't feel like spam" },
  { slug: "linkedin-ads",    icon: "💼", name: "LinkedIn Ads",    desc: "B2B copy that respects the reader's time" },
];

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [quota, setQuota] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    fetchQuota();
  }, []);

  async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    setLoading(false);
  }

  async function fetchQuota() {
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
    <div style={{ background: "#F9F6F0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 14, color: "#787774" }}>Loading...</div>
    </div>
  );

  return (
    <div style={{ background: "#F9F6F0", minHeight: "100vh", color: "#37352F" }}>

      {/* NAV */}
      <header style={{
        width: "100%", position: "sticky", top: 0, zIndex: 50,
        background: "#ffffff", borderBottom: "1px solid #E8E6E1",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "0 24px", height: 60, maxWidth: 1200, margin: "0 auto",
        }}>
          <Link href="/" style={{ textDecoration: "none", color: "#37352F", fontWeight: 700, fontSize: 16 }}>
            Verdhana AI
          </Link>
          <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link href="/dashboard" style={{ fontSize: 14, color: "#37352F", textDecoration: "none", fontWeight: 600, borderBottom: "2px solid #37352F", paddingBottom: 2 }}>Tools</Link>
            <Link href="/history" style={{ fontSize: 14, color: "#787774", textDecoration: "none", fontWeight: 500 }}>History</Link>
            <Link href="/account" style={{ fontSize: 14, color: "#787774", textDecoration: "none", fontWeight: 500 }}>Account</Link>
          </nav>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{
              background: "#F9F6F0", border: "1px solid #E8E6E1", borderRadius: 6,
              padding: "4px 10px", fontSize: 13, color: "#787774", fontWeight: 500,
            }}>
              {quota !== null ? `${quota}/10 left` : "…"}
            </span>
            <button
              onClick={handleSignOut}
              style={{
                background: "none", border: "1px solid #E8E6E1", borderRadius: 6,
                padding: "5px 14px", fontSize: 13, color: "#787774", cursor: "pointer", fontWeight: 500,
              }}
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 96px" }}>

        {/* Hero */}
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, color: "#37352F", marginBottom: 8, letterSpacing: "-0.02em" }}>
            Your specialists
          </h1>
          <p style={{ fontSize: 15, color: "#787774" }}>
            12 AI tools trained for high-impact marketing copy. Pick one and start writing.
          </p>
        </div>

        {/* Specialists Grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 48 }}
          className="dash-grid"
        >
          {SPECIALISTS.map((sp) => (
            <Link
              key={sp.slug}
              href={`/dashboard/${sp.slug}`}
              style={{
                display: "flex", flexDirection: "column", textDecoration: "none", color: "#37352F",
                background: "#ffffff", border: "1px solid #E8E6E1", borderRadius: 8,
                padding: 20, transition: "background 0.15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "#F0EDE8")}
              onMouseLeave={e => (e.currentTarget.style.background = "#ffffff")}
            >
              <div style={{ fontSize: 28, marginBottom: 12 }}>{sp.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: "#37352F" }}>{sp.name}</div>
              <div style={{ fontSize: 12, color: "#787774", lineHeight: 1.5, flex: 1 }}>{sp.desc}</div>
              <div style={{
                marginTop: 16, fontSize: 12, fontWeight: 600, color: "#1A1A1A",
                display: "flex", alignItems: "center", gap: 4,
              }}>
                Open →
              </div>
            </Link>
          ))}
        </div>

      </main>

      {/* Bottom nav mobile */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, width: "100%",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "10px 16px", background: "#ffffff", borderTop: "1px solid #E8E6E1", zIndex: 50,
      }}>
        <Link href="/dashboard" style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          color: "#37352F", textDecoration: "none", padding: "6px 12px", fontSize: 11, fontWeight: 600,
        }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>🛠</span>
          Tools
        </Link>
        <Link href="/history" style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          color: "#787774", textDecoration: "none", padding: "6px 12px", fontSize: 11, fontWeight: 500,
        }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>📋</span>
          History
        </Link>
        <Link href="/account" style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          color: "#787774", textDecoration: "none", padding: "6px 12px", fontSize: 11, fontWeight: 500,
        }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>👤</span>
          Account
        </Link>
      </nav>

      <style>{`
        @media (max-width: 900px) { .dash-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 640px) { .dash-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </div>
  );
}
