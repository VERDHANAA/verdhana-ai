"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${location.origin}/auth/callback` },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    setDone(true);
    setLoading(false);
  }

  if (done) {
    return (
      <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: "400px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "36px", textAlign: "center" }}>
          <div style={{ width: "48px", height: "48px", background: "rgba(74,222,128,0.12)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: "100px", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", fontSize: "20px" }}>✓</div>
          <h2 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "22px", color: "var(--t1)", marginBottom: "12px", letterSpacing: "-0.03em" }}>Check your email</h2>
          <p style={{ fontSize: "14px", color: "var(--t2)", lineHeight: 1.6 }}>We sent a confirmation link to <strong style={{ color: "var(--t1)" }}>{email}</strong>. Click it to activate your account.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>

      <Link href="/" style={{ textDecoration: "none", marginBottom: "48px", display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "20px", color: "var(--t1)", letterSpacing: "-0.03em" }}>Verdhana AI</span>
        <span style={{ width: "7px", height: "7px", borderRadius: "100px", background: "var(--primary)", animation: "pulseDot 2s ease-in-out infinite", display: "inline-block" }} />
      </Link>

      <div style={{ width: "100%", maxWidth: "400px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "14px", padding: "36px" }}>
        <div style={{ marginBottom: "28px" }}>
          <p className="mono-label" style={{ marginBottom: "12px" }}>GET STARTED</p>
          <h1 style={{ fontFamily: "var(--font-syne)", fontWeight: 800, fontSize: "26px", color: "var(--t1)", letterSpacing: "-0.03em", lineHeight: 1.2 }}>Create account</h1>
        </div>

        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "13px", fontWeight: 500, color: "var(--t2)" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="input-field" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <label style={{ fontSize: "13px", fontWeight: 500, color: "var(--t2)" }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min. 8 characters" required minLength={8} className="input-field" />
          </div>

          {error && (
            <div style={{ background: "rgba(238,111,111,0.1)", border: "1px solid rgba(238,111,111,0.3)", borderRadius: "10px", padding: "12px 16px", fontSize: "13px", color: "var(--accent)" }}>
              {error}
            </div>
          )}

          <button type="submit" disabled={loading} className="btn-primary" style={{ width: "100%", justifyContent: "center", marginTop: "8px" }}>
            {loading ? "Creating account…" : "Create account →"}
          </button>
        </form>

        <p style={{ marginTop: "24px", textAlign: "center", fontSize: "14px", color: "var(--t3)" }}>
          Already have an account?{" "}
          <Link href="/login" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
