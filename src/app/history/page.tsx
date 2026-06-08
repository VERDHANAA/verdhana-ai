"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Generation = {
  id: string;
  product_slug: string;
  result: string;
  quality_score: number | null;
  was_polished: boolean;
  created_at: string;
};

const SLUG_LABELS: Record<string, string> = {
  "facebook-ads": "Facebook Ads", "tiktok-scripts": "TikTok Scripts",
  "google-ads": "Google Ads", "instagram": "Instagram", "email-marketing": "Email",
  "youtube-titles": "YouTube", "product-desc": "Product Desc", "video-scripts": "Video Scripts",
  "landing-pages": "Landing Page", "push-notifs": "Push Notifs",
  "sms-marketing": "SMS", "linkedin-ads": "LinkedIn Ads",
};

export default function HistoryPage() {
  const router = useRouter();
  const supabase = createClient();
  const [gens, setGens] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Generation | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => { fetchHistory(); }, []);

  async function fetchHistory() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    const { data } = await supabase
      .from("generations")
      .select("id,product_slug,result,quality_score,was_polished,created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(50);
    setGens(data || []);
    setLoading(false);
  }

  async function handleCopy(text: string) {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

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
            <Link href="/dashboard" style={{ fontSize: 14, color: "#787774", textDecoration: "none", fontWeight: 500 }}>Tools</Link>
            <Link href="/history" style={{ fontSize: 14, color: "#37352F", textDecoration: "none", fontWeight: 600, borderBottom: "2px solid #37352F", paddingBottom: 2 }}>History</Link>
            <Link href="/account" style={{ fontSize: 14, color: "#787774", textDecoration: "none", fontWeight: 500 }}>Account</Link>
          </nav>
          <Link href="/signup" style={{
            background: "#1A1A1A", color: "#ffffff", padding: "7px 18px", borderRadius: 7,
            fontSize: 13, fontWeight: 600, textDecoration: "none",
          }}>
            Upgrade
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px 96px" }}>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <Link href="/dashboard" style={{ fontSize: 13, color: "#787774", textDecoration: "none", fontWeight: 500, display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16 }}>
            ← Back to tools
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#37352F", marginBottom: 8 }}>Your history</h1>
          <p style={{ fontSize: 14, color: "#787774" }}>
            {gens.length > 0 ? `${gens.length} generation${gens.length !== 1 ? "s" : ""} total` : "Your generated copy will show up here."}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
            <div style={{ fontSize: 14, color: "#787774" }}>Loading...</div>
          </div>
        )}

        {/* Empty state */}
        {!loading && gens.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "80px 0" }}>
            <div style={{
              width: 64, height: 64, background: "#ffffff", border: "1px solid #E8E6E1", borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, fontSize: 28,
            }}>
              📋
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 600, color: "#37352F", marginBottom: 8 }}>Nothing here yet.</h3>
            <p style={{ fontSize: 14, color: "#787774", maxWidth: 320, marginBottom: 24, lineHeight: 1.6 }}>
              Your generated copy will show up here. Go write something.
            </p>
            <Link href="/dashboard" style={{
              background: "#1A1A1A", color: "#ffffff", padding: "10px 24px", borderRadius: 7,
              fontSize: 14, fontWeight: 600, textDecoration: "none",
            }}>
              Pick a specialist →
            </Link>
          </div>
        )}

        {/* History list */}
        {!loading && gens.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {gens.map((g) => (
              <div
                key={g.id}
                onClick={() => setSelected(g)}
                style={{
                  background: "#ffffff", border: "1px solid #E8E6E1", borderRadius: 8,
                  padding: "16px 20px", cursor: "pointer", transition: "background 0.15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F9F6F0")}
                onMouseLeave={e => (e.currentTarget.style.background = "#ffffff")}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#37352F" }}>
                    {SLUG_LABELS[g.product_slug] || g.product_slug}
                  </span>
                  {g.quality_score && (
                    <span style={{
                      fontSize: 11, background: "#F9F6F0", border: "1px solid #E8E6E1",
                      borderRadius: 4, padding: "2px 7px", color: "#787774", fontWeight: 500,
                    }}>
                      {g.quality_score.toFixed(1)}{g.was_polished ? " ✓" : ""}
                    </span>
                  )}
                  <span style={{ marginLeft: "auto", fontSize: 12, color: "#787774" }}>
                    {new Date(g.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </span>
                </div>
                <div style={{
                  fontSize: 13, color: "#787774", lineHeight: 1.5,
                  display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical" as const, overflow: "hidden",
                }}>
                  {g.result}
                </div>
              </div>
            ))}
          </div>
        )}

      </main>

      {/* Detail modal */}
      {selected && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 200,
            display: "flex", alignItems: "flex-end", justifyContent: "center",
          }}
          onClick={() => setSelected(null)}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: "#ffffff", width: "100%", maxWidth: 640,
              maxHeight: "85vh", overflow: "auto", borderRadius: "8px 8px 0 0",
              boxShadow: "0 -4px 24px rgba(0,0,0,0.12)",
            }}
          >
            {/* Modal header */}
            <div style={{
              position: "sticky", top: 0, background: "#ffffff",
              borderBottom: "1px solid #E8E6E1", padding: "16px 20px",
              display: "flex", alignItems: "center", gap: 12,
            }}>
              <button
                onClick={() => setSelected(null)}
                style={{
                  width: 32, height: 32, background: "#F9F6F0", border: "1px solid #E8E6E1",
                  borderRadius: 6, display: "grid", placeItems: "center", cursor: "pointer",
                  fontSize: 16, color: "#37352F", flexShrink: 0,
                }}
              >
                ✕
              </button>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#37352F", flex: 1 }}>
                {SLUG_LABELS[selected.product_slug] || selected.product_slug}
              </span>
              {selected.quality_score && (
                <span style={{
                  fontSize: 12, background: "#F9F6F0", border: "1px solid #E8E6E1",
                  borderRadius: 4, padding: "3px 10px", color: "#787774", fontWeight: 500,
                }}>
                  {selected.quality_score.toFixed(1)}/10{selected.was_polished ? " ✓" : ""}
                </span>
              )}
            </div>
            {/* Modal body */}
            <div style={{ padding: 24 }}>
              <div style={{
                background: "#F9F6F0", border: "1px solid #E8E6E1", borderRadius: 7,
                padding: 16, fontSize: 14, lineHeight: 1.7, whiteSpace: "pre-wrap",
                color: "#37352F", marginBottom: 16,
              }}>
                {selected.result}
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <button
                  onClick={() => handleCopy(selected.result)}
                  style={{
                    background: "#1A1A1A", color: "#ffffff", border: "none",
                    borderRadius: 7, padding: "9px 20px", fontSize: 13, fontWeight: 600,
                    cursor: "pointer", flex: 1,
                  }}
                >
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={() => { router.push(`/dashboard/${selected.product_slug}`); setSelected(null); }}
                  style={{
                    background: "#F9F6F0", color: "#37352F", border: "1px solid #E8E6E1",
                    borderRadius: 7, padding: "9px 20px", fontSize: 13, fontWeight: 500,
                    cursor: "pointer", flex: 1,
                  }}
                >
                  Write it again
                </button>
              </div>
              <p style={{ textAlign: "center", fontSize: 11, color: "#787774" }}>
                {new Date(selected.created_at).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Bottom nav mobile */}
      <nav className="hist-mobile-nav" style={{
        position: "fixed", bottom: 0, left: 0, width: "100%",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "10px 16px", background: "#ffffff", borderTop: "1px solid #E8E6E1", zIndex: 50,
      }}>
        <Link href="/dashboard" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#787774", textDecoration: "none", padding: "6px 12px", fontSize: 11, fontWeight: 500 }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>🛠</span>
          Tools
        </Link>
        <Link href="/history" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#37352F", textDecoration: "none", padding: "6px 12px", fontSize: 11, fontWeight: 600 }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>📋</span>
          History
        </Link>
        <Link href="/account" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#787774", textDecoration: "none", padding: "6px 12px", fontSize: 11, fontWeight: 500 }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>👤</span>
          Account
        </Link>
      </nav>

      <style>{`
        @media (min-width: 769px) { .hist-mobile-nav { display: none !important; } }
      `}</style>
    </div>
  );
}
