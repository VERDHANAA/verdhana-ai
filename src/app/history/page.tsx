"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Generation = {
  id: string;
  product_slug: string;
  result: string;
  quality_score: number | null;
  was_polished: boolean;
  created_at: string;
};

const SLUG_LABELS: Record<string,string> = {
  "facebook-ads":"Facebook Ads","tiktok-scripts":"TikTok Scripts",
  "google-ads":"Google Ads","instagram":"Instagram","email-marketing":"Email",
  "youtube-titles":"YouTube","product-desc":"Product Desc","video-scripts":"Video Scripts",
  "landing-pages":"Landing Page","push-notifs":"Push Notifs",
  "sms-marketing":"SMS","linkedin-ads":"LinkedIn Ads",
};

export default function HistoryPage() {
  const router = useRouter();
  const supabase = createClient();
  const [gens, setGens] = useState<Generation[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Generation|null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(()=>{ fetchHistory(); },[]);

  async function fetchHistory(){
    const {data:{user}}=await supabase.auth.getUser();
    if(!user){router.push("/login");return;}
    const {data}=await supabase
      .from("generations")
      .select("id,product_slug,result,quality_score,was_polished,created_at")
      .eq("user_id",user.id)
      .order("created_at",{ascending:false})
      .limit(50);
    setGens(data||[]);
    setLoading(false);
  }

  async function handleCopy(text:string){
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(()=>setCopied(false),2000);
  }

  return(
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@400;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .anton{font-family:'Anton',sans-serif}
        .mono{font-family:'JetBrains Mono',monospace;font-weight:600}
        .watermark{font-family:'Anton',sans-serif;font-size:20vw;opacity:0.03;pointer-events:none;user-select:none}
        .hist-card{background:#F9F7F2;border:4px solid #0D0D0D;padding:20px;box-shadow:8px 8px 0px 0px #0D0D0D;cursor:pointer;transition:transform 0.1s,box-shadow 0.1s}
        .hist-card:hover{transform:translate(4px,4px);box-shadow:4px 4px 0px 0px #0D0D0D}
        .hist-card:active{transform:translate(8px,8px);box-shadow:none}
        .act-btn{border:4px solid #0D0D0D;padding:10px 20px;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;cursor:pointer;display:flex;align-items:center;gap:8px;transition:transform 0.1s,box-shadow 0.1s;background:#fff;box-shadow:4px 4px 0px 0px #0D0D0D}
        .act-btn:hover{transform:translate(2px,2px);box-shadow:2px 2px 0px 0px #0D0D0D}
        .act-btn:active{transform:translate(4px,4px);box-shadow:none}
        .press{transition:transform 0.1s,box-shadow 0.1s}
        .press:hover{transform:translate(4px,4px);box-shadow:4px 4px 0px 0px #0D0D0D!important}
        .press:active{transform:translate(8px,8px);box-shadow:none!important}
        @keyframes fadeIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        .fade-in{animation:fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) forwards}
        @media(max-width:768px){.hide-mobile{display:none!important}.hist-grid{grid-template-columns:1fr!important}.hist-nav-inner{padding-left:16px!important;padding-right:16px!important}}
        @media(max-width:480px){.hist-card{padding:14px!important}.history-main{padding-left:12px!important;padding-right:12px!important}.hist-head{flex-direction:column!important;align-items:flex-start!important}}
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" rel="stylesheet"/>

      <div style={{background:"#fbf9f4",minHeight:"100vh",color:"#0D0D0D",fontFamily:"Work Sans,sans-serif",overflowX:"hidden"}}>

        {/* Watermark */}
        <div style={{position:"fixed",inset:0,display:"flex",alignItems:"center",justifyContent:"center",zIndex:-1,overflow:"hidden",pointerEvents:"none"}}>
          <span className="watermark">HISTORY</span>
        </div>

        {/* NAV */}
        <header style={{background:"#F9F7F2",width:"100%",position:"sticky",top:0,zIndex:50,borderBottom:"4px solid #0D0D0D",boxShadow:"8px 8px 0px 0px #0D0D0D"}}>
          <div className="hist-nav-inner" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 24px",height:80,maxWidth:1280,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <span style={{fontFamily:"Material Symbols Outlined",fontSize:32,color:"#5D26C1"}}>token</span>
              <h1 className="anton" style={{fontSize:28,letterSpacing:"-0.02em",textTransform:"uppercase"}}>VERDHANA AI</h1>
            </div>
            <nav className="hide-mobile" style={{display:"flex",alignItems:"center",gap:32}}>
              <Link href="/dashboard" className="mono" style={{fontSize:14,color:"#4a4454",textDecoration:"none",textTransform:"uppercase",letterSpacing:"0.05em"}}>TOOLS</Link>
              <Link href="/history" className="mono" style={{fontSize:14,color:"#0D0D0D",textDecoration:"none",textTransform:"uppercase",letterSpacing:"0.05em",borderBottom:"4px solid #0D0D0D",paddingBottom:4}}>HISTORY</Link>
              <Link href="/account" className="mono" style={{fontSize:14,color:"#4a4454",textDecoration:"none",textTransform:"uppercase",letterSpacing:"0.05em"}}>ACCOUNT</Link>
            </nav>
            <Link href="/signup" className="mono press" style={{background:"#FFBF00",color:"#0D0D0D",padding:"8px 24px",border:"4px solid #0D0D0D",fontSize:14,textTransform:"uppercase",letterSpacing:"0.05em",textDecoration:"none",boxShadow:"8px 8px 0px 0px #0D0D0D",display:"inline-block"}}>UPGRADE</Link>
          </div>
        </header>

        <main className="history-main" style={{maxWidth:1280,margin:"0 auto",padding:"40px 24px 112px"}}>

          {/* Header */}
          <div style={{marginBottom:40,display:"flex",flexDirection:"column",gap:20}}>
            <div style={{display:"flex",flexDirection:"column",gap:12}}>
              <span className="mono" style={{display:"inline-block",background:"#00F0FF",color:"#0D0D0D",padding:"4px 12px",border:"4px solid #0D0D0D",fontSize:12,textTransform:"uppercase",letterSpacing:"0.05em",width:"fit-content"}}>LOG_ARCHIVE</span>
              <Link href="/dashboard" style={{display:"flex",alignItems:"center",gap:8,fontFamily:"JetBrains Mono,monospace",fontSize:14,fontWeight:600,color:"#0D0D0D",textDecoration:"none",textTransform:"uppercase",letterSpacing:"0.05em"}}>
                <span style={{fontFamily:"Material Symbols Outlined",fontSize:18}}>arrow_back</span> Back
              </Link>
              <h2 className="anton" style={{fontSize:"clamp(36px,6vw,72px)",textTransform:"uppercase",lineHeight:1,letterSpacing:"-0.02em"}}>Your history</h2>
            </div>
            <div style={{display:"flex",gap:16,flexWrap:"wrap"}}>
              <div style={{background:"#F9F7F2",border:"4px solid #0D0D0D",padding:12,boxShadow:"8px 8px 0px 0px #0D0D0D",display:"flex",alignItems:"center",gap:12}}>
                <span style={{fontFamily:"Material Symbols Outlined",fontSize:24,color:"#5D26C1"}}>query_stats</span>
                <div>
                  <p className="mono" style={{fontSize:10,textTransform:"uppercase",opacity:0.6,letterSpacing:"0.05em"}}>Total Generations</p>
                  <p className="mono" style={{fontSize:24,fontWeight:700}}>{gens.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Loading */}
          {loading&&(
            <div style={{display:"flex",justifyContent:"center",padding:"80px 0"}}>
              <div style={{display:"flex",gap:16}}>
                {["#0D0D0D","#FFBF00","#00F0FF"].map((c,i)=>(
                  <div key={i} style={{width:24,height:24,background:c,border:"4px solid #0D0D0D",animation:`bounce 0.8s ${i*0.15}s infinite`}}/>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {!loading&&gens.length===0&&(
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",textAlign:"center",padding:"80px 0"}}>
              <div style={{width:96,height:96,background:"#e4e2dd",border:"4px solid #0D0D0D",display:"flex",alignItems:"center",justifyContent:"center",marginBottom:32,boxShadow:"8px 8px 0px 0px #0D0D0D"}}>
                <span style={{fontFamily:"Material Symbols Outlined",fontSize:48}}>history_toggle_off</span>
              </div>
              <h3 className="anton" style={{fontSize:36,textTransform:"uppercase",marginBottom:16}}>Nothing here yet.</h3>
              <p style={{fontSize:18,lineHeight:"28px",fontWeight:500,opacity:0.7,maxWidth:400,marginBottom:40}}>Your generated copy will show up here. Go write something.</p>
              <Link href="/dashboard" className="mono press" style={{background:"#5D26C1",color:"white",padding:"16px 40px",border:"4px solid #0D0D0D",fontSize:18,textTransform:"uppercase",letterSpacing:"0.05em",textDecoration:"none",boxShadow:"8px 8px 0px 0px #0D0D0D",display:"inline-block"}}>
                Pick a specialist →
              </Link>
            </div>
          )}

          {/* History grid */}
          {!loading&&gens.length>0&&(
            <div className="hist-grid fade-in" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
              {gens.map((g,i)=>(
                <div key={g.id} className="hist-card" onClick={()=>setSelected(g)}
                  style={{animationDelay:`${i*0.08}s`,opacity:0,animation:`fadeIn 0.6s cubic-bezier(0.16,1,0.3,1) ${i*0.08}s forwards`}}>
                  <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:12}}>
                    <span className="mono" style={{fontSize:13,textTransform:"uppercase",letterSpacing:"0.05em",fontWeight:700}}>
                      {SLUG_LABELS[g.product_slug]||g.product_slug}
                    </span>
                    {g.quality_score&&(
                      <span className="mono" style={{fontSize:10,background:"#00F0FF",color:"#0D0D0D",padding:"2px 8px",border:"2px solid #0D0D0D",borderRadius:0}}>
                        {g.quality_score.toFixed(1)}{g.was_polished?" ✓":""}
                      </span>
                    )}
                    <span className="mono" style={{marginLeft:"auto",fontSize:10,color:"#4a4454",textTransform:"uppercase",letterSpacing:"0.05em"}}>
                      {new Date(g.created_at).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                    </span>
                  </div>
                  <div style={{fontFamily:"Work Sans,sans-serif",fontSize:14,color:"#0D0D0D",lineHeight:1.55,display:"-webkit-box",WebkitLineClamp:3,WebkitBoxOrient:"vertical",overflow:"hidden",opacity:0.8}}>
                    {g.result}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Load more */}
          {!loading&&gens.length>0&&(
            <div style={{marginTop:64,display:"flex",justifyContent:"center"}}>
              <button className="mono press" style={{background:"#0D0D0D",color:"white",padding:"16px 48px",border:"4px solid #0D0D0D",fontSize:18,textTransform:"uppercase",letterSpacing:"0.05em",cursor:"pointer",boxShadow:"8px 8px 0px 0px #0D0D0D"}}>
                FETCH_OLDER_LOGS
              </button>
            </div>
          )}
        </main>

        {/* Detail modal */}
        {selected&&(
          <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.6)",zIndex:200,display:"flex",alignItems:"flex-end"}} onClick={()=>setSelected(null)}>
            <div onClick={e=>e.stopPropagation()} style={{background:"#F9F7F2",width:"100%",maxWidth:640,margin:"0 auto",maxHeight:"85vh",overflow:"auto",borderTop:"4px solid #0D0D0D",borderLeft:"4px solid #0D0D0D",borderRight:"4px solid #0D0D0D",boxShadow:"0px -8px 0px 0px #0D0D0D"}}>
              <div style={{position:"sticky",top:0,background:"#0D0D0D",borderBottom:"4px solid #0D0D0D",padding:"16px 24px",display:"flex",alignItems:"center",gap:16}}>
                <button onClick={()=>setSelected(null)} style={{width:36,height:36,background:"#F9F7F2",border:"3px solid rgba(255,255,255,0.3)",display:"grid",placeItems:"center",cursor:"pointer",fontFamily:"Work Sans,sans-serif",fontSize:18,color:"#0D0D0D",flexShrink:0}}>✕</button>
                <span className="mono" style={{fontSize:14,textTransform:"uppercase",letterSpacing:"0.05em",color:"white",flex:1}}>{SLUG_LABELS[selected.product_slug]||selected.product_slug}</span>
                {selected.quality_score&&(
                  <span className="mono" style={{fontSize:11,background:"#00F0FF",color:"#0D0D0D",padding:"4px 12px",border:"3px solid rgba(255,255,255,0.3)"}}>
                    {selected.quality_score.toFixed(1)}/10{selected.was_polished?" ✓":""}
                  </span>
                )}
              </div>
              <div style={{padding:24}}>
                <div style={{background:"#fff",border:"4px solid #0D0D0D",boxShadow:"8px 8px 0px 0px #0D0D0D",padding:20,fontFamily:"Work Sans,sans-serif",fontSize:15,lineHeight:1.7,whiteSpace:"pre-wrap",marginBottom:20}}>
                  {selected.result}
                </div>
                <div style={{display:"flex",gap:12,marginBottom:20}}>
                  <button className="act-btn" style={{background:"#0D0D0D",color:"white",flex:1,justifyContent:"center"}} onClick={()=>handleCopy(selected.result)}>
                    <span style={{fontFamily:"Material Symbols Outlined",fontSize:18}}>content_copy</span>
                    {copied?"Copied!":"Copy"}
                  </button>
                  <button className="act-btn" style={{flex:1,justifyContent:"center"}} onClick={()=>{router.push(`/dashboard/${selected.product_slug}`);setSelected(null);}}>
                    <span style={{fontFamily:"Material Symbols Outlined",fontSize:18}}>refresh</span>
                    Write it again
                  </button>
                </div>
                <p className="mono" style={{textAlign:"center",fontSize:10,color:"#4a4454",textTransform:"uppercase",letterSpacing:"0.05em"}}>
                  {new Date(selected.created_at).toLocaleString("en-US",{month:"short",day:"numeric",year:"numeric",hour:"2-digit",minute:"2-digit"})}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bottom nav mobile */}
        <nav style={{position:"fixed",bottom:0,left:0,width:"100%",display:"flex",justifyContent:"space-around",alignItems:"center",padding:"12px 16px",background:"#F9F7F2",borderTop:"4px solid #0D0D0D",boxShadow:"0px -8px 0px 0px #0D0D0D",zIndex:50}}>
          <Link href="/dashboard" style={{display:"flex",flexDirection:"column",alignItems:"center",color:"#4a4454",textDecoration:"none",padding:"8px"}}>
            <span style={{fontFamily:"Material Symbols Outlined",fontSize:24}}>construction</span>
            <span className="mono" style={{fontSize:10,textTransform:"uppercase",marginTop:4,letterSpacing:"0.05em"}}>Tools</span>
          </Link>
          <Link href="/history" style={{display:"flex",flexDirection:"column",alignItems:"center",background:"#FFBF00",color:"#0D0D0D",border:"4px solid #0D0D0D",padding:"4px 16px",boxShadow:"6px 6px 0px 0px #0D0D0D",textDecoration:"none"}}>
            <span style={{fontFamily:"Material Symbols Outlined",fontSize:24}}>history</span>
            <span className="mono" style={{fontSize:10,textTransform:"uppercase",marginTop:4,letterSpacing:"0.05em"}}>History</span>
          </Link>
          <Link href="/account" style={{display:"flex",flexDirection:"column",alignItems:"center",color:"#4a4454",textDecoration:"none",padding:"8px"}}>
            <span style={{fontFamily:"Material Symbols Outlined",fontSize:24}}>person</span>
            <span className="mono" style={{fontSize:10,textTransform:"uppercase",marginTop:4,letterSpacing:"0.05em"}}>Account</span>
          </Link>
        </nav>

      </div>

      <style>{`
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
      `}</style>
    </>
  );
}
