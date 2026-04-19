import { useState, useEffect } from "react";

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Jost:wght@300;400;500;600&display=swap');

*,*::before,*::after{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}

/* ── LIGHT THEME ── */
:root{
  --ink:    #0e0e0e;
  --ink2:   #3a3a3a;
  --ink3:   #7a7a7a;
  --ink4:   #b0b0b0;
  --canvas: #fafaf8;
  --canvas2:#f2f1ef;
  --canvas3:#ebebea;
  --line:   #e2e1df;
  --white:  #ffffff;
  --nav-bg: rgba(250,250,248,.95);
  --card-bg:#ffffff;
  --footer-bg:#0e0e0e;
  --footer-text:#ffffff;
  --shadow: rgba(0,0,0,.06);
  --r-sm:   6px;
  --r-md:   10px;
  --r-lg:   16px;
}

/* ── DARK THEME ── */
[data-theme="dark"]{
  --ink:    #f0efe9;
  --ink2:   #c8c7c0;
  --ink3:   #888880;
  --ink4:   #555550;
  --canvas: #0c0c0b;
  --canvas2:#141413;
  --canvas3:#1c1c1a;
  --line:   #2a2a28;
  --white:  #181816;
  --nav-bg: rgba(12,12,11,.95);
  --card-bg:#181816;
  --footer-bg:#070706;
  --footer-text:#f0efe9;
  --shadow: rgba(0,0,0,.3);
}

body{
  background:var(--canvas);
  font-family:'Jost',sans-serif;
  color:var(--ink);
  -webkit-font-smoothing:antialiased;
  transition:background .3s,color .3s;
}

@keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
.fu0{animation:fadeUp .65s ease both;}
.fu1{animation:fadeUp .65s .12s ease both;}
.fu2{animation:fadeUp .65s .24s ease both;}
.fu3{animation:fadeUp .65s .38s ease both;}

/* NAV */
.nav-item{
  background:none;border:none;cursor:pointer;
  font-family:'Jost',sans-serif;font-size:13px;font-weight:500;
  letter-spacing:.06em;text-transform:uppercase;
  color:var(--ink3);padding:6px 12px;border-radius:var(--r-sm);
  transition:color .18s,background .18s;
}
.nav-item:hover{color:var(--ink);background:var(--canvas2);}

/* BUTTONS */
.btn-solid{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  background:var(--ink);color:var(--canvas);
  border:1.5px solid var(--ink);border-radius:var(--r-sm);
  padding:13px 28px;font-family:'Jost',sans-serif;font-size:13px;
  font-weight:500;letter-spacing:.06em;text-transform:uppercase;
  cursor:pointer;transition:opacity .18s,transform .15s;
}
.btn-solid:hover{opacity:.82;transform:translateY(-1px);}

.btn-ghost{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  background:transparent;color:var(--ink);
  border:1.5px solid var(--line);border-radius:var(--r-sm);
  padding:13px 28px;font-family:'Jost',sans-serif;font-size:13px;
  font-weight:500;letter-spacing:.06em;text-transform:uppercase;
  cursor:pointer;transition:border-color .18s,background .18s,transform .15s;
}
.btn-ghost:hover{border-color:var(--ink4);background:var(--canvas2);transform:translateY(-1px);}

/* CARDS */
.p-card{
  background:var(--card-bg);border:1px solid var(--line);
  border-radius:var(--r-lg);padding:28px 24px;
  transition:border-color .2s,transform .2s,box-shadow .2s;
}
.p-card:hover{
  border-color:var(--ink4);transform:translateY(-3px);
  box-shadow:0 12px 40px var(--shadow);
}

.g-card{
  background:var(--canvas2);border:1px solid var(--line);
  border-radius:var(--r-lg);overflow:hidden;
  transition:border-color .2s,transform .2s;
}
.g-card:hover{border-color:var(--ink4);transform:translateY(-2px);}

