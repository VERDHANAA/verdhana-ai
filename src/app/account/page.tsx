"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<{ email?: string; id?: string } | null>(null);
  const [quota, setQuota] = useState<number | null>(null);
  const [polishLeft, setPolishLeft] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [passMsg, setPassMsg] = useState("");

  useEffect(() => { init(); }, []);

  async function init() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    setUser(user);
    setLoading(false);
    try {
      const res = await fetch("/api/usage");
      const data = await res.json();
      setQuota(data.remaining ?? 10);
      setPolishLeft(data.polishRemaining ?? 1);
    } catch { setQuota(10); setPolishLeft(1); }
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPass.length < 6) { setPassMsg("Min 6 characters"); return; }
    const { error } = await supabase.auth.updateUser({ password: newPass });
    if (error) { setPassMsg(error.message); return; }
    setPassMsg("Password updated!");
    setNewPass("");
    setTimeout(() => { setShowPassword(false); setPassMsg(""); }, 2000);
  }

  if (loading) return (
    <div style={{ background: "#F9F6F0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: 14, color: "#787774" }}>Loading...</div>
    </div>
  );

  const usedQuota = 10 - (quota ?? 0);
  const pct = Math.min((usedQuota / 10) * 100, 100);

  return (
    <div style={{ background: "#F9F6F0", minHeight: "100vh", color: "#37352F", paddingBottom: 96 }}>

      {/* NAV */}
      <header style={{
        width: "100%", position: "sticky", top: 0, zIndex: 50,
        background: "#ffffff", borderBottom: "1px solid #E8E6E1",
      }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "0 24px", height: 60, maxWidth: 1200, margin: "0 auto",
        }}>
          <Link href="/" style={{ textDecoration: "none", color: "#37352F", fontWeight: 700, fontSize: 16 }}>
            Verdhana AI
          </Link>
          <nav style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <Link href="/dashboard" style={{ fontSize: 14, color: "#787774", textDecoration: "none", fontWeight: 500 }}>Tools</Link>
            <Link href="/history" style={{ fontSize: 14, color: "#787774", textDecoration: "none", fontWeight: 500 }}>History</Link>
            <Link href="/account" style={{ fontSize: 14, color: "#37352F", textDecoration: "none", fontWeight: 600, borderBottom: "2px solid #37352F", paddingBottom: 2 }}>Account</Link>
          </nav>
          <Link href="/signup" style={{
            background: "#1A1A1A", color: "#ffffff", padding: "7px 18px", borderRadius: 7,
            fontSize: 13, fontWeight: 600, textDecoration: "none",
          }}>
            Upgrade
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 600, margin: "0 auto", padding: "40px 24px", display: "flex", flexDirection: "column", gap: 16 }}>

        {/* Profile card */}
        <div style={{ background: "#ffffff", border: "1px solid #E8E6E1", borderRadius: 8, padding: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#787774", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Logged in as
          </p>
          <p style={{ fontSize: 16, fontWeight: 600, color: "#37352F", wordBreak: "break-all", marginBottom: 16 }}>
            {user?.email}
          </p>
          <button style={{
            background: "none", border: "none", cursor: "pointer", fontSize: 13,
            color: "#787774", fontWeight: 500, textDecoration: "underline", padding: 0,
          }}>
            Update email
          </button>
        </div>

        {/* Usage */}
        <div style={{ background: "#ffffff", border: "1px solid #E8E6E1", borderRadius: 8, padding: 24 }}>
          <h2 style={{ fontSize: 15, fontWeight: 600, color: "#37352F", marginBottom: 20 }}>Today's usage</h2>

          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "#787774" }}>Generations</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#37352F" }}>{quota ?? 10}<span style={{ fontSize: 14, fontWeight: 400, color: "#787774" }}>/10</span></span>
            </div>
            <div style={{ width: "100%", height: 6, background: "#F9F6F0", borderRadius: 3, overflow: "hidden", border: "1px solid #E8E6E1" }}>
              <div style={{ height: "100%", background: "#37352F", width: `${pct}%`, borderRadius: 3, transition: "width 0.5s" }} />
            </div>
            <p style={{ fontSize: 11, color: "#787774", marginTop: 6 }}>Resets at midnight every day.</p>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 4 }}>
              <span style={{ fontSize: 13, color: "#787774" }}>Polishes</span>
              <span style={{ fontSize: 20, fontWeight: 700, color: "#37352F" }}>{polishLeft ?? 1}<span style={{ fontSize: 14, fontWeight: 400, color: "#787774" }}>/1</span></span>
            </div>
          </div>
        </div>

        {/* Plan */}
        <div style={{ background: "#ffffff", border: "1px solid #E8E6E1", borderRadius: 8, padding: 24 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: "#787774", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
            Current plan
          </p>
          <p style={{ fontSize: 18, fontWeight: 700, color: "#37352F", marginBottom: 6 }}>Free plan</p>
          <p style={{ fontSize: 14, color: "#787774", marginBottom: 20, lineHeight: 1.5 }}>
            10 generations and 1 polish a day. Free, forever.
          </p>
          <button
            disabled
            style={{
              width: "100%", background: "#F9F6F0", color: "#787774",
              border: "1px solid #E8E6E1", borderRadius: 7,
              padding: "10px 16px", fontSize: 13, fontWeight: 500, cursor: "not-allowed",
            }}
          >
            Upgrade to Pro — coming soon
          </button>
        </div>

        {/* Change password */}
        <div style={{ background: "#ffffff", border: "1px solid #E8E6E1", borderRadius: 8, overflow: "hidden" }}>
          <button
            onClick={() => setShowPassword(s => !s)}
            style={{
              width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "18px 24px", background: "transparent", border: "none", cursor: "pointer", textAlign: "left",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#F9F6F0")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <span style={{ fontSize: 15, fontWeight: 600, color: "#37352F" }}>Change password</span>
            <span style={{
              fontSize: 18, color: "#787774",
              transform: showPassword ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}>›</span>
          </button>
          {showPassword && (
            <form
              onSubmit={handleChangePassword}
              style={{ borderTop: "1px solid #E8E6E1", padding: 24, display: "flex", flexDirection: "column", gap: 14 }}
            >
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: "#37352F" }}>New password</label>
                <input
                  type="password"
                  placeholder="Minimum 6 characters"
                  value={newPass}
                  onChange={e => setNewPass(e.target.value)}
                  required
                  style={{
                    width: "100%", padding: "10px 12px", border: "1px solid #E8E6E1",
                    borderRadius: 7, fontSize: 14, color: "#37352F", background: "#ffffff",
                    outline: "none",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "#1A1A1A")}
                  onBlur={e => (e.currentTarget.style.borderColor = "#E8E6E1")}
                />
              </div>
              {passMsg && (
                <p style={{ fontSize: 13, color: passMsg.includes("updated") ? "#006970" : "#b91c1c" }}>{passMsg}</p>
              )}
              <button
                type="submit"
                style={{
                  width: "100%", background: "#1A1A1A", color: "#ffffff",
                  border: "none", borderRadius: 7, padding: "10px 16px",
                  fontSize: 13, fontWeight: 600, cursor: "pointer",
                }}
              >
                Save new password
              </button>
            </form>
          )}
        </div>

        {/* Sign out */}
        <button
          onClick={handleSignOut}
          style={{
            width: "100%", background: "#ffffff", color: "#b91c1c",
            border: "1px solid #fecaca", borderRadius: 8,
            padding: "14px 24px", fontSize: 14, fontWeight: 600, cursor: "pointer",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#fef2f2")}
          onMouseLeave={e => (e.currentTarget.style.background = "#ffffff")}
        >
          Sign out
        </button>

        <footer style={{ textAlign: "center", paddingTop: 8, opacity: 0.5 }}>
          <p style={{ fontSize: 12, color: "#787774" }}>Verdhana AI · Built for marketers who care.</p>
        </footer>

      </main>

      {/* Bottom nav mobile */}
      <nav style={{
        position: "fixed", bottom: 0, left: 0, width: "100%",
        display: "flex", justifyContent: "space-around", alignItems: "center",
        padding: "10px 16px", background: "#ffffff", borderTop: "1px solid #E8E6E1", zIndex: 50,
      }}>
        <Link href="/dashboard" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#787774", textDecoration: "none", padding: "6px 12px", fontSize: 11, fontWeight: 500 }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>🛠</span>
          Tools
        </Link>
        <Link href="/history" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#787774", textDecoration: "none", padding: "6px 12px", fontSize: 11, fontWeight: 500 }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>📋</span>
          History
        </Link>
        <Link href="/account" style={{ display: "flex", flexDirection: "column", alignItems: "center", color: "#37352F", textDecoration: "none", padding: "6px 12px", fontSize: 11, fontWeight: 600 }}>
          <span style={{ fontSize: 20, marginBottom: 2 }}>👤</span>
          Account
        </Link>
      </nav>

    </div>
  );
}
