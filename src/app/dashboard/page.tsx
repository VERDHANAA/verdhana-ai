"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

const SPECIALISTS = [
  {slug:"facebook-ads",abbr:"FB",name:"Facebook Ads Writer",desc:"High-converting copy, 3 angle variations",icon:"campaign",bg:"#F9F7F2",rotate:0},
  {slug:"tiktok-scripts",abbr:"TT",name:"TikTok Ad Scripts",desc:"Scripts that hold attention past 3 seconds",icon:"smartphone",bg:"#F9F7F2",rotate:1},
  {slug:"google-ads",abbr:"GA",name:"Google Ads Headlines",desc:"15 headlines under 30 chars for CTR",icon:"search",bg:"#F9F7F2",rotate:-1},
  {slug:"instagram",abbr:"IG",name:"Instagram Captions",desc:"Captions that earn comments, not scrolls",icon:"photo_camera",bg:"#F9F7F2",rotate:0},
  {slug:"email-marketing",abbr:"EM",name:"Email Marketing",desc:"Reads like a human, not a brand template",icon:"mail",bg:"#F9F7F2",rotate:1},
  {slug:"youtube-titles",abbr:"YT",name:"YouTube Titles",desc:"Titles that earn clicks honestly",icon:"play_circle",bg:"#F9F7F2",rotate:-1},
  {slug:"product-desc",abbr:"PD",name:"Product Descriptions",desc:"Like a knowledgeable shop owner wrote it",icon:"inventory_2",bg:"#FFBF00",rotate:-1},
  {slug:"video-scripts",abbr:"VS",name:"Video Ad Scripts",desc:"30s, 60s, 90s for Meta & YouTube",icon:"videocam",bg:"#F9F7F2",rotate:2},
  {slug:"landing-pages",abbr:"LP",name:"Landing Page Copy",desc:"Full page from hero to FAQ",icon:"web",bg:"#F9F7F2",rotate:0},
  {slug:"push-notifs",abbr:"PN",name:"Push Notifications",desc:"Messages people don't immediately delete",icon:"notifications",bg:"#F9F7F2",rotate:-1},
  {slug:"sms-marketing",abbr:"SM",name:"SMS Marketing",desc:"Campaigns that don't feel like spam",icon:"sms",bg:"#F9F7F2",rotate:1},
  {slug:"linkedin-ads",abbr:"LI",name:"LinkedIn Ads",desc:"B2B copy that respects the reader's time",icon:"work",bg:"#F9F7F2",rotate:0},
];

