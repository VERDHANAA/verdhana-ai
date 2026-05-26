"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

type Stats = {
  summary: {
    users_total: number;
    gens_today: number;
    gens_month: number;
    gens_alltime: number;
    polish_today: number;
    avg_quality_today: number | null;
    fallback_today: number;
    cost_today_usd: number;
    cost_month_usd: number;
  };
  top_specialists: { slug: string; count: number }[];
  daily_summaries: any[];
  recent: any[];
};

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/stats");
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Failed to load");
        setStats(null);
      } else {
        setStats(data);
        setError("");
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // refresh every minute
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-50 p-6">
        <p className="text-zinc-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-zinc-50 p-6">
        <h1 className="text-xl font-bold mb-4">Admin</h1>
        <p className="text-red-600 mb-4">{error}</p>
        <Link href="/dashboard" className="text-violet-700 underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  if (!stats) return null;

  const s = stats.summary;

  return (
    <div className="min-h-screen bg-zinc-50">
      <header className="bg-white border-b border-zinc-200 p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Admin Dashboard</h1>
            <p className="text-xs text-zinc-500">Verdhana AI</p>
          </div>
          <button
            onClick={fetchStats}
            className="text-xs px-3 py-1.5 rounded-lg border border-zinc-300 hover:bg-zinc-50"
          >
            Refresh
          </button>
        </div>
      </header>

      <main className="p-4 max-w-3xl mx-auto space-y-6">
        {/* Top Summary Cards */}
        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase mb-2">
            Today
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Card label="Generations" value={s.gens_today} />
            <Card label="Polish used" value={s.polish_today} />
            <Card
              label="Avg quality"
              value={s.avg_quality_today ? `${s.avg_quality_today.toFixed(1)}/10` : "—"}
            />
            <Card
              label="Fallbacks"
              value={s.fallback_today}
              warning={s.fallback_today > 5}
            />
          </div>
        </section>

        <section>
          <h2 className="text-xs font-semibold text-zinc-500 uppercase mb-2">
            Totals
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <Card label="Total users" value={s.users_total} />
            <Card label="All-time gens" value={s.gens_alltime} />
            <Card label="This month" value={s.gens_month} />
            <Card label="Cost (month)" value={`$${s.cost_month_usd.toFixed(3)}`} />
          </div>
        </section>

        {/* Top Specialists */}
        <section className="bg-white rounded-2xl border border-zinc-200 p-4">
          <h2 className="font-semibold text-sm mb-3">Top specialists (7d)</h2>
          {stats.top_specialists.length === 0 ? (
            <p className="text-sm text-zinc-500">No data yet</p>
          ) : (
            <ul className="space-y-2">
              {stats.top_specialists.map((sp, i) => (
                <li
                  key={sp.slug}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-zinc-700">
                    <span className="text-zinc-400 mr-2">{i + 1}.</span>
                    {sp.slug}
                  </span>
                  <span className="font-medium">{sp.count}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Daily history */}
        <section className="bg-white rounded-2xl border border-zinc-200 p-4">
          <h2 className="font-semibold text-sm mb-3">Last 7 days</h2>
          {stats.daily_summaries.length === 0 ? (
            <p className="text-sm text-zinc-500">No daily summaries yet (cron runs at 8 AM WIB)</p>
          ) : (
            <div className="space-y-2">
              {stats.daily_summaries.map((d) => (
                <div
                  key={d.date}
                  className="flex items-center justify-between text-sm border-b border-zinc-100 last:border-0 pb-2 last:pb-0"
                >
                  <span className="text-zinc-700">{d.date}</span>
                  <span className="text-zinc-500">
                    {d.total_generations} gens · {d.total_polished} polish ·{" "}
                    {d.avg_quality_score ? `${d.avg_quality_score.toFixed(1)}/10` : "—"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recent activity */}
        <section className="bg-white rounded-2xl border border-zinc-200 p-4">
          <h2 className="font-semibold text-sm mb-3">Recent activity</h2>
          {stats.recent.length === 0 ? (
            <p className="text-sm text-zinc-500">No activity yet</p>
          ) : (
            <ul className="space-y-3">
              {stats.recent.map((r) => (
                <li key={r.id} className="text-sm border-b border-zinc-100 last:border-0 pb-2 last:pb-0">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-zinc-700">{r.product_slug}</span>
                    <span className="text-xs text-zinc-400">
                      {new Date(r.created_at).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                  <div className="text-xs text-zinc-500 mt-1 flex flex-wrap gap-2">
                    {r.was_polished && (
                      <span className="px-1.5 py-0.5 rounded bg-violet-100 text-violet-700">
                        polished {r.quality_score}/10
                      </span>
                    )}
                    {r.fallback_count > 0 && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-700">
                        fallback x{r.fallback_count}
                      </span>
                    )}
                    {r.actual_model && (
                      <span className="px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-600">
                        {r.actual_model.split("/")[1] || r.actual_model}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>

        <div className="text-center py-4">
          <Link
            href="/dashboard"
            className="text-sm text-violet-700 hover:underline"
          >
            ← Back to user dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}

function Card({
  label,
  value,
  warning,
}: {
  label: string;
  value: string | number;
  warning?: boolean;
}) {
  return (
    <div
      className={`bg-white rounded-xl border p-3 ${
        warning ? "border-amber-300 bg-amber-50" : "border-zinc-200"
      }`}
    >
      <p className="text-xs text-zinc-500 mb-1">{label}</p>
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}