/* INFO ROW */
.i-row{
  display:flex;align-items:flex-start;gap:16px;padding:20px;
  background:var(--card-bg);border:1px solid var(--line);
  border-radius:var(--r-md);margin-bottom:10px;transition:border-color .18s;
}
.i-row:hover{border-color:var(--ink4);}

/* SECTION TAG */
.s-tag{
  font-family:'Jost',sans-serif;font-size:11px;font-weight:600;
  letter-spacing:.14em;text-transform:uppercase;color:var(--ink3);margin-bottom:14px;
}

/* DISPLAY HEADING */
.disp{
  font-family:'Cormorant Garamond',serif;font-weight:600;
  letter-spacing:-.01em;line-height:1.08;color:var(--ink);
}

/* BODY TEXT */
.body-t{
  font-family:'Jost',sans-serif;font-weight:300;font-size:15px;
  line-height:1.8;color:var(--ink3);
}

/* NAV ICON BTN */
.icon-btn{
  background:transparent;border:1px solid var(--line);
  border-radius:var(--r-sm);padding:7px 13px;color:var(--ink2);
  font-family:'Jost',sans-serif;font-size:14px;font-weight:500;
  letter-spacing:.05em;cursor:pointer;
  transition:border-color .18s,background .18s,color .18s;
  display:flex;align-items:center;gap:5px;
}
.icon-btn:hover{border-color:var(--ink4);background:var(--canvas2);}

/* GALLERY BTN */
.g-btn{
  width:38px;height:38px;background:var(--card-bg);
  border:1px solid var(--line);border-radius:var(--r-sm);
  color:var(--ink2);cursor:pointer;font-size:16px;
  display:flex;align-items:center;justify-content:center;
  transition:border-color .18s,background .18s;
}
.g-btn:hover{border-color:var(--ink4);background:var(--canvas2);}

/* STICKY CTAs */
.s-call{
  display:flex;align-items:center;gap:8px;
  background:var(--ink);color:var(--canvas);
  border:none;border-radius:var(--r-sm);
  padding:12px 20px;font-family:'Jost',sans-serif;
  font-size:13px;font-weight:500;letter-spacing:.05em;
  text-transform:uppercase;cursor:pointer;text-decoration:none;
  transition:opacity .18s,transform .12s;
}
.s-call:hover{opacity:.82;transform:translateY(-1px);}

.s-wa{
  display:flex;align-items:center;gap:8px;
  background:var(--card-bg);color:var(--ink);
  border:1.5px solid var(--line);border-radius:var(--r-sm);
  padding:11px 20px;font-family:'Jost',sans-serif;
  font-size:13px;font-weight:500;letter-spacing:.05em;
  text-transform:uppercase;cursor:pointer;text-decoration:none;
  transition:border-color .18s,background .18s,transform .12s;
}
.s-wa:hover{border-color:var(--ink4);background:var(--canvas2);transform:translateY(-1px);}

/* DOT NAV */
.dot-nav{width:6px;height:6px;border-radius:50%;background:var(--line);cursor:pointer;transition:background .2s;}
.dot-nav.on{background:var(--ink);}

/* FEATURE ROW */
.feat{display:flex;align-items:flex-start;gap:12px;margin-bottom:16px;}
.feat-icon{
  width:30px;height:30px;border-radius:var(--r-sm);
  border:1px solid var(--line);display:flex;align-items:center;
  justify-content:center;font-size:14px;flex-shrink:0;
  background:var(--canvas2);
}

/* ── HAMBURGER MENU ── */
.hamburger{
  display:none;flex-direction:column;justify-content:center;
  gap:5px;background:transparent;border:1px solid var(--line);
  border-radius:var(--r-sm);padding:8px 10px;cursor:pointer;
  transition:border-color .18s,background .18s;
}
.hamburger:hover{border-color:var(--ink4);background:var(--canvas2);}
.hamburger span{
  display:block;width:18px;height:1.5px;
  background:var(--ink2);transition:all .25s;
}

