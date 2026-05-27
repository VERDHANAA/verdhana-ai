"use client";

import { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { getProduct } from "@/lib/products";

const MODELS = [
  { id: "fast",     name: "FAST",     speed: "~3 SEC",  badge: null,  locked: false },
  { id: "balanced", name: "BALANCED", speed: "~8 SEC",  badge: "PRO", locked: true  },
  { id: "premium",  name: "PREMIUM",  speed: "~15 SEC", badge: "PRO", locked: true  },
  { id: "ultra",    name: "ULTRA",    speed: "~30 SEC", badge: "PRO", locked: true  },
];

type Usage = {
  used: number; limit: number; remaining: number;
  polishUsed: number; polishLimit: number; polishRemaining: number;
};

export default function ProductPage() {
  const params = useParams<{ slug: string }>();
  const product = getProduct(params.slug);
  const [inputs, setInputs]         = useState<Record<string, string>>({});
  const [model, setModel]           = useState("fast");
  const [polish, setPolish]         = useState(false);
  const [result, setResult]         = useState("");
  const [score, setScore]           = useState<number | null>(null);
  const [edited, setEdited]         = useState(false);
  const [loading, setLoading]       = useState(false);
  const [error, setError]           = useState("");
  const [usage, setUsage]           = useState<Usage | null>(null);
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent]   = useState(false);
  const [copied, setCopied]         = useState(false);

  const refreshUsage = () => {
    fetch("/api/usage")
      .then(r => r.json())
      .then(d => { if (!d.error) setUsage(d); });
  };

  useEffect(() => { refreshUsage(); }, []);

  if (!product) return notFound();

  const limitReached    = usage ? usage.remaining <= 0 : false;
  const polishAvailable = usage ? usage.polishRemaining > 0 : false;

  const handleGenerate = async () => {
    setLoading(true); setError(""); setResult(""); setScore(null);
    setEdited(false); setEmailSent(false);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, inputs, model, polish }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setResult(data.result);
      if (typeof data.score === "number") setScore(data.score);
      setEdited(!!data.edited);
      refreshUsage();
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const handleEmail = async () => {
    if (!result) return;
    setEmailSending(true);
    try {
      const res = await fetch("/api/email/send-result", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: product.slug, result }),
      });
      const data = await res.json();
      if (res.ok) setEmailSent(true);
      else setError(data.error || "Email failed");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setEmailSending(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(result).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div style={{ padding: "24px 32px", maxWidth: 900 }}>

      {/* ── TITLE BLOCK ── */}
      <div className="form-title-blk" style={{ marginBottom: 16 }}>
        <div className="form-spec-tag">{product.emoji} — SPECIALIST MODE</div>
        <div className="form-main-ttl">{product.name.toUpperCase()}</div>
      </div>

      {/* ── QUOTA + INFO ROW ── */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {usage && (
          <div className="mono-badge" style={{
            background: limitReached ? "var(--ora)" : usage.remaining <= 2 ? "#FFB300" : "var(--teal)",
          }}>
            {usage.remaining}/{usage.limit} LEFT TODAY
          </div>
        )}
        <div style={{
          fontFamily: "'Space Mono', monospace",
          fontSize: 10,
          color: "var(--con)",
          textTransform: "uppercase",
          letterSpacing: 1,
        }}>
          MODEL: {model.toUpperCase()}
        </div>
        <div style={{
          fontFamily: "'Lexend', sans-serif",
          fontSize: 12,
          color: "var(--con)",
          marginLeft: "auto",
        }}>
          {product.description}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>

        {/* ── LEFT: INPUT ── */}
        <div style={{
          background: "var(--wht)",
          border: "var(--b3)",
          boxShadow: "var(--sh)",
          padding: "20px",
        }}>
          <div style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 9,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "var(--con)",
            marginBottom: 16,
            paddingBottom: 10,
            borderBottom: "2px solid var(--bg)",
          }}>INPUT ///</div>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {product.fields.map(f => (
              <div key={f.id}>
                <label className="field-label" style={{ display: "block", marginBottom: 5 }}>
                  {f.label}
                </label>
                {f.type === "textarea" ? (
                  <textarea
                    className="brutal-textarea"
                    rows={4}
                    placeholder={f.placeholder}
                    value={inputs[f.id] || ""}
                    onChange={e => setInputs({ ...inputs, [f.id]: e.target.value })}
                  />
                ) : (
                  <input
                    type="text"
                    className="brutal-input"
                    placeholder={f.placeholder}
                    value={inputs[f.id] || ""}
                    onChange={e => setInputs({ ...inputs, [f.id]: e.target.value })}
                  />
                )}
              </div>
            ))}

            {/* AI Model Grid */}
            <div>
              <div className="field-label" style={{ marginBottom: 8 }}>AI MODEL</div>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                border: "var(--b3)",
                boxShadow: "var(--sh-sm)",
              }}>
                {MODELS.map((m, i) => (
                  <div
                    key={m.id}
                    className={`model-card${model === m.id ? " active" : ""}`}
                    onClick={() => !m.locked && setModel(m.id)}
                    style={{
                      borderRight:  i % 2 === 0 ? "2px solid var(--ink)" : "none",
                      borderBottom: i < 2       ? "2px solid var(--ink)" : "none",
                      opacity: m.locked ? .55 : 1,
                      cursor: m.locked ? "not-allowed" : "pointer",
                    }}
                  >
                    <div className="mc-name">{m.name}</div>
                    <div className="mc-speed">{m.speed}</div>
                    {m.badge && model !== m.id && (
                      <div className="model-flag pro">{m.badge}</div>
                    )}
                    {model === m.id && (
                      <div className="model-flag on">ON</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Polish toggle */}
            <div style={{
              padding: 12,
              border: polish ? "var(--b3)" : "2px solid var(--con)",
              background: polish ? "var(--bg)" : "var(--wht)",
              boxShadow: polish ? "var(--sh-xs)" : "none",
            }}>
              <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                <input
                  type="checkbox"
                  checked={polish}
                  onChange={e => setPolish(e.target.checked)}
                  disabled={!polishAvailable && !polish}
                  style={{ marginTop: 2, accentColor: "var(--ora)" }}
                />
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <span style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 12,
                      fontWeight: 700,
                      textTransform: "uppercase",
                    }}>AI POLISH</span>
                    <span style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 8,
                      fontWeight: 700,
                      background: "var(--teal)",
                      color: "var(--ink)",
                      padding: "2px 6px",
                      border: "1px solid var(--ink)",
                      textTransform: "uppercase",
                    }}>PRO</span>
                  </div>
                  <div style={{ fontFamily: "'Lexend', sans-serif", fontSize: 11, color: "var(--con)" }}>
                    Reviewer scores copy, Editor refines if below 8/10.
                  </div>
                  {usage && (
                    <div style={{
                      fontFamily: "'Space Mono', monospace",
                      fontSize: 9,
                      color: "var(--con)",
                      marginTop: 4,
                    }}>
                      {polishAvailable
                        ? `${usage.polishRemaining}/${usage.polishLimit} free polish today`
                        : "Free polish used. Upgrade for unlimited."}
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* Generate button */}
            <button
              className="brutal-btn"
              onClick={handleGenerate}
              disabled={loading || limitReached}
              style={{ padding: "16px 20px", fontSize: 15, letterSpacing: 2, width: "100%" }}
            >
              {loading ? "GENERATING..." : limitReached ? "LIMIT REACHED" : "GENERATE COPY ⚡"}
            </button>

            {error && (
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 11,
                color: "var(--ora)",
                padding: "8px 12px",
                border: "2px solid var(--ora)",
                background: "#FFF5F2",
              }}>{error}</div>
            )}
          </div>
        </div>

        {/* ── RIGHT: OUTPUT ── */}
        <div style={{
          background: "var(--wht)",
          border: "var(--b3)",
          boxShadow: "var(--sh)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 16,
            paddingBottom: 10,
            borderBottom: "2px solid var(--bg)",
          }}>
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 9,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 3,
              color: "var(--con)",
            }}>OUTPUT ///</div>
            {score !== null && (
              <div style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: 10,
                fontWeight: 700,
                background: score >= 8 ? "var(--teal)" : "#FFB300",
                color: "var(--ink)",
                padding: "3px 10px",
                border: "var(--b2)",
                boxShadow: "var(--sh-xs)",
                textTransform: "uppercase",
              }}>
                QUALITY: {score}/10{edited && " (POLISHED)"}
              </div>
            )}
          </div>

          {result ? (
            <>
              <pre style={{
                fontFamily: "'Lexend', sans-serif",
                fontSize: 13,
                lineHeight: 1.78,
                color: "var(--ink)",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                flex: 1,
                margin: 0,
              }}>
                {result}
              </pre>
              <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                <button
                  onClick={handleCopy}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    background: copied ? "var(--teal)" : "var(--bg)",
                    color: "var(--ink)",
                    border: "var(--b2)",
                    boxShadow: "var(--sh-xs)",
                    padding: "8px 16px",
                    cursor: "pointer",
                  }}
                >
                  {copied ? "[ COPIED ✓ ]" : "[ COPY TEXT ]"}
                </button>
                <button
                  onClick={handleEmail}
                  disabled={emailSending || emailSent}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    background: emailSent ? "var(--teal)" : "var(--wht)",
                    color: "var(--ink)",
                    border: "var(--b2)",
                    boxShadow: "var(--sh-xs)",
                    padding: "8px 16px",
                    cursor: emailSending || emailSent ? "not-allowed" : "pointer",
                    opacity: emailSending ? .6 : 1,
                  }}
                >
                  {emailSending ? "SENDING..." : emailSent ? "[ SENT ✓ ]" : "[ EMAIL ME ]"}
                </button>
              </div>
            </>
          ) : (
            <div style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              color: "var(--con)",
            }}>
              <div style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 48,
                fontWeight: 800,
                WebkitTextStroke: "3px var(--con)",
                color: "transparent",
                lineHeight: 1,
              }}>⚡</div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 10,
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: 3,
              }}>OUTPUT WILL APPEAR HERE</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
