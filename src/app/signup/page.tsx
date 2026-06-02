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
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("Passwords do not match"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/dashboard");
  }

  const inputStyle = {
    width: "100%", padding: "10px 12px", border: "1px solid #E8E6E1",
    borderRadius: 7, fontSize: 14, color: "#37352F", background: "#ffffff",
    outline: "none", transition: "border-color 0.15s",
  };

  return (
    <div style={{
      background: "#F9F6F0", minHeight: "100vh", display: "flex",
      alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div style={{
        width: "100%", maxWidth: 440, background: "#ffffff",
        border: "1px solid #E8E6E1", borderRadius: 8,
        padding: 40, boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
      }}>
        {/* Logo */}
        <div style={{ marginBottom: 32 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: "#37352F", marginBottom: 4 }}>
              Verdhana AI
            </div>
          </Link>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: "#37352F", marginBottom: 6 }}>
            Create your account
          </h1>
          <p style={{ fontSize: 14, color: "#787774" }}>
            Free forever. No credit card needed.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 7,
            padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#b91c1c",
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#37352F" }}>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
              onBlur={e => (e.currentTarget.style.borderColor = "#E8E6E1")}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#37352F" }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
              onBlur={e => (e.currentTarget.style.borderColor = "#E8E6E1")}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 500, color: "#37352F" }}>Confirm password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              required
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
              onBlur={e => (e.currentTarget.style.borderColor = "#E8E6E1")}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", background: "#1A1A1A", color: "#ffffff",
              padding: "11px 16px", borderRadius: 7, fontSize: 14, fontWeight: 600,
              border: "none", cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1, marginTop: 4,
            }}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        {/* Links */}
        <div style={{ marginTop: 24, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#787774" }}>
            Already have an account?{" "}
            <Link href="/login" style={{ color: "#37352F", fontWeight: 600, textDecoration: "underline" }}>
              Log in
            </Link>
          </p>
        </div>

        <div style={{ marginTop: 16, textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#787774" }}>
            By signing up, you agree to our{" "}
            <a href="#" style={{ textDecoration: "underline", color: "#787774" }}>Terms</a>{" "}and{" "}
            <a href="#" style={{ textDecoration: "underline", color: "#787774" }}>Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
