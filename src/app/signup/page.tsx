"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Logo = () => (
  <svg width="64" height="64" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF6B9D" />
        <stop offset="50%" stopColor="#7B9EFF" />
        <stop offset="100%" stopColor="#A78BFA" />
      </linearGradient>
    </defs>
    <ellipse cx="50" cy="28" rx="15" ry="22" fill="url(#lg2)" opacity="0.92" />
    <ellipse cx="72" cy="50" rx="15" ry="22" fill="url(#lg2)" opacity="0.92" transform="rotate(90 72 50)" />
    <ellipse cx="50" cy="72" rx="15" ry="22" fill="url(#lg2)" opacity="0.92" />
    <ellipse cx="28" cy="50" rx="15" ry="22" fill="url(#lg2)" opacity="0.92" transform="rotate(90 28 50)" />
    <circle cx="50" cy="50" r="14" fill="url(#lg2)" />
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </svg>
);

export default function SignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/dashboard");
  }

  async function handleGoogle() {
    setGoogleLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    background: "#F0FAF5",
    border: "1.5px solid #C8E6D8",
    borderRadius: 14,
    fontSize: 15,
    color: "#1A1A1A",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#B8E0D2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 24px 40px",
      fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
    }}>
      <div style={{ width: "100%", maxWidth: 420, position: "relative" }}>

        {/* Logo overlapping card */}
        <div style={{
          position: "absolute",
          top: -40,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          width: 80,
          height: 80,
          background: "#E8F5F0",
          borderRadius: 22,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 24px rgba(0,0,0,0.10)",
        }}>
          <Logo />
        </div>

        {/* Card */}
        <div style={{
          background: "#E8F5F0",
          borderRadius: 24,
          padding: "60px 36px 36px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.10)",
        }}>

          {/* Title */}
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <h1 style={{ fontSize: 26, fontWeight: 700, color: "#1A1A1A", marginBottom: 8 }}>
              Create your account
            </h1>
            <p style={{ fontSize: 14, color: "#888888" }}>
              Already have an account?{" "}
              <Link href="/login" style={{ color: "#4CAF8C", fontWeight: 600, textDecoration: "underline" }}>
                Log in
              </Link>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: "#ffe4e4", border: "1.5px solid #ffb3b3", borderRadius: 12,
              padding: "10px 14px", marginBottom: 20, fontSize: 13, color: "#c0392b", textAlign: "center",
            }}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignup} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "#4CAF8C")}
              onBlur={e => (e.currentTarget.style.borderColor = "#C8E6D8")}
            />
            <input
              type="password"
              placeholder="Password (min. 6 characters)"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              style={inputStyle}
              onFocus={e => (e.currentTarget.style.borderColor = "#4CAF8C")}
              onBlur={e => (e.currentTarget.style.borderColor = "#C8E6D8")}
            />

            <button
              type="submit"
              disabled={loading}
              style={{
                width: "100%",
                background: "#4CAF8C",
                color: "#ffffff",
                padding: "15px",
                borderRadius: 14,
                fontSize: 15,
                fontWeight: 700,
                border: "none",
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
                marginTop: 4,
                transition: "opacity 0.2s",
              }}
              onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = "0.9"; }}
              onMouseLeave={e => { e.currentTarget.style.opacity = loading ? "0.7" : "1"; }}
            >
              {loading ? "Creating account..." : "Continue"}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
            <div style={{ flex: 1, height: 1, background: "#C8E6D8" }} />
            <span style={{ fontSize: 13, color: "#AAAAAA", fontWeight: 500 }}>or</span>
            <div style={{ flex: 1, height: 1, background: "#C8E6D8" }} />
          </div>

          {/* Google SSO */}
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            style={{
              width: "100%",
              background: "#ffffff",
              border: "1.5px solid #C8E6D8",
              borderRadius: 14,
              padding: "13px 16px",
              fontSize: 15,
              fontWeight: 700,
              color: "#1A1A1A",
              cursor: googleLoading ? "not-allowed" : "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              opacity: googleLoading ? 0.7 : 1,
              transition: "background 0.2s",
            }}
            onMouseEnter={e => { if (!googleLoading) e.currentTarget.style.background = "#F0FAF5"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#ffffff"; }}
          >
            <GoogleIcon />
            {googleLoading ? "Redirecting..." : "Continue with Google"}
          </button>

          {/* Footer */}
          <p style={{ textAlign: "center", fontSize: 12, color: "#AAAAAA", marginTop: 24, lineHeight: 1.6 }}>
            By continuing, you agree to our{" "}
            <a href="#" style={{ color: "#AAAAAA", textDecoration: "underline" }}>Terms</a>
            {" "}and{" "}
            <a href="#" style={{ color: "#AAAAAA", textDecoration: "underline" }}>Privacy Policy</a>
          </p>

        </div>
      </div>
    </div>
  );
}