/* Mobile drawer */
.mobile-menu{
  display:none;position:fixed;top:62px;left:0;right:0;
  background:var(--nav-bg);backdrop-filter:blur(16px);
  border-bottom:1px solid var(--line);z-index:998;
  flex-direction:column;padding:12px 20px 20px;gap:4px;
}
.mobile-menu.open{display:flex;}
.mobile-menu .nav-item{text-align:left;padding:10px 12px;font-size:14px;}

/* ── RESPONSIVE: TABLET (≤768px) ── */
@media(max-width:768px){

  /* Nav */
  .nav-links{display:none !important;}
  .hamburger{display:flex !important;}
  nav{padding:0 20px !important;}

  /* Wrapper */
  .wrap{padding:0 20px !important;}

  /* Hero */
  .hero-section{padding:100px 20px 60px !important;}
  .hero-stats{
    flex-direction:column !important;
    border-top:1px solid var(--line);
    padding-top:32px !important;
  }
  .hero-stat{
    border-right:none !important;
    border-bottom:1px solid var(--line) !important;
    padding:14px 0 !important;
    width:100% !important;
  }
  .hero-stat:last-child{border-bottom:none !important;}

  /* About: single column */
  .about-grid{grid-template-columns:1fr !important;gap:56px !important;}
  .about-float{bottom:-14px !important;right:0 !important;}

  /* Products: 2 cols */
  .products-grid{grid-template-columns:repeat(2,1fr) !important;}

  /* Gallery: single big card only */
  .gallery-grid{grid-template-columns:1fr !important;}
  .gallery-grid > *:nth-child(2),
  .gallery-grid > *:nth-child(3){display:none !important;}

  /* Contact: single column */
  .contact-grid{grid-template-columns:1fr !important;gap:24px !important;}

  /* Section padding */
  .sec{padding:60px 0 !important;}

  /* Footer */
  footer{padding:40px 20px 28px !important;}
}

