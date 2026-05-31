"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/dashboard");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fbf9f4; font-family: 'Work Sans',sans-serif; }
        .anton { font-family: 'Anton',sans-serif; }
        .mono { font-family: 'JetBrains Mono',monospace; font-weight: 600; }
        .watermark { user-select:none; pointer-events:none; font-family:'Anton',sans-serif; font-size:clamp(60px,15vw,120px); opacity:0.03; white-space:nowrap; }
        .geo-block { border: 3px solid #0D0D0D; }
        .input-neo { width:100%; background:#fff; border:3px solid #0D0D0D; padding:16px; font-family:'Work Sans',sans-serif; font-size:18px; outline:none; transition:background 0.2s; }
        .input-neo:focus { background:#E0FCFF; }
        .btn-neo { width:100%; border:3px solid #0D0D0D; padding:16px; font-family:'JetBrains Mono',monospace; font-size:14px; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:8px; transition:transform 0.1s, box-shadow 0.1s; box-shadow:4px 4px 0px 0px #0D0D0D; }
        .btn-neo:hover { transform:translate(2px,2px); box-shadow:2px 2px 0px 0px #0D0D0D; }
        .btn-neo:active { transform:translate(4px,4px); box-shadow:none; }
        .card-neo { background:#F9F7F2; border:3px solid #0D0D0D; box-shadow:8px 8px 0px 0px #0D0D0D; position:relative; }
        .geo-cluster { position:absolute; top:-50px; right:-50px; display:grid; grid-template-columns:repeat(3,80px); grid-template-rows:repeat(3,80px); gap:8px; transform:rotate(-15deg); z-index:10; }
        @media(max-width:768px){ .geo-cluster{ display:none!important; } .deco-bottom{ display:none!important; } }
        @media(max-width:480px){ .card-neo{ padding:24px!important; } }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" rel="stylesheet"/>

      <div style={{background:"#fbf9f4",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",padding:"16px"}}>

        {/* Watermark */}
        <div style={{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",pointerEvents:"none",zIndex:0}}>
          <div className="watermark" style={{transform:"rotate(-15deg)"}}>VERDHANA VERDHANA VERDHANA</div>
        </div>

        {/* Geometric cluster top-right */}
        <div className="geo-cluster">
          {[
            {bg:"#FFBF00"},{bg:"#00F0FF",tx:16},{bg:"#5D26C1"},
            {bg:"#0D0D0D"},{bg:"#F9F7F2"},{bg:"#5D26C1",ty:16},
            {bg:"#FFBF00"},{bg:"#0D0D0D"},{bg:"#00F0FF"},
          ].map((b,i)=>(
            <div key={i} className="geo-block" style={{width:80,height:80,background:b.bg,transform:`translate(${b.tx||0}px,${b.ty||0}px)`,boxShadow:"4px 4px 0px 0px #0D0D0D"}}/>
          ))}
        </div>

        {/* Auth Card */}
        <div className="card-neo" style={{width:"100%",maxWidth:500,padding:48,zIndex:20}}>

          {/* Corner accents */}
          <div style={{position:"absolute",bottom:-8,left:-8,width:32,height:32,background:"#0D0D0D"}}/>
          <div style={{position:"absolute",top:-4,right:-4,width:48,height:16,background:"#FFBF00",borderLeft:"3px solid #0D0D0D",borderBottom:"3px solid #0D0D0D"}}/>

          {/* Logo */}
          <div style={{marginBottom:48}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:8}}>
              <span style={{fontFamily:"Material Symbols Outlined",fontSize:32,color:"#0D0D0D"}}>token</span>
              <h1 className="anton" style={{fontSize:36,lineHeight:"40px",color:"#0D0D0D",letterSpacing:"-0.02em",textTransform:"uppercase"}}>
                Good to have you back.
              </h1>
            </div>
            <p className="mono" style={{fontSize:14,color:"#4a4454",textTransform:"uppercase",letterSpacing:"0.05em"}}>
              Log in to your Verdhana AI account.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{background:"#ffdad6",border:"3px solid #ba1a1a",padding:"12px 16px",marginBottom:24,fontFamily:"JetBrains Mono,monospace",fontSize:12,color:"#93000a",textTransform:"uppercase",letterSpacing:"0.05em"}}>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} style={{display:"flex",flexDirection:"column",gap:24}}>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <label className="mono" style={{fontSize:14,textTransform:"uppercase",color:"#0D0D0D",letterSpacing:"0.05em"}}>
                Professional ID / Email
              </label>
              <input className="input-neo" type="email" placeholder="USER@VERDHANA.TECH"
                value={email} onChange={e=>setEmail(e.target.value)} required/>
            </div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              <label className="mono" style={{fontSize:14,textTransform:"uppercase",color:"#0D0D0D",letterSpacing:"0.05em"}}>
                Secure Access Token
              </label>
              <input className="input-neo" type="password" placeholder="••••••••"
                value={password} onChange={e=>setPassword(e.target.value)} required/>
            </div>
            <button type="submit" className="btn-neo" style={{background:"#FFBF00"}} disabled={loading}>
              <span>{loading ? "Logging in..." : "Log in"}</span>
              <span style={{fontFamily:"Material Symbols Outlined",fontSize:20}}>login</span>
            </button>
          </form>

          {/* Links */}
          <div style={{marginTop:32,display:"flex",flexDirection:"column",gap:16,textAlign:"center"}}>
            <Link href="/signup" className="mono" style={{fontSize:14,textTransform:"uppercase",color:"#0D0D0D",textDecoration:"underline",textDecorationThickness:2,textUnderlineOffset:4,letterSpacing:"0.05em"}}>
              New here? Start for free →
            </Link>
            <a href="#" className="mono" style={{fontSize:12,textTransform:"uppercase",color:"#4a4454",letterSpacing:"0.05em",textDecoration:"none"}}>
              Forgot it?
            </a>
          </div>

        </div>

        {/* Deco bottom-left */}
        <div className="deco-bottom" style={{position:"fixed",bottom:48,left:48,display:"flex",flexDirection:"column",gap:16}}>
          <div style={{width:128,height:4,background:"#0D0D0D"}}/>
          <p className="mono" style={{fontSize:10,color:"#0D0D0D",opacity:0.4,textTransform:"uppercase",letterSpacing:"0.3em",lineHeight:1.6}}>
            System: Stable<br/>Core: Verdhana-01
          </p>
        </div>

      </div>
    </>
  );
}
