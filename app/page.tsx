import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

const folderEmojis: Record<string, string> = {
  "facebook-ads": "FB",
  "tiktok-ads": "TT",
  "google-headlines": "GA",
  "instagram-captions": "IG",
  "email-marketing": "EM",
  "youtube-titles": "YT",
  "product-description": "PD",
  "video-script": "VS",
  "landing-page": "LP",
  "push-notification": "PN",
  "sms-marketing": "SM",
  "linkedin-ads": "LI",
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-neo-light">

      {/* Nav */}
      <nav className="bg-neo-dark border-b-2 border-neo-dark px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="inline-block w-3 h-3 rounded-full bg-neo-orange border border-neo-light" />
              <span className="inline-block w-3 h-3 rounded-full bg-neo-teal border border-neo-light" />
              <span className="inline-block w-3 h-3 rounded-full bg-neo-gray border border-neo-light" />
            </div>
            <span className="text-neo-light font-black text-lg tracking-tight">Verdhana AI</span>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex items-center flex-1 max-w-sm mx-8">
            <div className="flex w-full border-2 border-neo-light bg-neo-dark neo-btn rounded-none">
              <input
                type="text"
                placeholder="Search tools..."
                className="flex-1 bg-transparent text-neo-light placeholder-neo-gray text-sm px-3 py-2 outline-none"
              />
              <button className="px-3 py-2 bg-neo-orange text-neo-light border-l-2 border-neo-light text-sm font-bold">
                →
              </button>
            </div>
          </div>

          {/* Nav links */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-neo-light text-sm font-bold hover:text-neo-teal transition-colors px-3 py-1.5"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="neo-btn bg-neo-orange text-neo-light text-sm px-4 py-2 rounded-none inline-block"
            >
              Get started →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-neo-teal border-b-4 border-neo-dark px-6 py-16 md:py-24 relative overflow-hidden">
        {/* Decorative dots grid */}
        <div className="absolute top-8 right-1/4 grid grid-cols-4 gap-2 opacity-30">
          {Array.from({ length: 16 }).map((_, i) => (
            <span key={i} className="w-1.5 h-1.5 rounded-full bg-neo-dark inline-block" />
          ))}
        </div>

        {/* Decorative browser window (top-right) */}
        <div className="absolute top-6 right-8 hidden lg:block">
          <div className="w-40 h-28 bg-neo-orange border-2 border-neo-dark shadow-brutal-lg rounded-none">
            <div className="flex items-center gap-1 px-2 py-1.5 border-b-2 border-neo-dark">
              <span className="w-2 h-2 rounded-full bg-neo-dark" />
              <span className="w-2 h-2 rounded-full bg-neo-dark" />
              <span className="w-2 h-2 rounded-full bg-neo-dark" />
            </div>
            <div className="p-2">
              <div className="flex items-center gap-1 border-2 border-neo-dark bg-neo-light px-2 py-1 text-xs text-neo-dark font-bold">
                <span className="flex-1">verdhana.ai</span>
                <span>⌕</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative small browser (mid-right) */}
        <div className="absolute bottom-8 right-1/4 hidden lg:block">
          <div className="w-28 h-16 bg-neo-light border-2 border-neo-dark shadow-brutal rounded-none">
            <div className="flex items-center justify-center gap-1.5 py-3 px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-neo-dark border border-neo-gray" />
              <span className="w-2.5 h-2.5 rounded-full bg-neo-dark border border-neo-gray" />
              <span className="w-2.5 h-2.5 rounded-full bg-neo-dark border border-neo-gray" />
            </div>
          </div>
        </div>

        {/* Decorative triangle */}
        <div className="absolute bottom-12 right-12 hidden lg:block">
          <div
            className="w-0 h-0 border-solid"
            style={{
              borderLeft: "14px solid transparent",
              borderRight: "14px solid transparent",
              borderBottom: "22px solid #1C1C1E",
            }}
          />
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-neo-dark bg-neo-dark text-neo-teal text-xs font-black uppercase tracking-widest mb-6 shadow-brutal-sm">
            ✦ 12 AI specialists, one platform
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-neo-dark mb-4">
            High-converting<br />
            <span
              className="inline-block bg-neo-dark text-neo-teal px-2"
              style={{ WebkitTextStroke: "1px #1C1C1E" }}
            >
              copy
            </span>{" "}
            in seconds.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-neo-dark font-medium max-w-xl border-l-4 border-neo-dark pl-4">
            12 specialized AI agents that write ads, headlines, emails, and copy —
            working 24/7 so you can focus on growth.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              href="/signup"
              className="neo-btn bg-neo-dark text-neo-light px-8 py-4 text-base font-black uppercase tracking-wide inline-block text-center rounded-none"
            >
              Explore tools
            </Link>
            <Link
              href="/dashboard"
              className="neo-btn bg-neo-light text-neo-dark px-8 py-4 text-base font-black uppercase tracking-wide inline-block text-center rounded-none"
            >
              See demo →
            </Link>
          </div>
        </div>
      </section>

      {/* Specialists grid */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="mb-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <div className="inline-block bg-neo-orange text-neo-light text-xs font-black px-2 py-1 border-2 border-neo-dark mb-2">
              TOOLS
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-neo-dark leading-none">
              Meet your 12 AI specialists
            </h2>
          </div>
          <p className="text-neo-gray font-medium max-w-xs">
            Each one trained for a specific marketing task. No generic outputs.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRODUCTS.map((p, idx) => (
            <Link
              key={p.slug}
              href={`/dashboard/${p.slug}`}
              className="neo-card bg-neo-teal p-5 block group"
            >
              <div className="flex items-start justify-between mb-4">
                {/* Folder icon */}
                <div className="w-10 h-10 bg-neo-dark flex items-center justify-center border-2 border-neo-dark">
                  <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                    <path
                      d="M1 3C1 1.9 1.9 1 3 1H8L10 4H19C20.1 4 21 4.9 21 6V15C21 16.1 20.1 17 19 17H3C1.9 17 1 16.1 1 15V3Z"
                      fill="#00BFAE"
                      stroke="#F0F0F0"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <span className="text-xs font-black text-neo-dark bg-neo-light border-2 border-neo-dark px-2 py-0.5 shadow-brutal-sm">
                  #{String(idx + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="font-black text-neo-dark text-lg leading-tight mb-2">
                {p.name}
              </h3>
              <p className="text-sm text-neo-dark font-medium opacity-80 mb-4 leading-snug">
                {p.short}
              </p>

              {/* Bottom bar */}
              <div className="border-t-2 border-neo-dark pt-3 flex items-center justify-between">
                <div className="flex gap-1">
                  <span className="w-4 h-1.5 bg-neo-dark inline-block" />
                  <span className="w-8 h-1.5 bg-neo-dark opacity-40 inline-block" />
                  <span className="w-6 h-1.5 bg-neo-dark opacity-20 inline-block" />
                </div>
                <span className="text-xs font-black text-neo-dark group-hover:translate-x-1 transition-transform">
                  USE →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-6 py-0 max-w-7xl mx-auto mb-16">
        <div className="neo-card bg-neo-orange p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-neo-light leading-tight">
              Stop staring at blank pages.
            </h2>
            <p className="mt-2 text-neo-light font-medium opacity-90">
              High-quality marketing copy in seconds. Free to start.
            </p>
          </div>
          <Link
            href="/signup"
            className="neo-btn bg-neo-dark text-neo-light px-8 py-4 text-base font-black uppercase tracking-wide inline-block whitespace-nowrap rounded-none"
            style={{ boxShadow: "4px 4px 0px #F0F0F0" }}
          >
            Create free account →
          </Link>
        </div>
      </section>

      <footer className="bg-neo-dark border-t-4 border-neo-dark px-6 py-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-neo-orange" />
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-neo-teal" />
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-neo-gray" />
            </div>
            <span className="text-neo-light font-black text-sm">Verdhana AI</span>
          </div>
          <p className="text-neo-gray text-sm font-medium">
            © {new Date().getFullYear()} Verdhana AI. Built for marketers worldwide.
          </p>
          <div className="flex gap-4">
            <Link href="/login" className="text-neo-gray text-sm font-medium hover:text-neo-teal transition-colors">
              Sign in
            </Link>
            <Link href="/signup" className="text-neo-gray text-sm font-medium hover:text-neo-teal transition-colors">
              Sign up
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
