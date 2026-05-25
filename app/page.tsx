import Link from "next/link";
import { PRODUCTS } from "@/lib/products";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-5 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl">
          <span className="inline-block w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600" />
          Verdhana AI
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="text-sm font-medium hover:text-violet-700">
            Sign in
          </Link>
          <Link
            href="/signup"
            className="text-sm font-medium px-4 py-2 rounded-lg bg-black text-white hover:bg-zinc-800"
          >
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 py-16 md:py-24 text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-xs font-medium text-violet-700 mb-6">
          ✨ 12 AI specialists, one platform
        </div>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
          High-converting copy in{" "}
          <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
            seconds, not hours
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto">
          12 specialized AI agents that write ads, headlines, emails, and copy —
          working 24/7 so you can focus on growth.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/signup"
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium hover:opacity-90"
          >
            Start free — no card required
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-lg border border-zinc-300 font-medium hover:bg-zinc-50"
          >
            See demo
          </Link>
        </div>
      </section>

      {/* Specialists grid */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">
            Meet your 12 AI specialists
          </h2>
          <p className="mt-3 text-zinc-600">
            Each one trained for a specific marketing task. No generic outputs.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {PRODUCTS.map((p) => (
            <div
              key={p.slug}
              className="p-5 rounded-xl border border-zinc-200 bg-white hover:shadow-md hover:border-violet-300 transition"
            >
              <div className="text-3xl mb-3">{p.emoji}</div>
              <h3 className="font-semibold mb-1">{p.name}</h3>
              <p className="text-sm text-zinc-600">{p.short}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold">Stop staring at blank pages.</h2>
        <p className="mt-4 text-zinc-600">
          Get high-quality marketing copy in seconds. Free to start.
        </p>
        <Link
          href="/signup"
          className="inline-block mt-8 px-8 py-4 rounded-lg bg-black text-white font-medium hover:bg-zinc-800"
        >
          Create your free account
        </Link>
      </section>

      <footer className="px-6 py-10 border-t border-zinc-200 text-center text-sm text-zinc-500">
        © {new Date().getFullYear()} Verdhana AI. Built for marketers worldwide.
      </footer>
    </main>
  );
}
