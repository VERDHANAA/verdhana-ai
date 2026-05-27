import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

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

export default function HomePage() {
  return (
    <main
      style={{ background: "var(--bg)", minHeight: "100vh", fontFamily: "'Lexend', sans-serif" }}
    >
      {/* ── HEADER ── */}
      <header style={{
        background: "var(--wht)",
        borderBottom: "var(--b3)",
        padding: "13px 18px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div className="brand-logo">VERDHANA<em>AI</em></div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href="/login" style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 1,
            color: "var(--con)",
            textDecoration: "none",
          }}>
            SIGN IN
          </Link>
          <Link href="/signup" style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 12,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 1,
            background: "var(--ink)",
            color: "var(--teal)",
            padding: "6px 14px",
            border: "2px solid var(--ink)",
            boxShadow: "var(--sh-xs)",
            textDecoration: "none",
          }}>
            GET STARTED
          </Link>
        </div>
      </header>

      {/* ── TICKER ── */}
      <div style={{
        background: "var(--ink)",
        borderBottom: "2px solid var(--ink)",
        padding: "6px 0",
        overflow: "hidden",
        whiteSpace: "nowrap",
      }}>
        <div style={{ display: "inline-block", animation: "tick 24s linear infinite" }}>
          {["AI COPYWRITING ENGINE","///","12 SPECIALISTS ACTIVE","///","GENERATE. CONVERT. DOMINATE.","///","URBAN CONCRETE VIBES","///",
            "AI COPYWRITING ENGINE","///","12 SPECIALISTS ACTIVE","///","GENERATE. CONVERT. DOMINATE.","///","URBAN CONCRETE VIBES","///"].map((s, i) => (
            <span key={i} style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: 10,
              fontWeight: 700,
              color: s === "///" ? "var(--ora)" : "var(--teal)",
              textTransform: "uppercase",
              letterSpacing: 2,
              padding: "0 16px",
            }}>{s}</span>
          ))}
        </div>
        <style>{`@keyframes tick { from{transform:translateX(0)} to{transform:translateX(-50%)} }`}</style>
      </div>

      {/* ── HERO ── */}
      <section style={{
        borderBottom: "var(--b3)",
        padding: "28px 20px 24px",
        background: "var(--wht)",
        margin: "0 18px 0",
        borderTop: "none",
      }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 10,
          fontWeight: 700,
          textTransform: "uppercase",
          letterSpacing: 3,
          color: "var(--con)",
          marginBottom: 8,
        }}>
          — AI for marketers —
        </div>
        <h1 style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "clamp(32px, 8vw, 48px)",
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: -2,
          lineHeight: 0.92,
          color: "var(--ink)",
          marginBottom: 14,
        }}>
          COPY THAT<br />
          <span style={{
            WebkitTextStroke: "3px var(--ink)",
            color: "transparent",
          }}>CONVERTS.</span>
        </h1>
        <p style={{
          fontFamily: "'Lexend', sans-serif",
          fontSize: 13,
          lineHeight: 1.7,
          color: "var(--con)",
          maxWidth: 360,
          marginBottom: 20,
        }}>
          12 specialized AI agents write ads, emails, scripts, and landing pages
          — without sounding like AI.
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/signup" style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            background: "var(--ora)",
            color: "var(--ink)",
            padding: "14px 24px",
            border: "var(--b3)",
            boxShadow: "var(--sh)",
            textDecoration: "none",
          }}>
            START FREE ⚡
          </Link>
          <Link href="/dashboard" style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 14,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: 1.5,
            background: "var(--bg)",
            color: "var(--ink)",
            padding: "14px 24px",
            border: "var(--b3)",
            boxShadow: "var(--sh)",
            textDecoration: "none",
          }}>
            SEE DEMO →
          </Link>
        </div>
      </section>

      {/* ── SPECIALISTS ── */}
      <div style={{ padding: "18px 18px 8px" }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 10, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: 3,
          color: "var(--con)", marginBottom: 4,
        }}>— Choose Your Weapon —</div>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 32, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: -1.5,
          lineHeight: 0.92, color: "var(--ink)",
        }}>SPECIALISTS</div>
      </div>

      {CATEGORIES.map((cat, ci) => {
        const catProducts = cat.slugs
          .map(slug => PRODUCTS.find(p => p.slug === slug))
          .filter(Boolean) as typeof PRODUCTS;

        return (
          <div key={ci}>
            <div className={`cat-divider${ci === 0 ? " first" : ""}`} style={{ margin: "0 18px" }}>
              <span className="cat-name">{cat.label}</span>
            </div>
            {catProducts.map(p => (
              <Link
                key={p.slug}
                href="/signup"
                className="spec-card"
                style={{ margin: "0 18px" }}
              >
                <div className={`stamp ${STAMP_COLORS[p.slug] || "s-ora"}`} style={{ width: 50, height: 50 }}>
                  <span className="code">{p.emoji}</span>
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="sc-title">{p.name}</div>
                  <div className="sc-sub">{p.short}</div>
                </div>
                <div className="sc-arr">→</div>
              </Link>
            ))}
          </div>
        );
      })}

      {/* ── FOOTER ── */}
      <footer style={{
        margin: "20px 18px 0",
        borderTop: "var(--b3)",
        padding: "16px 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 10,
      }}>
        <div className="brand-logo" style={{ fontSize: 14 }}>VERDHANA<em>AI</em></div>
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: "var(--con)",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}>
          © {new Date().getFullYear()} VERDHANA AI
        </div>
      </footer>
    </main>
  );
}
