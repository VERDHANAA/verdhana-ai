"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { getProduct } from "@/lib/products";

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = getProduct(params.slug);
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!product) return notFound();

  const handleGenerate = async () => {
    setLoading(true);
    setError("");
    setResult("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, inputs }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data.result);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 max-w-5xl">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-4xl">{product.emoji}</span>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
          <p className="text-zinc-600 text-sm">{product.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input */}
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
                    onChange={(e) =>
                      setInputs({ ...inputs, [f.id]: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                ) : (
                  <input
                    type="text"
                    placeholder={f.placeholder}
                    value={inputs[f.id] || ""}
                    onChange={(e) =>
                      setInputs({ ...inputs, [f.id]: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500"
                  />
                )}
              </div>
            ))}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600 text-white font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Generating..." : "Generate"}
            </button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </div>

        {/* Output */}
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
