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

export default function DashboardHome() {
  return (
    <div style={{ padding: "24px 32px", maxWidth: 720 }}>
      {/* Page heading */}
      <div style={{ marginBottom: 24 }}>
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 10, fontWeight: 700,
          textTransform: "uppercase", letterSpacing: 3,
          color: "var(--con)", marginBottom: 4,
        }}>— Choose Your Weapon —</div>
        <div style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: 38, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: -2,
          lineHeight: 0.92, color: "var(--ink)",
        }}>SPECIALISTS</div>
      </div>

      {CATEGORIES.map((cat, ci) => {
        const catProducts = cat.slugs
          .map(slug => PRODUCTS.find(p => p.slug === slug))
          .filter(Boolean) as typeof PRODUCTS;

        return (
          <div key={ci} style={{ marginBottom: 4 }}>
            <div className={`cat-divider${ci === 0 ? " first" : ""}`}>
              <span className="cat-name">{cat.label}</span>
            </div>
            {catProducts.map(p => (
              <Link
                key={p.slug}
                href={`/dashboard/${p.slug}`}
                className="spec-card"
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
    </div>
  );
}
