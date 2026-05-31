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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #F9F7F2; font-family: 'Work Sans',sans-serif; }
        .anton { font-family: 'Anton',sans-serif; }
        .mono { font-family: 'JetBrains Mono',monospace; font-weight: 600; }
        .input-neo {
          width:100%; background:#fff; border:3px solid #0D0D0D;
          padding:12px 16px; font-family:'JetBrains Mono',monospace;
          font-size:14px; font-weight:600; color:#0D0D0D;
          outline:none; transition:border-color 0.2s; position:relative; z-index:1;
        }
        .input-neo:focus { border-color:#5D26C1; }
        .input-neo::placeholder { color:#cbc3d6; }
        .input-wrap { position:relative; }
        .input-shadow { position:absolute; inset:0; background:#0D0D0D; transform:translate(6px,6px); z-index:0; }
        .btn-neo {
          width:100%; border:3px solid #0D0D0D; padding:16px;
          font-family:'JetBrains Mono',monospace; font-size:14px; font-weight:800;
          text-transform:uppercase; letter-spacing:0.12em; cursor:pointer;
          display:flex; align-items:center; justify-content:center; gap:8px;
          position:relative; z-index:10; transition:transform 0.1s;
        }
        .btn-neo:active { transform:translate(3px,3px); }
        .btn-wrap { position:relative; }
        .btn-shadow { position:absolute; inset:0; background:#0D0D0D; transform:translate(6px,6px); transition:transform 0.1s; }
        .btn-wrap:active .btn-shadow { transform:translate(3px,3px); }
        @keyframes slideIn { from{transform:translateX(30px);opacity:0} to{transform:translateX(0);opacity:1} }
        .slide-in { animation: slideIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" rel="stylesheet"/>

      <div style={{background:"#F9F7F2",minHeight:"100vh",overflowX:"hidden",position:"relative",fontFamily:"Work Sans,sans-serif",color:"#0D0D0D"}}>

        {/* Background decoratives */}
        <div style={{position:"absolute",top:-20,right:-20,width:128,height:128,borderRadius:"50%",border:"3px solid #0D0D0D",opacity:0.8,pointerEvents:"none",zIndex:0}}/>
        <div style={{position:"absolute",bottom:40,left:40,fontFamily:"Anton,sans-serif",fontSize:200,lineHeight:1,opacity:0.05,color:"#0D0D0D",pointerEvents:"none",userSelect:"none",zIndex:0}}>02</div>

        <div style={{position:"relative",zIndex:10,display:"flex",flexDirection:"column",minHeight:"100vh",padding:24,maxWidth:448,margin:"0 auto"}}>

          {/* Header */}
          <header style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:48}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{width:32,height:32,background:"#5D26C1",border:"3px solid #0D0D0D",boxShadow:"3px 3px 0px 0px #0D0D0D",display:"grid",placeItems:"center"}}>
                <span style={{fontFamily:"Material Symbols Outlined",fontSize:16,color:"white"}}>token</span>
              </div>
              <div style={{display:"flex",flexDirection:"column"}}>
                <span className="anton" style={{fontSize:20,textTransform:"uppercase",letterSpacing:"0.05em",lineHeight:1}}>Verdhana AI</span>
                <span className="mono" style={{fontSize:10,textTransform:"uppercase",color:"#7b7485",letterSpacing:"0.05em"}}>Structural Intelligence</span>
              </div>
            </div>
            <Link href="/login" className="mono" style={{fontSize:12,textTransform:"uppercase",color:"#4a4454",textDecoration:"none",letterSpacing:"0.05em"}}>
              Log in →
            </Link>
          </header>

          {/* Form */}
          <main className="slide-in" style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"}}>

            {/* Title */}
            <div style={{marginBottom:32}}>
              <h1 className="anton" style={{fontSize:36,lineHeight:"40px",textTransform:"uppercase",letterSpacing:"-0.02em",marginBottom:8,position:"relative",display:"inline-block"}}>
                Start writing better copy today.
                <div style={{position:"absolute",bottom:-8,left:0,width:"100%",height:12,background:"#00F0FF",zIndex:-1,transform:"rotate(-1deg)"}}/>
              </h1>
              <p className="mono" style={{fontSize:14,textTransform:"uppercase",color:"#7b7485",letterSpacing:"0.05em",marginTop:12}}>
                Free forever. No credit card needed.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div style={{background:"#ffdad6",border:"3px solid #ba1a1a",padding:"12px 16px",marginBottom:24,fontFamily:"JetBrains Mono,monospace",fontSize:12,color:"#93000a",textTransform:"uppercase",letterSpacing:"0.05em"}}>
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} style={{display:"flex",flexDirection:"column",gap:24}}>

              {/* Email */}
              <div>
                <label className="mono" style={{display:"block",fontSize:14,textTransform:"uppercase",marginBottom:8,marginLeft:4,color:"#0D0D0D",letterSpacing:"0.05em"}}>
                  User Designation (Email)
                </label>
                <div className="input-wrap">
                  <div className="input-shadow"/>
                  <input className="input-neo" type="email" placeholder="user@domain.xyz"
                    value={email} onChange={e=>setEmail(e.target.value)} required/>
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="mono" style={{display:"block",fontSize:14,textTransform:"uppercase",marginBottom:8,marginLeft:4,color:"#0D0D0D",letterSpacing:"0.05em"}}>
                  Security Key (Password)
                </label>
                <div className="input-wrap">
                  <div className="input-shadow"/>
                  <input className="input-neo" type="password" placeholder="••••••••"
                    value={password} onChange={e=>setPassword(e.target.value)} required/>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mono" style={{display:"block",fontSize:14,textTransform:"uppercase",marginBottom:8,marginLeft:4,color:"#0D0D0D",letterSpacing:"0.05em"}}>
                  Verify Key
                </label>
                <div className="input-wrap">
                  <div className="input-shadow"/>
                  <input className="input-neo" type="password" placeholder="••••••••"
                    value={confirm} onChange={e=>setConfirm(e.target.value)} required/>
                </div>
              </div>

              {/* Submit */}
              <div style={{paddingTop:16}}>
                <div className="btn-wrap">
                  <div className="btn-shadow"/>
                  <button type="submit" className="btn-neo" style={{background:loading?"#f0eee9":"#FFBF00"}} disabled={loading}>
                    <span>{loading ? "Creating account..." : "Create my account"}</span>
                    <span style={{fontFamily:"Material Symbols Outlined",fontSize:20}}>arrow_forward</span>
                  </button>
                </div>
              </div>

            </form>

            {/* Divider */}
            <div style={{margin:"32px 0",display:"flex",alignItems:"center",gap:16}}>
              <div style={{flex:1,borderTop:"3px solid #0D0D0D"}}/>
              <span className="mono" style={{fontSize:14,background:"#F9F7F2",border:"3px solid #0D0D0D",padding:"4px 12px",textTransform:"uppercase",boxShadow:"2px 2px 0px 0px #0D0D0D",borderRadius:9999}}>OR</span>
              <div style={{flex:1,borderTop:"3px solid #0D0D0D"}}/>
            </div>

            {/* Login link */}
            <div style={{textAlign:"center",paddingBottom:32}}>
              <p className="mono" style={{fontSize:14,color:"#4a4454",textTransform:"uppercase",letterSpacing:"0.05em"}}>
                Already have an account?{" "}
                <Link href="/login" style={{color:"#5D26C1",fontWeight:700,borderBottom:"2px solid #5D26C1",textDecoration:"none",display:"inline-block",padding:"0 4px",marginLeft:4,transform:"rotate(-2deg)"}}>
                  Log in →
                </Link>
              </p>
            </div>

            <div style={{textAlign:"center",paddingBottom:48}}>
              <p className="mono" style={{fontSize:10,color:"#7b7485",textTransform:"uppercase",letterSpacing:"0.02em"}}>
                By signing up, you agree to our{" "}
                <a href="#" style={{textDecoration:"underline",color:"#7b7485"}}>Terms</a>{" "}and{" "}
                <a href="#" style={{textDecoration:"underline",color:"#7b7485"}}>Privacy Policy</a>.
              </p>
            </div>

          </main>
        </div>
      </div>
    </>
  );
}
