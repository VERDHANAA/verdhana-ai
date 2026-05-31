"use client";
import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Anton&family=Work+Sans:wght@400;500;600&family=JetBrains+Mono:wght@600&display=swap');
        @import url('https://fonts.cdnfonts.com/css/prox-yo');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fbf9f4; color: #0D0D0D; overflow-x: hidden; font-family: 'Work Sans', sans-serif; }
        .anton { font-family: 'Anton', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; font-weight: 600; }
        .brand { font-family: 'Prox Yo', sans-serif; font-weight: 700; }
        .shadow-neo { box-shadow: 8px 8px 0px 0px #0D0D0D; }
        .shadow-neo-sm { box-shadow: 6px 6px 0px 0px #0D0D0D; }
        .hover-neo { transition: transform 0.1s, box-shadow 0.1s; cursor: pointer; }
        .hover-neo:hover { transform: translate(4px,4px); box-shadow: 4px 4px 0px 0px #0D0D0D; }
        .hover-neo:active { transform: translate(6px,6px); box-shadow: 2px 2px 0px 0px #0D0D0D; }
        .watermark { font-family: 'Anton',sans-serif; font-size: 20vw; opacity: 0.03; pointer-events: none; line-height: 1; white-space: nowrap; }
        @keyframes slideUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        .entrance { opacity:0; animation: slideUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards; }
        .d1{animation-delay:100ms} .d2{animation-delay:200ms} .d3{animation-delay:300ms} .d4{animation-delay:400ms} .d5{animation-delay:500ms}
        details summary { list-style: none; cursor: pointer; }
        details summary::-webkit-details-marker { display: none; }
        .msym { font-family: 'Material Symbols Outlined'; font-size: 24px; }
        @media(max-width:768px){
          .hide-mobile{display:none!important}
          .grid-12{grid-template-columns:1fr!important}
          .grid-4{grid-template-columns:1fr 1fr!important}
          .grid-2{grid-template-columns:1fr!important}
          .foot-grid{grid-template-columns:1fr!important}
          .hero-h1{font-size:48px!important;line-height:1!important}
          .bottom-nav-mobile{display:flex!important}
          .landing-main{padding-bottom:96px!important}
        }
        @media(max-width:480px){
          .grid-4{grid-template-columns:1fr!important}
          .grid-2{grid-template-columns:1fr!important}
          .hero-h1{font-size:36px!important}
          .landing-main{padding-left:16px!important;padding-right:16px!important}
          .landing-nav-inner{padding-left:16px!important;padding-right:16px!important}
          .landing-foot-inner{padding-left:16px!important;padding-right:16px!important}
          .cta-wrap{display:block!important;width:100%}
          .cta-primary{padding:14px 20px!important;font-size:16px!important;display:block!important;width:100%;text-align:center;box-sizing:border-box}
        }
      `}</style>
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@400,0&display=swap" rel="stylesheet"/>

      <div style={{background:"#fbf9f4",minHeight:"100vh",color:"#0D0D0D",overflowX:"hidden"}}>

        {/* Watermark */}
        <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",zIndex:-1,display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
          <div className="watermark" style={{transform:"rotate(-12deg)"}}>VERDHANA AI VERDHANA AI</div>
        </div>

        {/* NAV */}
        <header className="entrance" style={{width:"100%",position:"sticky",top:0,zIndex:50,borderBottom:"4px solid #0D0D0D",background:"#F9F7F2",boxShadow:"8px 8px 0px 0px #0D0D0D"}}>
          <div className="landing-nav-inner" style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"0 32px",height:80,maxWidth:1280,margin:"0 auto"}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <span className="msym" style={{color:"#5D26C1",fontSize:32}}>token</span>
              <span className="brand" style={{fontSize:28,letterSpacing:"-0.02em",color:"#0D0D0D",textTransform:"uppercase"}}>VERDHANA AI</span>
            </div>
            <nav className="hide-mobile" style={{display:"flex",gap:20,alignItems:"center"}}>
              <Link href="/dashboard" className="mono" style={{fontSize:14,borderBottom:"4px solid #0D0D0D",padding:"8px 0",textTransform:"uppercase",textDecoration:"none",color:"#0D0D0D",letterSpacing:"0.05em"}}>Tools</Link>
              <Link href="/history" className="mono" style={{fontSize:14,padding:"8px 0",textTransform:"uppercase",textDecoration:"none",color:"#4a4454",letterSpacing:"0.05em"}}>History</Link>
              <Link href="/account" className="mono" style={{fontSize:14,padding:"8px 0",textTransform:"uppercase",textDecoration:"none",color:"#4a4454",letterSpacing:"0.05em"}}>Account</Link>
            </nav>
            <Link href="/signup" className="hover-neo mono" style={{background:"#FFBF00",border:"4px solid #0D0D0D",padding:"8px 24px",fontSize:14,textTransform:"uppercase",textDecoration:"none",color:"#0D0D0D",fontWeight:600,letterSpacing:"0.05em",boxShadow:"8px 8px 0px 0px #0D0D0D",display:"inline-block"}}>UPGRADE</Link>
          </div>
        </header>

        <main className="landing-main" style={{maxWidth:1280,margin:"0 auto",padding:"0 32px",overflowX:"hidden"}}>

          {/* HERO */}
          <section style={{position:"relative",minHeight:707,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"68px 0",textAlign:"center",overflow:"hidden"}}>
            <div style={{position:"absolute",top:"10%",left:"-10%",width:"40vw",height:"30vw",background:"#00F0FF",opacity:0.15,transform:"rotate(-8deg)",pointerEvents:"none",zIndex:-1}}/>
            <div style={{position:"absolute",top:"40%",right:"-15%",width:"35vw",height:"35vw",background:"#5D26C1",opacity:0.1,transform:"rotate(12deg)",pointerEvents:"none",zIndex:-1}}/>
            <div style={{position:"absolute",bottom:"-5%",left:"20%",width:"50vw",height:"20vw",background:"#FFBF00",opacity:0.15,transform:"rotate(5deg)",pointerEvents:"none",zIndex:-1}}/>
            <div className="entrance d2 hide-mobile" style={{position:"absolute",top:40,left:"-5%",width:192,height:192,background:"#00F0FF",border:"4px solid #0D0D0D",boxShadow:"8px 8px 0px 0px #0D0D0D",transform:"rotate(-15deg)"}}/>
            <div className="entrance d3 hide-mobile" style={{position:"absolute",bottom:80,right:"-2%",width:256,height:96,background:"#5D26C1",border:"4px solid #0D0D0D",boxShadow:"8px 8px 0px 0px #0D0D0D",transform:"rotate(8deg)"}}/>
            <h1 className="anton entrance d1 hero-h1" style={{fontSize:120,lineHeight:"0.9",textTransform:"uppercase",position:"relative",zIndex:10}}>
              Marketing copy that sounds human.<br/>
              <span style={{color:"#5D26C1",fontStyle:"italic"}}>Not like AI.</span>
            </h1>
            <div className="entrance d2" style={{marginTop:20,maxWidth:672,position:"relative",zIndex:10}}>
              <p style={{fontSize:18,lineHeight:"28px",fontWeight:500,color:"#4a4454",marginBottom:40,fontFamily:"Work Sans,sans-serif"}}>
                12 specialists trained to write the way good marketers actually write. Pick one, fill a brief, get copy worth using.
              </p>
              <div className="cta-wrap" style={{position:"relative",display:"inline-block"}}>
                <div style={{position:"absolute",inset:-15,background:"#00F0FF",border:"4px solid #0D0D0D",transform:"rotate(-2deg)",zIndex:-1,boxShadow:"6px 6px 0px 0px #0D0D0D"}}/>
                <Link href="/signup" className="cta-primary hover-neo mono" style={{background:"#0D0D0D",color:"#F9F7F2",padding:"24px 48px",fontSize:20,textTransform:"uppercase",border:"4px solid #0D0D0D",textDecoration:"none",display:"inline-block",fontWeight:600,letterSpacing:"0.05em",boxShadow:"8px 8px 0px 0px #0D0D0D"}}>
                  Start writing — it's free
                </Link>
              </div>
              <p className="mono" style={{marginTop:16,fontSize:14,color:"#4a4454",textTransform:"uppercase",letterSpacing:"0.05em"}}>10 generations a day. No card. No expiry.</p>
            </div>
          </section>

          {/* FEATURES */}
          <section style={{padding:"68px 0"}}>
            <div className="entrance d1" style={{display:"flex",alignItems:"flex-end",justifyContent:"space-between",marginBottom:20,borderBottom:"4px solid #0D0D0D",paddingBottom:16}}>
              <h2 className="anton" style={{fontSize:48,lineHeight:"52px",textTransform:"uppercase"}}>Built different. On purpose.</h2>
              <p className="mono" style={{fontSize:14,color:"#4a4454",textTransform:"uppercase",letterSpacing:"0.05em"}}>001 // INFRASTRUCTURE</p>
            </div>
            <div className="grid-12" style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:20}}>
              <div className="md:col-span-8 bg-cream-base border-[4px] border-ink-black p-6 neobrutal-shadow md:rotate-[-1deg] animate-entrance delay-200">
                <span className="msym" style={{fontSize:48,color:"#FFBF00",display:"block",marginBottom:16}}>architecture</span>
                <h3 className="anton" style={{fontSize:36,textTransform:"uppercase",marginBottom:16}}>AI Quality Reviewer</h3>
                <p style={{fontSize:16,lineHeight:"24px",color:"#4a4454",maxWidth:"28rem",fontFamily:"Work Sans,sans-serif"}}>Every draft scored 1–10. Writer drafts, Reviewer checks, Editor refines. Copy that actually sounds human — not like a template.</p>
              </div>
              <div className="md:col-span-4 bg-electric-cyan border-[4px] border-ink-black p-6 neobrutal-shadow md:rotate-[2deg] flex flex-col justify-between animate-entrance delay-300">
                <div>
                  <span className="msym" style={{fontSize:48,display:"block",marginBottom:16}}>terminal</span>
                  <h3 className="anton" style={{fontSize:36,textTransform:"uppercase",marginBottom:16}}>Hard Logic</h3>
                </div>
                <p style={{fontSize:16,lineHeight:"24px",fontFamily:"Work Sans,sans-serif"}}>No hallucinations. No fluff. Just 12 specialists trained for one specific task each.</p>
              </div>
              <div className="md:col-span-4 bg-deep-violet text-cream-base border-[4px] border-ink-black p-6 neobrutal-shadow md:rotate-[-2deg] animate-entrance delay-400">
                <h3 className="anton" style={{fontSize:36,textTransform:"uppercase",marginBottom:16}}>Self-Healing</h3>
                <div style={{height:128,border:"4px solid #0D0D0D",background:"#0D0D0D",marginBottom:16,display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <span className="msym" style={{fontSize:60,color:"#F9F7F2"}}>language</span>
                </div>
                <p className="mono" style={{fontSize:14,textTransform:"uppercase",letterSpacing:"0.05em"}}>Uptime: 99.99%</p>
                <p className="mono" style={{fontSize:14,textTransform:"uppercase",letterSpacing:"0.05em"}}>Fallback: Auto</p>
              </div>
              <div className="entrance d5" style={{gridColumn:"span 8",background:"#FFBF00",border:"4px solid #0D0D0D",padding:24,boxShadow:"8px 8px 0px 0px #0D0D0D",display:"flex",gap:20,alignItems:"center"}}>
                <div style={{flex:1}}>
                  <h3 className="anton" style={{fontSize:36,textTransform:"uppercase",marginBottom:16}}>Encrypted DNA</h3>
                  <p style={{fontSize:16,lineHeight:"24px",fontFamily:"Work Sans,sans-serif"}}>Your inputs and outputs are stored privately. We don't share or train on user content. Ever.</p>
                </div>
                <div style={{width:"33%",aspectRatio:"1",border:"4px solid #0D0D0D",background:"#0D0D0D",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <span className="msym" style={{fontSize:80,color:"#F9F7F2"}}>lock</span>
                </div>
              </div>
            </div>
          </section>

          {/* COMPARE */}
          <section style={{padding:"68px 0"}}>
            <div className="entrance d1" style={{textAlign:"center",marginBottom:48}}>
              <span className="mono entrance d1" style={{background:"#5D26C1",color:"#F9F7F2",padding:"4px 16px",fontSize:14,textTransform:"uppercase",letterSpacing:"0.05em",boxShadow:"6px 6px 0px 0px #0D0D0D",border:"4px solid #0D0D0D",display:"inline-block",marginBottom:16,transform:"rotate(3deg)"}}>Analysis</span>
              <h2 className="anton" style={{fontSize:48,lineHeight:"52px",textTransform:"uppercase"}}>Generic AI vs Verdhana</h2>
            </div>
            <div className="entrance d2 grid-2" style={{display:"grid",gridTemplateColumns:"1fr 1fr",border:"4px solid #0D0D0D",boxShadow:"8px 8px 0px 0px #0D0D0D"}}>
              <div style={{padding:40,background:"#f0eee9",borderRight:"4px solid #0D0D0D"}}>
                <h3 className="anton" style={{fontSize:36,textTransform:"uppercase",marginBottom:24,color:"#4a4454"}}>Standard AI</h3>
                <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:16}}>
                  {["Unleash your potential today","Transform your business in 2025","In today's fast-paced world..."].map((t,i)=>(
                    <li key={i} style={{display:"flex",alignItems:"flex-start",gap:16,color:"#4a4454",textDecoration:"line-through"}}>
                      <span style={{color:"#ba1a1a",fontWeight:700,flexShrink:0}}>✕</span>
                      <span style={{fontSize:18,lineHeight:"28px",fontWeight:500,fontFamily:"Work Sans,sans-serif"}}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{padding:40,background:"#F9F7F2",position:"relative"}}>
                <div className="mono" style={{position:"absolute",top:16,right:16,background:"#00F0FF",border:"4px solid #0D0D0D",padding:"2px 8px",fontSize:10,textTransform:"uppercase",letterSpacing:"0.05em",boxShadow:"6px 6px 0px 0px #0D0D0D"}}>Superior</div>
                <h3 className="brand" style={{fontSize:36,textTransform:"uppercase",marginBottom:24}}>VERDHANA AI</h3>
                <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:16}}>
                  {["Specific observational openers","Real numbers: 47%, 73%, 1,247","Calm confidence, no hype"].map((t,i)=>(
                    <li key={i} style={{display:"flex",alignItems:"flex-start",gap:16}}>
                      <span style={{color:"#006970",fontWeight:700,flexShrink:0}}>✓</span>
                      <span style={{fontSize:18,lineHeight:"28px",fontWeight:700,fontStyle:"italic",fontFamily:"Work Sans,sans-serif"}}>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* SPECIALISTS */}
          <section style={{padding:"68px 0"}}>
            <h2 className="anton entrance d1" style={{fontSize:48,lineHeight:"52px",textTransform:"uppercase",marginBottom:20,textAlign:"center"}}>12 Specialists. One Platform.</h2>
            <div className="grid-4" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
              {[
                {abbr:"FB",name:"Facebook Ads",role:"COPY ARCHITECT",bg:"#F9F7F2",offset:false},
                {abbr:"TT",name:"TikTok Scripts",role:"HOOK ENGINEER",bg:"#FFBF00",offset:true},
                {abbr:"GA",name:"Google Ads",role:"CTR ANALYST",bg:"#F9F7F2",offset:false},
                {abbr:"IG",name:"Instagram",role:"CAPTION LEAD",bg:"#00F0FF",offset:true},
                {abbr:"EM",name:"Email Marketing",role:"INBOX ANALYST",bg:"#F9F7F2",offset:false},
                {abbr:"YT",name:"YouTube Titles",role:"VIEW ENGINEER",bg:"#FFBF00",offset:true},
                {abbr:"PD",name:"Product Desc.",role:"CONTENT ARCH",bg:"#F9F7F2",offset:false},
                {abbr:"VS",name:"Video Scripts",role:"SCRIPT LEAD",bg:"#00F0FF",offset:true},
                {abbr:"LP",name:"Landing Pages",role:"PAGE ENGINEER",bg:"#F9F7F2",offset:false},
                {abbr:"PN",name:"Push Notifs",role:"NOTIF ANALYST",bg:"#FFBF00",offset:true},
                {abbr:"SM",name:"SMS Marketing",role:"SMS ENGINEER",bg:"#F9F7F2",offset:false},
                {abbr:"LI",name:"LinkedIn Ads",role:"B2B ANALYST",bg:"#00F0FF",offset:true},
              ].map((sp,i)=>(
                <Link key={sp.name} href={`/dashboard/${sp.name.toLowerCase().replace(/[\s.]+/g,'-')}`}
                  className="hover-neo"
                  style={{background:sp.bg,border:"4px solid #0D0D0D",padding:12,boxShadow:"8px 8px 0px 0px #0D0D0D",textDecoration:"none",color:"#0D0D0D",display:"block",transform:sp.offset?"translateY(16px)":"none"}}>
                  <div style={{aspectRatio:"1",background:"#0D0D0D",marginBottom:12,border:"4px solid #0D0D0D",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}}>
                    <span className="anton" style={{fontSize:40,color:"#F9F7F2",textTransform:"uppercase"}}>{sp.abbr}</span>
                  </div>
                  <p className="mono" style={{fontSize:11,textTransform:"uppercase",color:"#5D26C1",letterSpacing:"0.05em",marginBottom:4}}>{sp.role}</p>
                  <p style={{fontSize:16,textTransform:"uppercase",fontWeight:700,fontFamily:"Work Sans,sans-serif"}}>{sp.name}</p>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section style={{padding:"68px 0",maxWidth:896,margin:"0 auto"}}>
            <h2 className="anton entrance d1" style={{fontSize:48,lineHeight:"52px",textTransform:"uppercase",marginBottom:20,borderLeft:"10px solid #0D0D0D",paddingLeft:24}}>Good questions.</h2>
            <div className="entrance d2" style={{display:"flex",flexDirection:"column",gap:20}}>
              {[
                {q:"Is it really free?",a:"Yes. Free forever for 10 generations/day with 1 AI Polish. No card required. Pro unlocks unlimited generations and all 4 model tiers."},
                {q:"How is this different from ChatGPT?",a:"12 specialists each trained for one task, plus a Reviewer + Editor that removes the AI tells ChatGPT generates by default: overused words, weak hooks, rhetorical questions."},
                {q:"What AI models do you use?",a:"Free: Claude Haiku. Pro: Gemini Flash, Claude Sonnet 4, Claude Opus 4. If a model fails, the system falls back automatically."},
                {q:"Will my content be used to train AI?",a:"No. Your inputs and outputs are stored privately. We don't share or train on user content."},
              ].map((faq,i)=>(
                <details key={i} style={{background:"#F9F7F2",border:"4px solid #0D0D0D",boxShadow:"8px 8px 0px 0px #0D0D0D",overflow:"hidden"}}>
                  <summary style={{padding:20,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <span style={{fontSize:18,lineHeight:"28px",fontWeight:700,textTransform:"uppercase",fontFamily:"Work Sans,sans-serif"}}>{faq.q}</span>
                    <span className="msym" style={{flexShrink:0,transition:"transform 0.2s"}}>expand_more</span>
                  </summary>
                  <div style={{padding:"0 20px 20px",fontSize:16,color:"#4a4454",borderTop:"4px solid #0D0D0D",paddingTop:12,lineHeight:"24px",fontFamily:"Work Sans,sans-serif"}}>
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>

        </main>

        {/* FOOTER */}
        <footer className="entrance d1" style={{marginTop:68,borderTop:"4px solid #0D0D0D",background:"#0D0D0D",color:"#F9F7F2",padding:"64px 0"}}>
          <div className="foot-grid landing-foot-inner" style={{maxWidth:1280,margin:"0 auto",padding:"0 32px",display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:20}}>
            <div style={{gridColumn:"span 2"}}>
              <span className="brand" style={{fontSize:48,fontWeight:700,textTransform:"uppercase",letterSpacing:"-0.02em",display:"block",marginBottom:16}}>VERDHANA AI</span>
              <p className="mono" style={{fontSize:14,textTransform:"uppercase",maxWidth:240,color:"#7b7485",letterSpacing:"0.05em",lineHeight:"20px"}}>Writing tools for marketers who care about quality.</p>
            </div>
            <div>
              <p className="mono" style={{fontSize:14,textTransform:"uppercase",marginBottom:24,color:"#FFBF00",letterSpacing:"0.05em"}}>Navigation</p>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:8}}>
                {[["Tools","/dashboard"],["History","/history"],["Account","/account"],["Sign in","/login"]].map(([l,h])=>(
                  <li key={l}><Link href={h} className="mono" style={{fontSize:14,textTransform:"uppercase",color:"#F9F7F2",textDecoration:"none",letterSpacing:"0.05em"}}>{l}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mono" style={{fontSize:14,textTransform:"uppercase",marginBottom:24,color:"#00F0FF",letterSpacing:"0.05em"}}>Connect</p>
              <ul style={{listStyle:"none",display:"flex",flexDirection:"column",gap:8}}>
                {[["Email","mailto:hello@verdhanaai.com"],["GitHub","https://github.com/VERDHANAA"],["Contact","mailto:hello@verdhanaai.com"]].map(([l,h])=>(
                  <li key={l}><a href={h} className="mono" style={{fontSize:14,textTransform:"uppercase",color:"#F9F7F2",textDecoration:"none",letterSpacing:"0.05em"}}>{l}</a></li>
                ))}
              </ul>
            </div>
          </div>
          <div style={{maxWidth:1280,margin:"64px auto 0",padding:"32px 32px 0",borderTop:"1px solid rgba(249,247,242,0.1)",textAlign:"center"}}>
            <p className="mono" style={{fontSize:10,textTransform:"uppercase",opacity:0.5,letterSpacing:"0.05em"}}>© 2026 VERDHANA AI. ALL RIGHTS RESERVED.</p>
          </div>
        </footer>

        {/* BOTTOM NAV MOBILE */}
        <nav className="bottom-nav-mobile" style={{position:"fixed",bottom:0,left:0,width:"100%",display:"none",justifyContent:"space-around",alignItems:"center",padding:"12px 16px",background:"#F9F7F2",borderTop:"4px solid #0D0D0D",zIndex:50}}>
          <Link href="/dashboard" style={{display:"flex",flexDirection:"column",alignItems:"center",background:"#FFBF00",color:"#0D0D0D",border:"4px solid #0D0D0D",padding:"4px 16px",boxShadow:"6px 6px 0px 0px #0D0D0D",textDecoration:"none"}}>
            <span className="msym">construction</span>
            <span className="mono" style={{fontSize:10,textTransform:"uppercase",marginTop:4,letterSpacing:"0.05em"}}>Tools</span>
          </Link>
          <Link href="/history" style={{display:"flex",flexDirection:"column",alignItems:"center",color:"#4a4454",textDecoration:"none",padding:"8px"}}>
            <span className="msym">history</span>
            <span className="mono" style={{fontSize:10,textTransform:"uppercase",marginTop:4,letterSpacing:"0.05em"}}>History</span>
          </Link>
          <Link href="/account" style={{display:"flex",flexDirection:"column",alignItems:"center",color:"#4a4454",textDecoration:"none",padding:"8px"}}>
            <span className="msym">person</span>
            <span className="mono" style={{fontSize:10,textTransform:"uppercase",marginTop:4,letterSpacing:"0.05em"}}>Account</span>
          </Link>
        </nav>

      </div>
    </>
  );
}