export default function DashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [quota, setQuota] = useState<number|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    checkAuth();
    fetchQuota();
  },[]);

  async function checkAuth(){
    const {data:{user}}=await supabase.auth.getUser();
    if(!user){router.push("/login");return;}
    setLoading(false);
  }

  async function fetchQuota(){
    try{
      const res=await fetch("/api/usage");
      const data=await res.json();
      setQuota(data.remaining??10);
    }catch{setQuota(10);}
  }

  async function handleSignOut(){
    await supabase.auth.signOut();
    router.push("/");
  }

  if(loading)return(
    <div style={{background:"#fbf9f4",minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center"}}>
      <div style={{fontFamily:"Anton,sans-serif",fontSize:36,textTransform:"uppercase",opacity:0.3}}>Loading...</div>
    </div>
  );

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@600&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .anton{font-family:'Anton',sans-serif}
        .mono{font-family:'JetBrains Mono',monospace;font-weight:600}
        .watermark{font-family:'Anton',sans-serif;font-size:20vw;opacity:0.03;pointer-events:none;user-select:none}
        .spec-card{background:#F9F7F2;border:4px solid #0D0D0D;padding:20px;box-shadow:8px 8px 0px 0px #0D0D0D;text-decoration:none;color:#0D0D0D;display:flex;flex-direction:column;justify-content:space-between;transition:transform 0.1s,box-shadow 0.1s}
        .spec-card:hover{transform:translate(4px,4px);box-shadow:4px 4px 0px 0px #0D0D0D}
        .spec-card:active{transform:translate(8px,8px);box-shadow:none}
        .init-btn{width:100%;padding:10px;background:#F9F7F2;border:4px solid #0D0D0D;font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;cursor:pointer;transition:background 0.15s;box-shadow:4px 4px 0px 0px #0D0D0D}
        .init-btn:hover{background:#00F0FF}
        .init-btn:active{transform:translate(4px,4px);box-shadow:none}
        .float-shape{animation:float 6s ease-in-out infinite}
        @keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-20px) rotate(5deg)}}
        .press{transition:transform 0.1s,box-shadow 0.1s}
        .press:hover{transform:translate(4px,4px);box-shadow:4px 4px 0px 0px #0D0D0D!important}
        .press:active{transform:translate(8px,8px);box-shadow:none!important}
        @media(max-width:768px){
          .hide-mobile{display:none!important}
          .grid-4{grid-template-columns:repeat(2,1fr)!important}
          .grid-3{grid-template-columns:1fr!important}
          .hero-flex{flex-direction:column!important;align-items:flex-start!important}
        }
        @media(max-width:480px){
          .grid-4{grid-template-columns:1fr!important}
          .featured-card{grid-row:auto!important}
          .hero-flex{gap:16px!important}
          .dashboard-main{padding-left:12px!important;padding-right:12px!important}
          .counter-block{width:100%!important;transform:none!important;flex-shrink:1!important}
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" rel="stylesheet"/>

      <div style={{background:"#fbf9f4",minHeight:"100vh",color:"#0D0D0D",fontFamily:"Work Sans,sans-serif",position:"relative",overflow:"hidden"}}>

        {/* Floating background shapes */}
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0,overflow:"hidden"}}>
          <div className="float-shape" style={{position:"absolute",top:"25%",left:-80,width:256,height:256,background:"#00F0FF",border:"4px solid #0D0D0D",mixBlendMode:"multiply",opacity:0.2}}/>
          <div className="float-shape" style={{position:"absolute",top:"50%",right:40,width:192,height:192,background:"#FFBF00",border:"4px solid #0D0D0D",transform:"rotate(45deg)",mixBlendMode:"multiply",opacity:0.3,animationDelay:"-2s"}}/>
          <div className="float-shape" style={{position:"absolute",bottom:"25%",left:"33%",width:320,height:320,background:"#5D26C1",border:"4px solid #0D0D0D",mixBlendMode:"multiply",opacity:0.1,animationDelay:"-4s"}}/>
        </div>

        {/* Watermark */}
        <div style={{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden",zIndex:0,pointerEvents:"none"}}>
          <span className="watermark" style={{textTransform:"uppercase"}}>STRUCTURE</span>
        </div>

        {/* NAV */}
        <header style={{width:"100%",position:"sticky",top:0,zIndex:50,borderBottom:"4px solid #0D0D0D",background:"#F9F7F2",boxShadow:"8px 8px 0px 0px #0D0D0D"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 16px",height:80,maxWidth:1280,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <span style={{fontFamily:"Material Symbols Outlined",fontSize:32,color:"#5D26C1"}}>token</span>
              <h1 className="anton" style={{fontSize:24,letterSpacing:"-0.02em",textTransform:"uppercase"}}>VERDHANA AI</h1>
            </div>
            <nav className="hide-mobile" style={{display:"flex",gap:24}}>
              <Link href="/dashboard" className="mono" style={{fontSize:14,borderBottom:"4px solid #0D0D0D",textDecoration:"none",color:"#0D0D0D",textTransform:"uppercase",letterSpacing:"0.05em",paddingBottom:4}}>Your specialists</Link>
              <Link href="/history" className="mono" style={{fontSize:14,textDecoration:"none",color:"#4a4454",textTransform:"uppercase",letterSpacing:"0.05em",transition:"color 0.15s"}}>History</Link>
              <Link href="/account" className="mono" style={{fontSize:14,textDecoration:"none",color:"#4a4454",textTransform:"uppercase",letterSpacing:"0.05em",transition:"color 0.15s"}}>Account</Link>
            </nav>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div className="hide-mobile" style={{display:"flex",alignItems:"center",gap:8,border:"4px solid #0D0D0D",background:"#fff",padding:"6px 12px",boxShadow:"8px 8px 0px 0px #0D0D0D"}}>
                <span style={{fontFamily:"Material Symbols Outlined",fontSize:20,color:"#5D26C1"}}>data_usage</span>
                <span className="mono" style={{fontSize:12}}>{quota!==null?`${quota}/10`:"…"}</span>
              </div>
              <button className="mono hide-mobile press" onClick={handleSignOut} style={{fontSize:14,color:"#4a4454",textTransform:"uppercase",letterSpacing:"0.05em",background:"none",border:"none",cursor:"pointer",fontWeight:700}}>Sign out</button>
              <Link href="/signup" className="mono press" style={{background:"#FFBF00",padding:"8px 24px",border:"4px solid #0D0D0D",fontSize:14,textTransform:"uppercase",letterSpacing:"0.05em",textDecoration:"none",color:"#0D0D0D",fontWeight:700,boxShadow:"8px 8px 0px 0px #0D0D0D",display:"inline-block"}}>UPGRADE</Link>
            </div>
          </div>
        </header>

        <main className="dashboard-main" style={{position:"relative",zIndex:10,maxWidth:1280,margin:"0 auto",padding:"24px 16px 96px"}}>

          {/* Hero */}
          <div style={{marginBottom:60}}>
            <div className="hero-flex" style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:24,position:"relative",zIndex:10}}>
              <div style={{maxWidth:672}}>
                <h2 className="anton" style={{fontSize:"clamp(40px,5vw,72px)",textTransform:"uppercase",marginBottom:12,lineHeight:1,letterSpacing:"-0.02em"}}>Intelligence<br/>Constructed.</h2>
                <p style={{fontSize:18,lineHeight:"28px",fontWeight:500,color:"#4a4454",background:"rgba(249,247,242,0.8)",display:"inline-block"}}>
                  Deploy specialist AI modules for high-impact marketing. 12 tools trained for one task each.
                </p>
              </div>
              <div className="press counter-block" style={{background:"#FFBF00",border:"4px solid #0D0D0D",padding:20,boxShadow:"8px 8px 0px 0px #0D0D0D",transform:"rotate(-2deg)",flexShrink:0}}>
                <div className="anton" style={{fontSize:64,lineHeight:1}}>12</div>
                <div className="mono" style={{fontSize:14,textTransform:"uppercase",marginTop:4,letterSpacing:"0.05em",fontWeight:700}}>12 tools</div>
              </div>
            </div>
          </div>

          {/* Specialist Grid */}
          <div className="grid-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20,marginBottom:68,position:"relative",zIndex:10}}>

            {/* Card 1: Featured (tall) */}
            <Link href="/dashboard/facebook-ads" className="spec-card featured-card" style={{gridRow:"span 2",background:"#F9F7F2"}}>
              <div>
                <div style={{background:"#5D26C1",color:"#F9F7F2",display:"inline-block",padding:8,border:"4px solid #0D0D0D",marginBottom:20}}>
                  <span style={{fontFamily:"Material Symbols Outlined",fontSize:32}}>campaign</span>
                </div>
                <h3 className="anton" style={{fontSize:28,textTransform:"uppercase",marginBottom:8,lineHeight:1}}>Facebook Ads Writer</h3>
                <p style={{fontSize:16,lineHeight:"24px",color:"#4a4454",marginBottom:24}}>High-converting copy with 3 angle variations. Hook-first structure built for the feed.</p>
              </div>
              <div>
                <div style={{width:"100%",height:120,background:"#0D0D0D",border:"4px solid #0D0D0D",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span className="anton" style={{fontSize:48,color:"#FFBF00",letterSpacing:"-0.02em"}}>FB</span>
                </div>
                <button className="init-btn" onClick={e=>e.preventDefault()}>Initialize →</button>
              </div>
            </Link>

            {/* Cards 2-12 */}
            {SPECIALISTS.slice(1).map((sp,i)=>{
              const isAmber = sp.slug==="product-desc";
              return(
                <Link key={sp.slug} href={`/dashboard/${sp.slug}`} className="spec-card"
                  style={{background:isAmber?"#FFBF00":"#F9F7F2",transform:sp.rotate?`rotate(${sp.rotate}deg)`:"none"}}>
                  <div>
                    <span style={{fontFamily:"Material Symbols Outlined",fontSize:28,color:"#5D26C1",display:"block",marginBottom:12}}>{sp.icon}</span>
                    <h3 className="mono" style={{fontSize:14,textTransform:"uppercase",fontWeight:700,marginBottom:8,letterSpacing:"0.02em"}}>{sp.name}</h3>
                    <p style={{fontSize:14,lineHeight:"20px",color:"#4a4454",marginBottom:20}}>{sp.desc}</p>
                  </div>
                  <button className="init-btn" onClick={e=>e.preventDefault()}>Initialize</button>
                </Link>
              );
            })}

          </div>

          {/* Banner section */}
          <div style={{position:"relative",height:300,border:"4px solid #0D0D0D",background:"#F9F7F2",boxShadow:"8px 8px 0px 0px #0D0D0D",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:68,zIndex:10}}>
            <div style={{position:"absolute",inset:0,opacity:0.1,backgroundImage:"radial-gradient(#0D0D0D 2px, transparent 2px)",backgroundSize:"24px 24px"}}/>
            <div style={{position:"relative",zIndex:1,textAlign:"center",padding:"0 24px"}}>
              <h2 className="anton" style={{fontSize:"clamp(40px,6vw,96px)",lineHeight:1,textTransform:"uppercase"}}>Limitless<br/>Execution.</h2>
              <div style={{marginTop:32,display:"flex",justifyContent:"center",gap:16}}>
                {[{bg:"#FFBF00",rot:45,d:0},{bg:"#00F0FF",rot:-12,d:-1},{bg:"#5D26C1",rot:12,d:-3}].map((s,i)=>(
                  <div key={i} className="float-shape" style={{width:40,height:40,background:s.bg,border:"4px solid #0D0D0D",transform:`rotate(${s.rot}deg)`,animationDelay:`${s.d}s`}}/>
                ))}
              </div>
            </div>
            <div style={{position:"absolute",bottom:-40,left:-80,width:320,height:320,border:"4px solid #0D0D0D",background:"#F9F7F2",transform:"rotate(12deg)",opacity:0.5}}/>
            <div style={{position:"absolute",top:-80,right:-80,width:256,height:256,border:"4px solid #0D0D0D",background:"#FFBF00",transform:"rotate(-6deg)",opacity:0.3}}/>
          </div>

        </main>

        {/* Bottom nav mobile */}
        <nav style={{position:"fixed",bottom:0,left:0,width:"100%",display:"flex",justifyContent:"space-around",alignItems:"center",padding:"8px",background:"#F9F7F2",borderTop:"4px solid #0D0D0D",boxShadow:"0px -8px 0px 0px #0D0D0D",zIndex:50}}>
          <Link href="/dashboard" style={{display:"flex",flexDirection:"column",alignItems:"center",background:"#FFBF00",color:"#0D0D0D",border:"4px solid #0D0D0D",padding:"8px 24px",boxShadow:"6px 6px 0px 0px #0D0D0D",textDecoration:"none",fontFamily:"JetBrains Mono,monospace",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"}}>
            <span style={{fontFamily:"Material Symbols Outlined",fontSize:24,display:"block",marginBottom:4}}>construction</span>
            Your specialists
          </Link>
          <Link href="/history" style={{display:"flex",flexDirection:"column",alignItems:"center",color:"#4a4454",textDecoration:"none",padding:"8px 16px",fontFamily:"JetBrains Mono,monospace",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"}}>
            <span style={{fontFamily:"Material Symbols Outlined",fontSize:24,display:"block",marginBottom:4}}>history</span>
            History
          </Link>
          <Link href="/account" style={{display:"flex",flexDirection:"column",alignItems:"center",color:"#4a4454",textDecoration:"none",padding:"8px 16px",fontFamily:"JetBrains Mono,monospace",fontSize:12,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"}}>
            <span style={{fontFamily:"Material Symbols Outlined",fontSize:24,display:"block",marginBottom:4}}>person</span>
            Account
          </Link>
        </nav>

      </div>
    </>
  );
}