/* ── RESPONSIVE: MOBILE (≤480px) ── */
@media(max-width:480px){

  .wrap{padding:0 16px !important;}

  /* Hero */
  .hero-section{padding:90px 16px 50px !important;}
  .hero-btns{flex-direction:column !important;width:100% !important;}
  .hero-btns .btn-solid,
  .hero-btns .btn-ghost{width:100% !important;}

  /* Products: 1 col */
  .products-grid{grid-template-columns:1fr !important;}

  /* Sticky CTAs: icon only on very small screens */
  .cta-label{display:none !important;}
  .s-call,.s-wa{padding:11px 14px !important;}
}
`;

const PRODUCTS = [
  { icon:"💡", name:"LED Lights",        desc:"Energy-efficient LED bulbs, strips & lighting solutions for every need." },
  { icon:"🔊", name:"Speakers",          desc:"High-quality speakers for home, events & audio setups." },
  { icon:"🎚️", name:"Amplifiers",        desc:"Reliable amplifiers for powerful and clear sound performance." },
  { icon:"🚗", name:"Car Stereos",       desc:"Modern car audio systems with Bluetooth, USB & premium sound quality." },
  { icon:"🔋", name:"Batteries",         desc:"Long-lasting batteries for all your devices and backup needs." },
  { icon:"🌀", name:"Fans",              desc:"Ceiling, wall & pedestal fans for efficient cooling solutions." },
  { icon:"🎤", name:"Microphones",       desc:"Wired & wireless mics for events, studios & daily use." },
  { icon:"🔌", name:"Cables & Wiring",   desc:"Extension cables, wires, plugs & pins for safe electrical setups." },
  { icon:"🧰", name:"Spare Parts",       desc:"Essential electronic spare parts for repairs and maintenance." },
  { icon:"🔦", name:"Torches",           desc:"Durable and bright torches for home and outdoor use." },
  { icon:"☕", name:"Kettles",           desc:"Electric kettles for quick and convenient boiling." },
  { icon:"⚡", name:"Other Electronics", desc:"A wide range of useful everyday electronic items." },
];

const GALLERY = [
  { icon:"💡", label:"LED Lighting",        sub:"Bulbs, strips & fixtures" },
  { icon:"🔊", label:"Audio Systems",       sub:"Speakers, amps & sound gear" },
  { icon:"🔌", label:"Electrical Items",    sub:"Wires, plugs & accessories" },
  { icon:"🛠️", label:"Tools & Spare Parts", sub:"Repair & maintenance essentials" },
];

const NAV = ["Home","About","Products","Gallery","Contact"];

export default function AptechElectronics() {
  const [scrolled,   setScrolled  ] = useState(false);
  const [slide,      setSlide     ] = useState(0);
  const [dark,       setDark      ] = useState(false);
  const [menuOpen,   setMenuOpen  ] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  const go = id => {
    document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
    setMenuOpen(false);
  };

  const W = ({ children, style={} }) => (
    <div className="wrap" style={{ maxWidth:1080, margin:"0 auto", padding:"0 40px", ...style }}>
      {children}
    </div>
  );

  return (
    <>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:999,
        height:62, display:"flex", alignItems:"center",
        justifyContent:"space-between", padding:"0 40px",
        background: scrolled || menuOpen ? "var(--nav-bg)" : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
        borderBottom: scrolled || menuOpen ? "1px solid var(--line)" : "none",
        transition:"all .3s",
      }}>
        {/* Logo */}
        <div style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer" }} onClick={()=>go("home")}>
          <div style={{ width:32, height:32, background:"var(--ink)", borderRadius:"6px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15, color:"var(--canvas)" }}>⚡</div>
          <div>
            <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:24, color:"var(--ink)", letterSpacing:"-.01em", lineHeight:1 }}>Aptech</div>
            <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:600, letterSpacing:".14em", textTransform:"uppercase", color:"var(--ink4)", marginTop:1 }}>Electronics</div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="nav-links" style={{ display:"flex", gap:0 }}>
          {NAV.map(n => <button key={n} className="nav-item" onClick={()=>go(n.toLowerCase())}>{n}</button>)}
        </div>

        {/* Right controls */}
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <button className="icon-btn" onClick={()=>setDark(d=>!d)} title="Toggle dark mode">
            {dark ? "☀️" : "🌙"}
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:500 }}>
              {dark ? "Light" : "Dark"}
            </span>
          </button>
          {/* Hamburger — visible only on mobile via CSS */}
          <button className="hamburger" onClick={()=>setMenuOpen(m=>!m)} aria-label="Menu">
            <span style={{ transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
            <span style={{ opacity: menuOpen ? 0 : 1 }} />
            <span style={{ transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-menu${menuOpen?" open":""}`}>
        {NAV.map(n => <button key={n} className="nav-item" onClick={()=>go(n.toLowerCase())}>{n}</button>)}
      </div>

      {/* ── HERO ── */}
      <section id="home" className="hero-section" style={{
        background:"var(--canvas)", minHeight:"100vh",
        display:"flex", flexDirection:"column", alignItems:"center",
        justifyContent:"center", padding:"120px 40px 80px",
        textAlign:"center", position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", inset:0,
          backgroundImage:"linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)",
          backgroundSize:"80px 80px", opacity:.45,
          WebkitMaskImage:"radial-gradient(ellipse 75% 75% at 50% 50%,black,transparent)",
          pointerEvents:"none",
        }} />

        <div className="fu0" style={{ display:"inline-flex", alignItems:"center", gap:8, background:"var(--canvas2)", border:"1px solid var(--line)", borderRadius:20, padding:"5px 16px", marginBottom:28 }}>
          <span style={{ width:6, height:6, borderRadius:"50%", background:"var(--ink)", display:"block" }} />
          <span style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"var(--ink2)" }}>Areacode, Malappuram</span>
        </div>

        <h1 className="disp fu1" style={{ fontSize:"clamp(2.4rem,6.5vw,5.5rem)", maxWidth:760, marginBottom:24 }}>
          The Electronics Store<br />Your Neighborhood Deserves
        </h1>

        <p className="body-t fu2" style={{ maxWidth:480, marginBottom:44 }}>
          Quality LED lights, speakers, amplifiers, and spare parts — with honest pricing and genuine after-sales care since 2006.
        </p>

        <div className="fu3 hero-btns" style={{ display:"flex", gap:12, flexWrap:"wrap", justifyContent:"center", marginBottom:80 }}>
          <button className="btn-solid" onClick={()=>go("products")}>Shop Our Range</button>
          <button className="btn-ghost" onClick={()=>go("contact")}>Find the Store</button>
        </div>

        {/* Stats row */}
        <div className="fu3 hero-stats" style={{ display:"flex", borderTop:"1px solid var(--line)", paddingTop:40, gap:0, flexWrap:"wrap", justifyContent:"center", width:"100%" }}>
          {[
            ["20+","Years in Business"],
            ["10,000+","Happy Customers"],
            ["500+","Products Stocked"],
            ["10 AM – 9 PM","Open Every Day"],
          ].map(([n,l],i,a)=>(
            <div key={l} className="hero-stat" style={{ padding:"0 40px", textAlign:"center", borderRight: i<a.length-1 ? "1px solid var(--line)" : "none" }}>
              <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:30, color:"var(--ink)", letterSpacing:"-.01em" }}>{n}</div>
              <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:500, letterSpacing:".08em", textTransform:"uppercase", color:"var(--ink3)", marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="sec" style={{ background:"var(--white)", borderTop:"1px solid var(--line)", padding:"100px 0" }}>
        <W>
          <div className="about-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
            {/* Image area */}
            <div style={{ position:"relative" }}>
              <div style={{ borderRadius:"16px", background:"var(--canvas2)", border:"1px solid var(--line)", aspectRatio:"4/3", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                <div style={{ fontSize:72, lineHeight:1 }}>🏪</div>
                <div style={{ marginTop:24, textAlign:"center", padding:"0 24px" }}>
                  <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:16, color:"var(--ink)" }}>Aptech Electronics</div>
                  <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"var(--ink3)", marginTop:4 }}>Areacode · Est. 2006</div> 
                </div>
              </div>
              {/* Floating tag */}
              <div className="about-float" style={{ position:"absolute", bottom:-18, right:-18, background:"var(--card-bg)", border:"1px solid var(--line)", borderRadius:"10px", padding:"12px 20px", boxShadow:"0 8px 32px var(--shadow)" }}>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:600, letterSpacing:".1em", textTransform:"uppercase", color:"var(--ink3)" }}>Areacode, Kerala</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:19, color:"var(--ink)", marginTop:2 }}>Trusted Since 2006</div>
              </div>
            </div>

            {/* Text */}
            <div>
              <div className="s-tag">About Us</div>
              <h2 className="disp" style={{ fontSize:"clamp(2rem,2.8vw,2.8rem)", marginBottom:18 }}>
                Your Neighborhood<br />Electronics Expert
              </h2>
              <p className="body-t" style={{ marginBottom:32 }}>
                Aptech Electronics has been a trusted part of the community for over 20 years. We offer LED lights, speakers, amplifiers, car stereos, electrical accessories, and more all with genuine quality, honest pricing, and expert support you can rely on.
              </p>
              {[
                ["⚡","Wide range of LED lights, audio systems & electrical items"],
  ["🛡️","Genuine products with reliable quality assurance"],
  ["🔧","Expert advice & professional installation support"],
  ["💰","Honest pricing with zero hidden charges"],
              ].map(([icon,text])=>(
                <div key={text} className="feat">
                  <div className="feat-icon">{icon}</div>
                  <span style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"var(--ink2)", fontWeight:400, paddingTop:7 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </W>
      </section>

      {/* ── PRODUCTS ── */}
      <section id="products" className="sec" style={{ background:"var(--canvas)", borderTop:"1px solid var(--line)", padding:"100px 0" }}>
        <W>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div className="s-tag" style={{ justifyContent:"center", display:"flex" }}>What We Carry</div>
            <h2 className="disp" style={{ fontSize:"clamp(2rem,3vw,2.8rem)", marginBottom:14 }}>Our Product Range</h2>
            <p className="body-t" style={{ maxWidth:420, margin:"0 auto" }}>Everything electronics — curated for quality, reliability, and real value.</p>
          </div>
          <div className="products-grid" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
            {PRODUCTS.map(p => (
              <div key={p.name} className="p-card">
                <div style={{ fontSize:26, marginBottom:16, lineHeight:1 }}>{p.icon}</div>
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:19, color:"var(--ink)", marginBottom:6 }}>{p.name}</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:"var(--ink3)", lineHeight:1.7, fontWeight:300 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </W>
      </section>

      {/* ── GALLERY ── */}
      <section id="gallery" className="sec" style={{ background:"var(--white)", borderTop:"1px solid var(--line)", padding:"100px 0" }}>
        <W>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:36 }}>
            <div>
              <div className="s-tag">Inside Our Store</div>
              <h2 className="disp" style={{ fontSize:"clamp(2rem,3vw,2.8rem)" }}>A Look Inside</h2>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="g-btn" onClick={()=>setSlide(s=>(s-1+GALLERY.length)%GALLERY.length)}>‹</button>
              <button className="g-btn" onClick={()=>setSlide(s=>(s+1)%GALLERY.length)}>›</button>
            </div>
          </div>

          <div className="gallery-grid" style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:12 }}>
            {[0,1,2].map(off => {
              const item = GALLERY[(slide+off)%GALLERY.length];
              const big  = off===0;
              return (
                <div key={off} className="g-card" style={{ aspectRatio: big?"16/10":"1/1", display:"flex", flexDirection:"column", justifyContent:"flex-end", padding: big?28:20, position:"relative" }}>
                  <div style={{ position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-60%)", fontSize: big?64:38, opacity:.18, pointerEvents:"none", lineHeight:1 }}>{item.icon}</div>
                  <div>
                    <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize: big?18:14, color:"var(--ink)" }}>{item.label}</div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"var(--ink3)", marginTop:3, fontWeight:300 }}>{item.sub}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:18 }}>
            {GALLERY.map((_,i)=><div key={i} className={`dot-nav${i===slide?" on":""}`} onClick={()=>setSlide(i)} />)}
            <span style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"var(--ink4)", marginLeft:8, letterSpacing:".06em" }}>{slide+1} / {GALLERY.length}</span>
          </div>
        </W>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec" style={{ background:"var(--canvas)", borderTop:"1px solid var(--line)", padding:"100px 0" }}>
        <W>
          <div style={{ textAlign:"center", marginBottom:56 }}>
            <div className="s-tag" style={{ justifyContent:"center", display:"flex" }}>Visit Us</div>
            <h2 className="disp" style={{ fontSize:"clamp(2rem,3vw,2.8rem)" }}>Come Say Hello</h2>
          </div>
          <div className="contact-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1.5fr", gap:40 }}>
            <div>
              {[
                ["📍","Address","Areacode, Malappuram, Kerala\nNear Jolly Hotel"],
                ["🕐","Hours","Open Daily\n10:00 AM – 9:00 PM"],
                ["📞","Phone",<a href="tel:+919895183365" style={{color:"var(--ink3)",textDecoration:"none"}}>Mobile: 9895183365</a>],
              ].map(([icon,title,text])=>(
                <div key={title} className="i-row">
                  <div style={{ width:38, height:38, borderRadius:"8px", border:"1px solid var(--line)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0, background:"var(--canvas2)" }}>{icon}</div>
                  <div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontWeight:600, fontSize:13, letterSpacing:".06em", textTransform:"uppercase", color:"var(--ink2)", marginBottom:4 }}>{title}</div>
                    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:13, color:"var(--ink3)", lineHeight:1.65, fontWeight:300, whiteSpace:"pre-line" }}>{text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div style={{ borderRadius:"16px", background:"var(--canvas2)", border:"1px solid var(--line)", height:320, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:14, position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(var(--line) 1px,transparent 1px),linear-gradient(90deg,var(--line) 1px,transparent 1px)", backgroundSize:"30px 30px" }} />
              <div style={{ position:"relative", zIndex:2, textAlign:"center" }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:"var(--ink)", margin:"0 auto 12px", boxShadow:"0 0 0 6px rgba(14,14,14,.12)" }} />
                <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:18, color:"var(--ink)" }}>Aptech Electronics</div>
                <div style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"var(--ink3)", marginTop:4, marginBottom:18 }}>Areacode, Kerala, India</div>
                <a href="https://maps.google.com/?q=Aptech+Electronics+Kerala+India" target="_blank" rel="noreferrer"
                  style={{ display:"inline-flex", alignItems:"center", gap:6, background:"var(--ink)", color:"var(--canvas)", borderRadius:"6px", padding:"9px 20px", fontFamily:"'Jost',sans-serif", fontSize:12, fontWeight:500, letterSpacing:".06em", textTransform:"uppercase", textDecoration:"none" }}>
                  Open in Maps ↗
                </a>
              </div>
            </div>
          </div>
        </W>
      </section>

      {/* ── FOOTER ──   */}
