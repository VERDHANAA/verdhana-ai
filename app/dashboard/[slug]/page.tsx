"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { getProduct } from "@/lib/products";

const MODELS = [
  { id: "fast", name: "Fast", desc: "Quick & cheap. Best for drafts.", badge: "Free", locked: false },
  { id: "balanced", name: "Balanced", desc: "Better quality. Still fast.", badge: "Pro", locked: true },
  { id: "premium", name: "Premium", desc: "Most natural output.", badge: "Pro", locked: true },
  { id: "ultra", name: "Ultra", desc: "Highest quality. Slower.", badge: "Pro", locked: true },
];

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = getProduct(params.slug);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [model, setModel] = useState("fast");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [usage, setUsage] = useState<{ used: number; limit: number; remaining: number } | null>(null);

  useEffect(() => {
    fetch("/api/usage")
      .then((r) => r.json())
      .then((d) => {
        if (!d.error) setUsage(d);
      });
  }, [result]);

  if (!product) return notFound();

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, inputs, model }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data.result);
      if (typeof data.remaining === "number") {
        setUsage((prev) => prev ? { ...prev, used: prev.limit - data.remaining, remaining: data.remaining } : prev);
      }
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const limitReached = usage ? usage.remaining <= 0 : false;

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono px-2 py-1 rounded bg-zinc-100 border border-zinc-200">
            {product.emoji}
          </span>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            <p className="text-zinc-600 text-sm">{product.description}</p>
          </div>
        </div>
        {usage && (
          <div className={`px-3 py-2 rounded-lg text-sm font-medium border ${
            limitReached
              ? "bg-red-50 border-red-200 text-red-700"
              : usage.remaining <= 2
              ? "bg-amber-50 border-amber-200 text-amber-700"
              : "bg-emerald-50 border-emerald-200 text-emerald-700"
          }`}>
            {usage.remaining}/{usage.limit} left today
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-zinc-200 p-6">
          <h2 className="font-semibold mb-4">Input</h2>
          <div className="space-y-4">
            {product.fields.map((f) => (
              <div key={f.id}>
                <label className="block text-sm font-medium mb-1">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    rows={4}
                    placeholder={f.placeholder}
                    value={inputs[f.id] || ""}
                    onChange={(e) => setInputs({ ...inputs, [f.id]: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={inputs[f.id] || ""}
                    onChange={(e) => setInputs({ ...inputs, [f.id]: e.target.value })}
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                )}
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium mb-2">AI Model</label>
              <div className="grid grid-cols-2 gap-2">
                {MODELS.map((m) => {
                  const isSelected = model === m.id;
                  const isLocked = m.locked;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      disabled={isLocked}
                      onClick={() => !isLocked && setModel(m.id)}
                      className={`text-left p-3 rounded-lg border transition relative ${
                        isLocked
                          ? "border-zinc-200 bg-zinc-50 opacity-60 cursor-not-allowed"
                          : isSelected
                          ? "border-violet-500 bg-violet-50"
                          : "border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{m.name}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded ${
                          m.badge === "Pro"
                            ? "bg-zinc-900 text-white"
                            : "bg-emerald-100 text-emerald-700"
                        }`}>
                          {m.badge}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600">{m.desc}</p>
                      {isLocked && (
                        <p className="text-[10px] text-zinc-500 mt-1">Upgrade to unlock</p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || limitReached}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Generating..."
                : limitReached
                ? "Daily limit reached"
                : "Generate"}
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-zinc-200 p-6">
          <h2 className="font-semibold mb-4">Result</h2>
          {result ? (
            <pre className="whitespace-pre-wrap text-sm font-sans leading-relaxed">
              {result}
            </pre>
          ) : (
            <p className="text-sm text-zinc-500">
              Your generated content will appear here.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
