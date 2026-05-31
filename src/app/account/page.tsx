"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();
  const [user, setUser] = useState<{ email?: string; id?: string } | null>(null);
  const [quota, setQuota] = useState<number|null>(null);
  const [polishLeft, setPolishLeft] = useState<number|null>(null);
  const [loading, setLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [passMsg, setPassMsg] = useState("");

  useEffect(()=>{ init(); },[]);

  async function init(){
    const {data:{user}}=await supabase.auth.getUser();
    if(!user){router.push("/login");return;}
    setUser(user);
    setLoading(false);
    try{
      const res=await fetch("/api/usage");
      const data=await res.json();
      setQuota(data.remaining??10);
      setPolishLeft(data.polishRemaining??1);
    }catch{setQuota(10);setPolishLeft(1);}
  }

  async function handleSignOut(){
    await supabase.auth.signOut();
    router.push("/");
  }

  async function handleChangePassword(e: React.FormEvent){
    e.preventDefault();
    if(newPass.length<6){setPassMsg("Min 6 characters");return;}
    const {error}=await supabase.auth.updateUser({password:newPass});
    if(error){setPassMsg(error.message);return;}
    setPassMsg("Password updated!");
    setNewPass("");
    setTimeout(()=>{setShowPassword(false);setPassMsg("");},2000);
  }

  if(loading)return(
    <div style={{background:"#F9F7F2",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{fontFamily:"Anton,sans-serif",fontSize:36,textTransform:"uppercase",opacity:0.3}}>Loading...</div>
    </div>
  );

  const usedQuota = 10 - (quota??0);
  const pct = Math.min((usedQuota/10)*100, 100);

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;600;800&family=Work+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .anton{font-family:'Anton',sans-serif}
        .mono{font-family:'JetBrains Mono',monospace;font-weight:600}
        .neo{border:4px solid #0D0D0D;box-shadow:8px 8px 0px 0px #0D0D0D}
        .neo-sm{border:4px solid #0D0D0D;box-shadow:6px 6px 0px 0px #0D0D0D}
        .press{transition:transform 0.1s,box-shadow 0.1s;cursor:pointer}
        .press:hover{transform:translate(4px,4px);box-shadow:4px 4px 0px 0px #0D0D0D!important}
        .press:active{transform:translate(8px,8px);box-shadow:none!important}
        .input-neo{border:4px solid #0D0D0D;padding:16px;font-family:'Work Sans',sans-serif;font-size:16px;background:#F9F7F2;outline:none;width:100%;transition:background 0.2s}
        .input-neo:focus{background:rgba(0,240,255,0.2)}
        .watermark{position:fixed;font-family:'Anton',sans-serif;font-size:20vw;color:#0D0D0D;opacity:0.03;z-index:-1;pointer-events:none;white-space:nowrap}
        .side-dock{display:flex}
        @media(max-width:768px){.side-dock{display:none!important}}
        @media(max-width:480px){.account-main{padding:16px!important}}
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" rel="stylesheet"/>

      <div style={{background:"#F9F7F2",minHeight:"100vh",color:"#0D0D0D",fontFamily:"Work Sans,sans-serif",paddingBottom:96,overflowX:"hidden"}}>

        <div className="watermark" style={{bottom:0,right:0}}>VERDHANA</div>

        {/* NAV */}
        <header style={{width:"100%",position:"sticky",top:0,zIndex:50,borderBottom:"4px solid #0D0D0D",background:"#F9F7F2",boxShadow:"0px 8px 0px 0px #0D0D0D"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 16px",height:64,maxWidth:1280,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontFamily:"Material Symbols Outlined",fontSize:32,color:"#5D26C1"}}>token</span>
              <h1 className="anton" style={{fontSize:24,letterSpacing:"-0.02em",textTransform:"uppercase"}}>VERDHANA AI</h1>
            </div>
            <Link href="/signup" className="mono press" style={{background:"#FFBF00",padding:"6px 24px",border:"4px solid #0D0D0D",fontSize:14,textTransform:"uppercase",letterSpacing:"0.05em",boxShadow:"8px 8px 0px 0px #0D0D0D",textDecoration:"none",color:"#0D0D0D",display:"inline-block"}}>
              UPGRADE
            </Link>
          </div>
        </header>

        <main className="account-main" style={{maxWidth:1280,margin:"0 auto",padding:"24px 16px",display:"flex",flexDirection:"column",gap:24}}>

          {/* User profile */}
          <section className="neo" style={{background:"#F9F7F2",padding:24}}>
            <p className="mono" style={{fontSize:12,textTransform:"uppercase",color:"rgba(13,13,13,0.6)",marginBottom:8,letterSpacing:"0.05em"}}>Logged in as</p>
            <h3 className="anton" style={{fontSize:28,textTransform:"uppercase",lineHeight:1,wordBreak:"break-all",marginBottom:20}}>{user?.email?.toUpperCase()}</h3>
            <button className="mono" style={{color:"#5D26C1",textDecoration:"underline",textUnderlineOffset:4,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em",background:"none",border:"none",cursor:"pointer",fontSize:14}}>
              UPDATE EMAIL
            </button>
          </section>

          {/* Today's usage title */}
          <h2 className="anton" style={{fontSize:28,textTransform:"uppercase"}}>Today's usage</h2>

          {/* Generations */}
          <div className="neo" style={{background:"#fff",padding:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
              <span style={{fontFamily:"Material Symbols Outlined",fontSize:36,color:"#0D0D0D"}}>auto_awesome</span>
              <span className="mono" style={{fontSize:12,background:"#00F0FF",border:"4px solid #0D0D0D",padding:"4px 8px",textTransform:"uppercase",fontWeight:700}}>DAILY_CAP</span>
            </div>
            <h4 className="mono" style={{fontSize:14,textTransform:"uppercase",marginBottom:8,letterSpacing:"0.05em"}}>Generations left</h4>
            <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:12}}>
              <span className="anton" style={{fontSize:56,lineHeight:1,color:"#0D0D0D"}}>{quota??10}</span>
              <span className="anton" style={{fontSize:36,color:"rgba(13,13,13,0.3)"}}>/10</span>
            </div>
            <div style={{width:"100%",height:16,background:"#e4e2dd",border:"4px solid #0D0D0D",overflow:"hidden",marginBottom:12}}>
              <div style={{height:"100%",background:"#5D26C1",borderRight:"4px solid #0D0D0D",width:`${pct}%`,transition:"width 0.5s"}}/>
            </div>
            <p className="mono" style={{fontSize:11,textTransform:"uppercase",color:"rgba(13,13,13,0.6)",letterSpacing:"0.08em"}}>Resets at midnight every day.</p>
          </div>

          {/* Polish */}
          <div className="neo" style={{background:"#fff",padding:24}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:20}}>
              <span style={{fontFamily:"Material Symbols Outlined",fontSize:36}}>brush</span>
              <span className="mono" style={{fontSize:12,background:"#FFBF00",border:"4px solid #0D0D0D",padding:"4px 8px",textTransform:"uppercase",fontWeight:700}}>DAILY</span>
            </div>
            <h4 className="mono" style={{fontSize:14,textTransform:"uppercase",marginBottom:8,letterSpacing:"0.05em"}}>Polishes left</h4>
            <div style={{display:"flex",alignItems:"baseline",gap:8,marginBottom:12}}>
              <span className="anton" style={{fontSize:56,lineHeight:1}}>{polishLeft??1}</span>
              <span className="anton" style={{fontSize:36,color:"rgba(13,13,13,0.3)"}}>/1</span>
            </div>
            <p style={{fontSize:16,lineHeight:"24px",color:"rgba(13,13,13,0.7)",fontStyle:"italic",marginTop:20,fontFamily:"Work Sans,sans-serif"}}>
              "10 generations and 1 polish a day. Free, forever."
            </p>
          </div>

          {/* Plan */}
          <div className="neo" style={{background:"#5D26C1",color:"#F9F7F2",padding:24,display:"flex",flexDirection:"column",gap:16}}>
            <div>
              <h4 className="mono" style={{fontSize:12,textTransform:"uppercase",opacity:0.7,letterSpacing:"0.12em",marginBottom:12}}>Your plan</h4>
              <h3 className="anton" style={{fontSize:40,textTransform:"uppercase",lineHeight:1,marginBottom:8}}>FREE PLAN</h3>
              <p style={{fontSize:16,lineHeight:"24px",color:"rgba(249,247,242,0.9)",fontFamily:"Work Sans,sans-serif"}}>
                10 generations and 1 polish a day. Free, forever.
              </p>
            </div>
            <button className="mono press" style={{width:"100%",background:"#F9F7F2",color:"#0D0D0D",border:"4px solid #0D0D0D",padding:"16px",fontSize:14,textTransform:"uppercase",letterSpacing:"0.08em",boxShadow:"8px 8px 0px 0px #0D0D0D",cursor:"not-allowed",opacity:0.7}} disabled>
              Upgrade to Pro — coming soon
            </button>
          </div>

          {/* Change password */}
          <div className="neo" style={{background:"#fff"}}>
            <button onClick={()=>setShowPassword(s=>!s)} style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:24,background:"transparent",border:"none",cursor:"pointer",textAlign:"left",transition:"background 0.15s"}}
              onMouseEnter={e=>(e.currentTarget.style.background="#f0eee9")}
              onMouseLeave={e=>(e.currentTarget.style.background="transparent")}>
              <span className="anton" style={{fontSize:28,textTransform:"uppercase",lineHeight:1}}>Change password</span>
              <span style={{fontFamily:"Material Symbols Outlined",fontSize:32,transform:showPassword?"rotate(180deg)":"rotate(0deg)",transition:"transform 0.3s"}}>expand_more</span>
            </button>
            {showPassword&&(
              <form onSubmit={handleChangePassword} style={{borderTop:"4px solid #0D0D0D",padding:24,display:"flex",flexDirection:"column",gap:20,background:"#fff"}}>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  <label className="mono" style={{fontSize:12,textTransform:"uppercase",fontWeight:700,letterSpacing:"0.05em"}}>New Password</label>
                  <input className="input-neo" type="password" placeholder="New password (min. 6 characters)" value={newPass} onChange={e=>setNewPass(e.target.value)} required/>
                </div>
                {passMsg&&(
                  <p className="mono" style={{fontSize:12,color:passMsg.includes("updated")?"#006970":"#ba1a1a",textTransform:"uppercase",letterSpacing:"0.05em"}}>{passMsg}</p>
                )}
                <button type="submit" className="mono press" style={{width:"100%",background:"#0D0D0D",color:"#F9F7F2",border:"4px solid #0D0D0D",padding:"16px",fontSize:14,textTransform:"uppercase",letterSpacing:"0.08em",boxShadow:"8px 8px 0px 0px #0D0D0D"}}>
                  Save new password
                </button>
              </form>
            )}
          </div>

          {/* Sign out */}
          <button onClick={handleSignOut} className="press" style={{width:"100%",background:"#ba1a1a",color:"white",border:"4px solid #0D0D0D",padding:"20px 24px",boxShadow:"8px 8px 0px 0px #0D0D0D",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <span className="anton" style={{fontSize:36,textTransform:"uppercase",lineHeight:1}}>Sign out</span>
            <span style={{fontFamily:"Material Symbols Outlined",fontSize:40}}>logout</span>
          </button>

          <footer style={{textAlign:"center",paddingTop:16,paddingBottom:40,opacity:0.4}}>
            <p className="mono" style={{fontSize:12,textTransform:"uppercase",letterSpacing:"0.05em"}}>Verdhana AI · Built for marketers who care.</p>
          </footer>

        </main>

        {/* Bottom nav mobile */}
        <nav style={{position:"fixed",bottom:0,left:0,width:"100%",display:"flex",justifyContent:"space-around",alignItems:"center",padding:"12px 16px",background:"#F9F7F2",borderTop:"4px solid #0D0D0D",boxShadow:"0px -8px 0px 0px #0D0D0D",zIndex:50}}>
          <Link href="/dashboard" style={{display:"flex",flexDirection:"column",alignItems:"center",color:"rgba(13,13,13,0.7)",textDecoration:"none",padding:"8px",width:"33%"}}>
            <span style={{fontFamily:"Material Symbols Outlined",fontSize:24}}>construction</span>
            <span className="mono" style={{fontSize:10,textTransform:"uppercase",marginTop:4,letterSpacing:"0.05em"}}>Tools</span>
          </Link>
          <Link href="/history" style={{display:"flex",flexDirection:"column",alignItems:"center",color:"rgba(13,13,13,0.7)",textDecoration:"none",padding:"8px",width:"33%"}}>
            <span style={{fontFamily:"Material Symbols Outlined",fontSize:24}}>history</span>
            <span className="mono" style={{fontSize:10,textTransform:"uppercase",marginTop:4,letterSpacing:"0.05em"}}>History</span>
          </Link>
          <Link href="/account" style={{display:"flex",flexDirection:"column",alignItems:"center",background:"#FFBF00",color:"#0D0D0D",border:"4px solid #0D0D0D",padding:"4px 16px",boxShadow:"6px 6px 0px 0px #0D0D0D",textDecoration:"none",width:"33%",justifyContent:"center",margin:"0 8px"}}>
            <span style={{fontFamily:"Material Symbols Outlined",fontSize:24}}>person</span>
            <span className="mono" style={{fontSize:10,textTransform:"uppercase",marginTop:4,letterSpacing:"0.05em"}}>Account</span>
          </Link>
        </nav>

        {/* Desktop side dock */}
        <div className="side-dock" style={{position:"fixed",top:"50%",right:32,transform:"translateY(-50%)",flexDirection:"column",gap:16,zIndex:40}}>
          {[
            {icon:"construction",href:"/dashboard",active:false},
            {icon:"history",href:"/history",active:false},
            {icon:"person",href:"/account",active:true},
          ].map((item,i)=>(
            <Link key={i} href={item.href} className="press" style={{background:item.active?"#FFBF00":"#F9F7F2",border:"4px solid #0D0D0D",padding:16,boxShadow:"8px 8px 0px 0px #0D0D0D",color:"#0D0D0D",textDecoration:"none",display:"grid",placeItems:"center"}}>
              <span style={{fontFamily:"Material Symbols Outlined",fontSize:24}}>{item.icon}</span>
            </Link>
          ))}
        </div>

      </div>
    </>
  );
}