<footer style={{ background:"var(--footer-bg)", padding:"56px 40px 32px" }}>
  <div style={{ maxWidth:1080, margin:"0 auto", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
      <div style={{ width:32, height:32, background:"rgba(255,255,255,.1)", borderRadius:"6px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:15 }}>⚡</div>
      <div style={{ fontFamily:"'Cormorant Garamond',serif", fontWeight:600, fontSize:20, color:"var(--footer-text)", letterSpacing:"-.01em" }}>Aptech Electronics</div>
    </div>

    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, fontWeight:500, letterSpacing:".1em", textTransform:"uppercase", color:"rgba(255,255,255,.3)", marginBottom:8 }}>
      Electronics
    </div>

    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:14, color:"rgba(255,255,255,.4)", fontWeight:300, marginBottom:32 }}>
      Your Trusted Electronics Store in Areacode
    </div>

    <div style={{ borderTop:"1px solid rgba(255,255,255,.08)", width:"100%", maxWidth:480, margin:"0 auto 24px" }} />

    <div style={{ display:"flex", gap:32, flexWrap:"wrap", justifyContent:"center", marginBottom:20 }}>
      {["🕐 Open Daily  10 AM – 9 PM","📞 9895183365"].map(t => (
        <span key={t} style={{ fontFamily:"'Jost',sans-serif", fontSize:12, color:"rgba(255,255,255,.28)", fontWeight:300, letterSpacing:".04em" }}>
          {t.includes("📞") ? (
            <a href="tel:+919895183365" style={{ color:"inherit", textDecoration:"none" }}>
              {t}
            </a>
          ) : (
            t
          )}
        </span>
      ))}
    </div>

    <div style={{ fontFamily:"'Jost',sans-serif", fontSize:11, color:"rgba(255,255,255,.18)", letterSpacing:".06em" }}>
      © 2026 Aptech Electronics. All rights reserved.
    </div>
  </div>
</footer>

      {/* ── STICKY CTAs ── */}
      <div style={{ position:"fixed", bottom:22, right:22, zIndex:999, display:"flex", flexDirection:"column", gap:8 }}>
        <a href="tel:+919895183365" className="s-call">
          📞 <span className="cta-label">Call Us</span>
        </a>
        <a href="https://wa.me/919895183365" target="_blank" rel="noreferrer" className="s-wa">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          <span className="cta-label">WhatsApp</span>
        </a>
      </div>
    </>
  );
}
