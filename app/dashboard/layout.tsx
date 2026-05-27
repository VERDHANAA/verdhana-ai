"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { createClient } from "@/lib/supabase/client";

const STAMP_COLORS: Record<string, string> = {
  "facebook-ads":        "s-ora",
  "tiktok-ads":          "s-ink",
  "google-headlines":    "s-teal",
  "instagram-captions":  "s-ora",
  "email-marketing":     "s-teal",
  "youtube-titles":      "s-ora",
  "product-description": "s-wht",
  "video-script":        "s-ink",
  "landing-page":        "s-ora",
  "push-notification":   "s-teal",
  "sms-marketing":       "s-ink",
  "linkedin-ads":        "s-wht",
};

const CATEGORIES = [
  { label: "PAID ADVERTISING",   slugs: ["facebook-ads", "google-headlines", "tiktok-ads"] },
  { label: "SOCIAL MEDIA",       slugs: ["instagram-captions", "push-notification", "linkedin-ads", "sms-marketing"] },
  { label: "CONTENT CREATION",   slugs: ["youtube-titles", "email-marketing", "product-description"] },
  { label: "CONVERSION",         slugs: ["landing-page", "video-script"] },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>
      {/* ── SIDEBAR ── */}
      <aside style={{
        width: 280,
        minHeight: "100vh",
        background: "var(--wht)",
        borderRight: "var(--b3)",
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        overflowY: "auto",
        zIndex: 50,
      }}>
        {/* Sidebar header */}
        <div style={{
          padding: "14px 16px",
          borderBottom: "var(--b3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          background: "var(--wht)",
          zIndex: 10,
        }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div className="brand-logo">VERDHANA<em>AI</em></div>
          </Link>
          <button
            onClick={handleLogout}
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 1,
              background: "transparent",
              color: "var(--con)",
              border: "2px solid var(--con)",
              padding: "4px 8px",
              cursor: "pointer",
            }}
          >
            OUT
          </button>
        </div>

        {/* Ticker strip in sidebar */}
        <div style={{
          background: "var(--ink)",
          padding: "5px 14px",
          borderBottom: "2px solid var(--ink)",
        }}>
          <span style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 9,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "var(--teal)",
          }}>SPECIALISTS</span>
        </div>

        {/* Nav items */}
        <nav style={{ flex: 1 }}>
          {CATEGORIES.map((cat, ci) => {
            const catProducts = cat.slugs
              .map(slug => PRODUCTS.find(p => p.slug === slug))
              .filter(Boolean) as typeof PRODUCTS;

            return (
              <div key={ci}>
                <div
                  className={`cat-divider${ci === 0 ? " first" : ""}`}
                  style={{ margin: "0 16px" }}
                >
                  <span className="cat-name">{cat.label}</span>
                </div>
                {catProducts.map(p => {
                  const active = pathname === `/dashboard/${p.slug}`;
                  return (
                    <Link
                      key={p.slug}
                      href={`/dashboard/${p.slug}`}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 16px",
                        borderLeft: "3px solid var(--ink)",
                        borderRight: "3px solid var(--ink)",
                        borderBottom: "2px solid var(--ink)",
                        background: active ? "var(--ink)" : "var(--wht)",
                        textDecoration: "none",
                        transition: "background .08s",
                        marginLeft: 16,
                        marginRight: 16,
                      }}
                      onMouseEnter={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "var(--bg)"; }}
                      onMouseLeave={e => { if (!active) (e.currentTarget as HTMLAnchorElement).style.background = "var(--wht)"; }}
                    >
                      <div
                        className={`stamp ${STAMP_COLORS[p.slug] || "s-ora"}`}
                        style={{ width: 32, height: 32 }}
                      >
                        <span className="code" style={{ fontSize: 10, letterSpacing: -.5 }}>{p.emoji}</span>
                      </div>
                      <span style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: .3,
                        color: active ? "var(--teal)" : "var(--ink)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}>
                        {p.name}
                      </span>
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, marginLeft: 280 }}>
        {children}
      </main>
    </div>
  );
}
