import { useEffect, useRef, useState, useCallback } from "react";
import "./styles/zenwair.css";
import LOGO from "./LOGO.png";
import product1 from "./product1.webp";
import product2 from "./product2.webp";
import product3 from "./product3.webp";
import product4 from "./product4.webp";
import product5 from "./product5.webp";
import product6 from "./product6.webp";
import heroVideo from "./video.mp4";
import { joinWaitlist } from "./waitlist";

/* ─── Icons ─────────────────────────────────────────────────────────────── */
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconArrow = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const IconZoom = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
  </svg>
);
const IconTwitter = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IconInstagram = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

/* ─── Notify Modal ───────────────────────────────────────────────────────── */
function NotifyModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);

  const submit = useCallback(async e => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    const result = await joinWaitlist(email, "notify-modal");
    if (result.success) {
      setStatus("success");
    } else {
      setStatus("error");
      setErrMsg(result.error || "Something went wrong. Please try again.");
    }
  }, [email]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}>
      {/* Backdrop */}
      <div style={{ position: "absolute", inset: 0, backdropFilter: "blur(28px) saturate(150%) brightness(0.55)", background: "rgba(10,10,10,0.5)" }} />
      {/* Card */}
      <div style={{
        position: "relative", zIndex: 1, background: "#fff",
        borderRadius: 24, padding: "48px 44px", maxWidth: 440, width: "90vw",
        animation: "modalIn 0.4s cubic-bezier(0.34,1.4,0.64,1) forwards",
        boxShadow: "0 40px 100px rgba(0,0,0,0.3)",
      }} onClick={e => e.stopPropagation()}>
        {/* Close */}
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 34, height: 34, borderRadius: "50%", background: "#f0ede8", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "#111" }}>
          <IconClose />
        </button>

        {status === "success" ? (
          <div style={{ textAlign: "center", padding: "16px 0" }}>
            {/* Checkmark */}
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "#f0ede8", border: "2px solid rgba(17,17,17,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 22px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12" /></svg>
            </div>
            <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", letterSpacing: "0.08em", color: "#111", marginBottom: 10 }}>YOU ARE IN!</div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.08rem", color: "#6b6860", lineHeight: 1.75, marginBottom: 22 }}>
              Thank you for contacting Zenwair ✦ We will be live soon.<br />Watch your inbox for early access news.
            </p>
            <a href="https://www.instagram.com/zenwair?igsh=anlmOGlvNGllcm54" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ textDecoration: "none", justifyContent: "center" }}>
              Follow on Instagram <IconInstagram />
            </a>
          </div>
        ) : (
          <>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.28em", textTransform: "uppercase", color: "#9e9a92", marginBottom: 12 }}>Early Access</div>
            <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "2.2rem", fontWeight: 500, color: "#111", lineHeight: 1.05, marginBottom: 10 }}>
              Be the first to<br /><em style={{ color: "#9e9a92" }}>wear the calm</em>
            </div>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1rem", color: "#9e9a92", lineHeight: 1.8, marginBottom: 28 }}>
              Drop your email and we'll notify you the moment Zenwair goes live — with exclusive founding perks.
            </p>
            <form onSubmit={submit}>
              <input
                type="email" required placeholder="your@email.com" value={email}
                onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
                style={{ width: "100%", background: "#f0ede8", border: "1.5px solid rgba(17,17,17,0.12)", borderRadius: 999, padding: "13px 20px", fontFamily: "'Inter',sans-serif", fontSize: "0.88rem", color: "#111", outline: "none", marginBottom: 12, boxSizing: "border-box", transition: "border-color 0.2s" }}
                onFocus={e => e.target.style.borderColor = "#111"}
                onBlur={e => e.target.style.borderColor = "rgba(17,17,17,0.12)"}
              />
              {status === "error" && (
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.75rem", color: "#c0392b", marginBottom: 10, paddingLeft: 4 }}>{errMsg}</div>
              )}
              <button type="submit" className="btn-primary" disabled={status === "loading"}
                style={{ width: "100%", justifyContent: "center", opacity: status === "loading" ? 0.7 : 1 }}>
                {status === "loading" ? "Saving..." : "Notify Me When Live "}
              </button>
            </form>
            <div style={{ textAlign: "center", marginTop: 12, fontFamily: "'Inter',sans-serif", fontSize: "0.67rem", color: "#9e9a92" }}>No spam. Unsubscribe any time.</div>
          </>
        )}
      </div>
    </div>
  );
}



function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("in");

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const raf = requestAnimationFrame(function tick() {
      const p = Math.min((Date.now() - start) / duration, 1);
      setProgress(Math.round(p * 100));
      if (p < 1) requestAnimationFrame(tick);
      else { setPhase("out"); setTimeout(onDone, 800); }
    });
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 99999,
      background: "#fafaf8",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      transition: phase === "out" ? "opacity 0.8s ease, transform 0.8s ease" : "none",
      opacity: phase === "out" ? 0 : 1,
      transform: phase === "out" ? "scale(1.02)" : "scale(1)",
      pointerEvents: phase === "out" ? "none" : "auto",
    }}>
      {/* Decorative rings */}
      <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(17,17,17,0.08)", animation: "pulseRing 2.2s ease-out infinite" }} />
      <div style={{ position: "absolute", width: 220, height: 220, borderRadius: "50%", border: "1px solid rgba(17,17,17,0.05)", animation: "pulseRing 2.2s ease-out 0.6s infinite" }} />

      {/* Logo circle */}
      <div style={{
        width: 130, height: 130, borderRadius: "50%",
        background: "#f0ede8",
        border: "1px solid rgba(17,17,17,0.12)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: 30,
        animation: "logoReveal 0.9s cubic-bezier(0.34,1.4,0.64,1) forwards, logoFloat 3.5s ease-in-out 0.9s infinite",
        boxShadow: "0 8px 40px rgba(17,17,17,0.08)",
      }}>
        <img src={LOGO} alt="ZENWAIR" style={{ width: 90, height: 90, objectFit: "contain", borderRadius: 6 }} />
      </div>

      {/* Name */}
      <div style={{
        fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem",
        letterSpacing: "0.2em", color: "#111",
        marginBottom: 8,
        animation: "logoReveal 0.8s ease 0.15s forwards", opacity: 0,
      }}>
        ZENWAIR
      </div>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
        fontSize: "0.95rem", color: "#888880",
        letterSpacing: "0.1em", marginBottom: 52,
        animation: "logoReveal 0.8s ease 0.3s forwards", opacity: 0,
      }}>
        Stay Calm · Stay Zen
      </div>

      {/* Progress */}
      <div style={{ width: 200, height: 1.5, background: "rgba(17,17,17,0.1)", borderRadius: 99, overflow: "hidden", animation: "logoReveal 0.5s ease 0.5s forwards", opacity: 0 }}>
        <div style={{ height: "100%", background: "#111", width: `${progress}%`, transition: "width 0.05s linear", borderRadius: 99 }} />
      </div>
      <div style={{ marginTop: 12, fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", color: "#bbb8b0", textTransform: "uppercase", animation: "logoReveal 0.5s ease 0.6s forwards", opacity: 0 }}>
        {progress}%
      </div>
    </div>
  );
}

/* ─── Ticker ─────────────────────────────────────────────────────────────── */
const TICKER_ITEMS = ["Stay Calm", "Stay Zen", "New Arrivals Coming", "Indian Craft", "Handwoven", "Launching Soon", "Mindful Fashion", "Made in India", "Upcoming Collection"];
function Ticker() {
  const all = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="ticker-wrap" style={{ background: "#111", padding: "9px 0", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
      <div className="ticker-inner">
        {all.map((t, i) => (
          <span className="ticker-item" key={i} style={{ color: "rgba(255,255,255,0.5)" }}>
            {t}<span style={{ color: "rgba(255,255,255,0.22)", fontSize: "0.55rem" }}>—</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Animated Headline ───────────────────────────────────────────────────── */
function AnimatedHeadline({ text, delay = 0 }) {
  let ci = 0;
  return (
    <span>
      {text.split(" ").map((word, wi, arr) => (
        <span key={wi} style={{ display: "inline-block", marginRight: wi < arr.length - 1 ? "0.2em" : 0 }}>
          {word.split("").map(ch => {
            const d = (delay + ci++ * 0.035).toFixed(3);
            return (
              <span key={ch + ci} style={{ display: "inline-block", animation: "charIn 0.6s ease forwards", animationDelay: `${d}s`, opacity: 0 }}>
                {ch}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}

/* ─── Image Modal ─────────────────────────────────────────────────────────── */
function ImageModal({ item, onClose }) {
  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", h); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-blur-bg" />
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-img-wrap">
          <img src={item.img} alt={item.name} loading="lazy" decoding="async" />
          <button className="modal-close-btn" onClick={onClose}><IconClose /></button>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.5) 0%,transparent 55%)" }} />
        </div>
        <div className="modal-body">
          <div className="modal-tag">{item.sub}</div>
          <div className="modal-title">{item.name}</div>
          <p className="modal-desc">{item.desc}</p>
          <div className="modal-coming">Upcoming — Launching Soon</div>
        </div>
      </div>
    </div>
  );
}

/* ─── Catalogue Card ─────────────────────────────────────────────────────── */
function CatalogueCard({ img, name, sub, tag, desc, delay }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="cat-card reveal" style={{ animationDelay: `${delay}s` }} onClick={() => setOpen(true)}>
        <img src={img} alt={name} loading="lazy" decoding="async" />
        <div className="cat-overlay" />
        <div className="cat-zoom-icon"><IconZoom /></div>
        <div className="cat-info">
          <div className="cat-tag">{tag}</div>
          <div className="cat-name">{name}</div>
          <div className="cat-sub">{sub}</div>
        </div>
      </div>
      {open && <ImageModal item={{ img, name, sub, desc }} onClose={() => setOpen(false)} />}
    </>
  );
}

/* ─── Model Showcase ─────────────────────────────────────────────────────── */
const MODELS = [
  { img: product2, num: "01", name: "CALM CO-ORD", sub: "Breathable Summer Set", desc: "Lightweight cotton with subtle block-print detailing for the Indian summer.", color: "#e17055" },
  { img: product3, num: "02", name: "BLACK OUTFIT ", sub: "Artisan Wool Wrap", desc: "Inspired by new Drip that embraces imperfection.", color: "#00b894" },
  { img: product6, num: "03", name: "COTTON POLO", sub: "Cotton Polo T-Shirt", desc: "A premium cotton polo t-shirt crafted for comfort and timeless Indian style.", color: "#e84393" },
  { img: product4, num: "04", name: "WARM ORANGE T-SHIRT", sub: "Contemporary Fusion", desc: "Where Indian tradition meets modern cut. Heritage on today's silhouette.", color: "#f39c12" },
  { img: product1, num: "05", name: "WHITE COTTON T-SHIRT", sub: "Minimalist Handloom", desc: "Crafted from pure handwoven . Simple silhouettes, timeless wear.", color: "#6c5ce7" },
  { img: product5, num: "06", name: "POLO CLASSIC", sub: "Cotton Polo T-Shirt", desc: "A versatile cotton polo t-shirt blending classic polo heritage with Indian craftsmanship.", color: "#00cec9" },
];

function ModelShowcase() {
  const ref = useRef(null);
  const [idx, setIdx] = useState(0);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const total = ref.current.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      const perSlide = 1 / MODELS.length;
      const newIdx = Math.min(MODELS.length - 1, Math.floor(p / perSlide));
      setIdx(newIdx);
      setProg((p - newIdx * perSlide) / perSlide);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const m = MODELS[idx];
  return (
    <div ref={ref} className="showcase-wrap">
      <div className="showcase-sticky">
        {MODELS.map((mo, i) => (
          <div key={i} className="showcase-slide" style={{ opacity: i === idx ? 1 : 0, zIndex: i === idx ? 2 : 1, pointerEvents: i === idx ? "auto" : "none", transition: "opacity 0.65s ease" }}>
            <div className="showcase-img-wrap">
              <img src={mo.img} alt={mo.name} loading="lazy" decoding="async" className="showcase-img" style={{ transform: i === idx ? `scale(${1 + prog * 0.05})` : "scale(1.04)" }} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(250,250,248,0.3) 0%,transparent 60%)" }} />
              <div style={{ position: "absolute", bottom: 20, left: 20, fontFamily: "'Inter',sans-serif", fontSize: "0.55rem", fontWeight: 500, letterSpacing: "0.22em", color: "rgba(255,255,255,0.5)" }}>
                {mo.num} / 0{MODELS.length}
              </div>
            </div>
            {/* Info panel */}
            <div className="showcase-info">
              <div className="showcase-ghost-num" style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: "22vw", lineHeight: 1, color: "rgba(17,17,17,0.04)", userSelect: "none", pointerEvents: "none" }}>{mo.num}</div>
              <div style={{ position: "absolute", top: 40, right: 40, width: 140, height: 140, borderRadius: "50%", background: mo.color, opacity: 0.08, filter: "blur(50px)", pointerEvents: "none" }} />
              <div style={{ opacity: i === idx ? 1 : 0, transform: i === idx ? "translateY(0)" : "translateY(20px)", transition: "opacity 0.7s ease 0.1s, transform 0.7s ease 0.1s" }}>
                <div style={{ display: "inline-block", padding: "4px 14px", borderRadius: 999, background: `${mo.color}18`, border: `1px solid ${mo.color}40`, fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.2em", color: mo.color, textTransform: "uppercase", marginBottom: 16 }}>
                  {mo.sub}
                </div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.6rem,4vw,4rem)", fontWeight: 400, color: "#111", lineHeight: 1.0, marginBottom: 14 }}>
                  {mo.name}
                </div>
                <div style={{ width: 28, height: 2, background: mo.color, borderRadius: 99, marginBottom: 14, opacity: 0.7 }} />
                <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "clamp(0.88rem,1.5vw,1.08rem)", color: "#888880", lineHeight: 1.75, maxWidth: 320, marginBottom: 24 }}>
                  {mo.desc}
                </p>
                <button className="btn-outline" style={{ borderColor: `${mo.color}50`, color: mo.color, background: `${mo.color}10`, fontSize: "0.7rem", padding: "10px 24px" }}
                  onClick={() => document.dispatchEvent(new CustomEvent('open-notify'))}
                >
                  Notify Me
                </button>
              </div>
              {/* Progress dots */}
              <div className="showcase-dots">
                {MODELS.map((_, di) => (
                  <div key={di} style={{ width: di === idx ? 20 : 6, height: 6, borderRadius: 99, background: di === idx ? m.color : "rgba(17,17,17,0.12)", transition: "width 0.4s ease, background 0.4s ease" }} />
                ))}
              </div>
            </div>
          </div>
        ))}
        <div style={{ position: "absolute", top: 20, left: 20, fontFamily: "'Inter',sans-serif", fontSize: "0.52rem", fontWeight: 600, letterSpacing: "0.26em", color: "rgba(17,17,17,0.2)", zIndex: 10, textTransform: "uppercase" }}>
          The Collection
        </div>
        {idx === 0 && prog < 0.35 && (
          <div style={{ position: "absolute", bottom: 24, right: 36, display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 10, opacity: Math.max(0, 1 - prog * 3) }}>
            <div style={{ fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(17,17,17,0.2)", fontFamily: "'Inter',sans-serif", textTransform: "uppercase" }}>Scroll</div>
            <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom,#111,transparent)", animation: "scrollPulse 1.5s ease-in-out infinite" }} />
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── Main App ────────────────────────────────────────────────────────────── */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  // Global event bus: any button can fire 'open-notify' to open the waitlist modal
  useEffect(() => {
    const openModal = () => setShowModal(true);
    document.addEventListener("open-notify", openModal);
    return () => document.removeEventListener("open-notify", openModal);
  }, []);

  useEffect(() => {
    if (loading) return;
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(entries => entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
    }), { threshold: 0.01, rootMargin: "0px 0px -40px 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, [loading]);

  return (
    <>
      {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      {showModal && <NotifyModal onClose={() => setShowModal(false)} />}

      {/* ── TICKER (dark bar) ── */}
      <Ticker />

      {/* ── NAVBAR — transparent over hero, dark blur on scroll ── */}
      <nav style={{
        position: "fixed", left: 0, right: 0, zIndex: 1000, height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 5%",
        transition: "box-shadow 0.45s ease, top 0.45s ease",
        background: "transparent",
        backdropFilter: "none",
        boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.08)" : "none",
        top: scrolled ? 0 : 34,
      }}>
        <a href="#hero" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src={LOGO}
            alt="ZENWAIR"
            className="nav-logo"
            style={{ height: 72, width: "auto", objectFit: "contain", display: "block", borderRadius: 8 }}
          />
        </a>
        <ul className="nav-links" style={{ display: "flex", gap: 38, listStyle: "none" }}>
          {["Collection", "Story", "Craft", "Contact"].map(l => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="nav-link" style={{ color: "rgba(255,255,255,0.55)" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.55)"}>{l}</a>
            </li>
          ))}
        </ul>
        {/* Hamburger — mobile only */}
        <button className="hamburger-btn" onClick={() => setShowNav(true)} aria-label="Open menu">
          <span /><span /><span />
        </button>
        <button className="btn-white nav-notify-btn" style={{ padding: "9px 24px", fontSize: "0.75rem" }} onClick={() => setShowModal(true)}>Notify Me</button>
      </nav>

      {/* ── MOBILE NAV OVERLAY ── */}
      {showNav && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 2000,
          background: "rgba(10,10,10,0.92)",
          backdropFilter: "blur(18px)",
          display: "flex", flexDirection: "column",
          justifyContent: "center", alignItems: "flex-start",
          padding: "60px 10%",
          animation: "fadeUp 0.3s ease",
        }}>
          {/* Close button */}
          <button
            onClick={() => setShowNav(false)}
            style={{
              position: "absolute", top: 22, right: 22,
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: 999, width: 40, height: 40,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "#fff", fontSize: "1.2rem",
            }}
          >✕</button>

          {/* Nav links */}
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 28 }}>
            {["Collection", "Story", "Craft", "Contact"].map(l => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  onClick={() => setShowNav(false)}
                  style={{
                    fontFamily: "'Cormorant Garamond',serif",
                    fontSize: "clamp(2.2rem, 8vw, 3.5rem)",
                    fontWeight: 400, color: "rgba(255,255,255,0.85)",
                    textDecoration: "none", letterSpacing: "0.04em",
                    display: "block",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.color = "#fff"}
                  onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.85)"}
                >{l}</a>
              </li>
            ))}
          </ul>

          {/* Notify button */}
          <button
            className="btn-white"
            style={{ marginTop: 48, padding: "12px 32px", fontSize: "0.78rem" }}
            onClick={() => { setShowNav(false); setShowModal(true); }}
          >Notify Me</button>

          {/* Scroll to Top button */}
          <button
            onClick={() => {
              setShowNav(false);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            style={{
              marginTop: 16,
              display: "flex", alignItems: "center", gap: 10,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 999,
              padding: "11px 28px",
              color: "rgba(255,255,255,0.55)",
              fontFamily: "'Inter',sans-serif",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.2s, color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.12)";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              e.currentTarget.style.color = "rgba(255,255,255,0.55)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
            Back to Top
          </button>

          {/* Brand tagline */}
          <div style={{
            position: "absolute", bottom: 36, left: "10%",
            fontFamily: "'Inter',sans-serif", fontSize: "0.52rem",
            letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)",
            textTransform: "uppercase",
          }}>Stay Calm · Stay Zen</div>
        </div>
      )}

      {/* ── HERO — dark video section ── */}
      <section id="hero" style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: 100 }}>
        <video src={heroVideo} autoPlay muted loop playsInline style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", filter: "brightness(0.6) saturate(0.85)", zIndex: 0,
        }} />
        <div style={{ position: "absolute", inset: 0, zIndex: 1, background: "linear-gradient(180deg,rgba(10,10,10,0.5) 0%,rgba(10,10,10,0.65) 100%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2, height: "18%", background: "linear-gradient(to top,rgba(237,233,227,0.25),transparent)" }} />

        <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 5%", maxWidth: 920, margin: "0 auto" }}>
          {/* Badge */}
          <div style={{
            display: "inline-flex", alignItems: "center",
            padding: "5px 18px", marginBottom: 28, borderRadius: 999,
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.25)",
            fontFamily: "'Inter',sans-serif", fontSize: "0.6rem", fontWeight: 500,
            letterSpacing: "0.24em", color: "rgba(255,255,255,0.75)", textTransform: "uppercase",
            animation: "fadeUp 0.7s ease forwards", backdropFilter: "blur(8px)",
          }}>
            Indian Clothing — Est. 2026
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Bebas Neue',sans-serif", fontWeight: 400,
            fontSize: "clamp(5rem,14vw,13rem)", lineHeight: 0.9, letterSpacing: "0.06em",
            color: "#fff", marginBottom: 22,
          }}>
            <AnimatedHeadline text="ZENWAIR" delay={0.2} />
          </h1>

          {/* Tagline */}
          <div style={{
            fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.1rem,2.5vw,1.8rem)",
            fontStyle: "italic", color: "rgba(255,255,255,0.6)",
            letterSpacing: "0.02em", marginBottom: 52,
            animation: "fadeUp 0.8s ease 0.9s forwards", opacity: 0,
          }}>
            Stay Calm &nbsp;·&nbsp; Stay Zen
          </div>

          {/* CTAs */}
          <div className="hero-btns" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", animation: "fadeUp 0.8s ease 1.2s forwards", opacity: 0 }}>
            <button className="btn-white" onClick={() => document.getElementById('craft')?.scrollIntoView({ behavior: 'smooth' })}>Explore Collection <IconArrow /></button>
            <button className="btn-white-outline" onClick={() => setShowModal(true)}>Get Early Access</button>
          </div>

          {/* Upcoming labels */}
          <div style={{ display: "flex", gap: 48, justifyContent: "center", flexWrap: "wrap", marginTop: 68, animation: "fadeUp 0.8s ease 1.6s forwards", opacity: 0 }}>
            {[["New Drops", "Upcoming Soon"], ["Collection", "Launching 2026"], ["Limited Edition", "Exclusive Pieces"]].map(([h, s]) => (
              <div key={h} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.12rem", fontWeight: 500, color: "#fff", marginBottom: 4 }}>{h}</div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.57rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.18em", textTransform: "uppercase" }}>{s}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)", zIndex: 3, display: "flex", flexDirection: "column", alignItems: "center", gap: 10, animation: "fadeUp 0.8s ease 2s forwards", opacity: 0 }}>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.5rem", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Scroll</div>
          <div style={{ width: 1, height: 48, background: "linear-gradient(to bottom,rgba(255,255,255,0.6),transparent)", animation: "scrollPulse 1.5s ease-in-out infinite" }} />
        </div>
      </section>

      {/* ── MODEL SHOWCASE — light bg ── */}
      <section id="collection" style={{ background: "#fafaf8" }}>
        <ModelShowcase />
      </section>

      {/* ── CATALOGUE GRID — cream ── */}
      <section id="craft" style={{ background: "var(--bg2,#e0d9cf)", padding: "100px 5%", borderTop: "1px solid rgba(17,17,17,0.08)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="section-label">The Catalogue</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.2rem,4vw,3.8rem)", fontWeight: 400, color: "#111", lineHeight: 1.05 }}>
                Zenwair <em style={{ color: "#888880" }}>Collection</em>
              </h2>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#bbb8b0", marginBottom: 8 }}>Tap any piece to explore</div>
              <button className="btn-outline" style={{ fontSize: "0.72rem", padding: "9px 22px" }}
                onClick={() => document.dispatchEvent(new CustomEvent('open-notify'))}>
                All Pieces <IconArrow />
              </button>
            </div>
          </div>
          <div className="catalogue-grid">
            {[
              { img: product1, name: "White cotton T-shirt", sub: "Khadi Cotton", tag: "Signature", desc: "Crafted from pure handwoven khadi. Minimal silhouette for the modern Indian soul.", delay: 0 },
              { img: product2, name: "Calm Co-ord", sub: "Block Print Set", tag: "Summer", desc: "Lightweight breathable cotton with subtle block-print detailing.", delay: 0.08 },
              { img: product3, name: "Black cotton T-shirt", sub: "Handspun Wool", tag: "Artisan", desc: "Inspired by new Drip that embraces imperfection.", delay: 0.16 },
              { img: product4, name: "Warm orange T-shirt", sub: "Contemporary", tag: "New", desc: "Heritage fabric meets modern cut. Tradition in today's silhouette.", delay: 0.24 },
              { img: product5, name: "Polo Classic", sub: "Cotton Polo T-Shirt", tag: "New", desc: "A versatile cotton polo t-shirt blending classic polo heritage with Indian craftsmanship.", delay: 0.32 },
              { img: product6, name: "Cotton Polo", sub: "Cotton Polo T-Shirt", tag: "New", desc: "A premium cotton polo t-shirt crafted for comfort and timeless Indian style.", delay: 0.40 },
            ].map(p => <CatalogueCard key={p.name} {...p} />)}
          </div>
        </div>
      </section>

      {/* ── STORY — light ── */}
      <section id="story" style={{ padding: "120px 5%", background: "#e3dccf", borderTop: "1px solid rgba(17,17,17,0.08)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="story-grid reveal" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
            <div>
              <div className="section-label">Our Story</div>
              <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,3.8vw,3.4rem)", fontWeight: 400, color: "#111", lineHeight: 1.1, marginBottom: 24 }}>
                Born from<br /><em style={{ color: "#888880" }}>Indian Stillness</em>
              </h2>
              <div style={{ width: 32, height: 1.5, background: "#111", marginBottom: 24, borderRadius: 99 }} />
              <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.12rem", color: "#888880", lineHeight: 1.85, marginBottom: 18 }}>
                ZENWAIR was born in the quiet lanes of a small Indian town, where artisans still weave cloth by hand and morning chai comes with a side of stillness.
              </p>
              <p style={{ fontSize: "0.84rem", fontFamily: "'Inter',sans-serif", fontWeight: 300, color: "#bbb8b0", lineHeight: 1.9, marginBottom: 36 }}>
                We believe fashion should breathe. Every piece we make is slow — considered, crafted, and consciously designed to let you move through life with ease.
              </p>
              <button className="btn-primary" onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}>Read Full Story <IconArrow /></button>
            </div>
            <div style={{ position: "relative" }}>
              <img src={product1} alt="Our Story" loading="lazy" decoding="async" style={{ width: "100%", display: "block", objectFit: "cover", maxHeight: 600, borderRadius: 20, border: "1px solid rgba(17,17,17,0.08)", boxShadow: "0 24px 64px rgba(17,17,17,0.1)" }} />
              <div style={{ position: "absolute", bottom: -20, left: -20, background: "#fff", border: "1px solid rgba(17,17,17,0.1)", borderRadius: 16, padding: "22px 24px", maxWidth: 230, boxShadow: "0 12px 40px rgba(17,17,17,0.1)", animation: "floatBadge 4s ease-in-out infinite" }}>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1rem", fontStyle: "italic", color: "#888880", lineHeight: 1.65 }}>
                  "Wear what<br />lets you breathe."
                </div>
                <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", letterSpacing: "0.14em", color: "#bbb8b0", marginTop: 10, textTransform: "uppercase" }}>Zenwair, 2026</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES — cream ── */}
      <section style={{ padding: "100px 5%", background: "#d0c9bd", borderTop: "1px solid rgba(17,17,17,0.08)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div className="section-label">Why Zenwair</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,3.8vw,3.4rem)", fontWeight: 400, color: "#111", lineHeight: 1.1 }}>
              Crafted with <em>Intention</em>
            </h2>
          </div>
          <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { num: "01", title: "Handwoven Fabric", accent: "#6c5ce7", desc: "Every thread sourced from village weavers across Rajasthan, Bengal, and Varanasi. We pay fair. We care." },
              { num: "02", title: "Slow Fashion", accent: "#e17055", desc: "We make limited runs. No excess, no waste. Each piece is considered before it is cut." },
              { num: "03", title: "Mindful Design", accent: "#00b894", desc: "Silhouettes that breathe with you. Inspired by Indian ease, shaped by modern minimalism." },
            ].map(({ num, title, accent, desc }) => (
              <div key={num} className="value-card reveal">
                <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.5rem", lineHeight: 1, color: "rgba(17,17,17,0.06)", marginBottom: 14 }}>{num}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.28rem", fontWeight: 500, color: "#111", marginBottom: 14 }}>{title}</h3>
                <div style={{ width: 28, height: 2, background: accent, borderRadius: 99, marginBottom: 18, opacity: 0.7 }} />
                <p style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: "0.83rem", color: "#888880", lineHeight: 1.9 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMING SOON — editorial grid ── */}
      <section style={{ background: "#111", padding: "0", borderTop: "4px solid #111" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "100px 5%" }}>
          <div className="reveal" style={{ textAlign: "center", marginBottom: 60 }}>
            <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 14 }}>Arriving Next</div>
            <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.4rem,5vw,5rem)", fontWeight: 400, lineHeight: 1.0, marginBottom: 0 }}>
              <span className="shimmer-text">Coming Soon</span>
            </h2>
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(255,255,255,0.4)", lineHeight: 1.75, maxWidth: 480, margin: "18px auto 0" }}>
              The next chapter in Zenwair handcrafted fashion is being woven. Slowly. Deliberately.
            </p>
          </div>

          {/* 2-column editorial grid */}
          <div className="cs-grid reveal">
            {/* Left — large feature image */}
            <div style={{ background: "#1a1a1a", padding: "48px 40px" }}>
              <div className="cs-card-img" style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden", borderRadius: 14, background: "#222" }}>
                <img src={product2} alt="Coming Soon" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(30%)", transition: "transform 0.7s ease, filter 0.5s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.04)"; e.currentTarget.style.filter = "grayscale(0%)"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "grayscale(30%)"; }}
                />
                <div style={{ position: "absolute", top: 16, left: 16, padding: "6px 16px", borderRadius: 999, background: "rgba(17,17,17,0.75)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", fontFamily: "'Inter',sans-serif", fontSize: "0.56rem", fontWeight: 600, letterSpacing: "0.18em", color: "#fff", textTransform: "uppercase" }}>Preview</div>
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(26,26,26,0.8) 0%,transparent 60%)" }} />
                <div style={{ position: "absolute", bottom: 20, left: 20, right: 20 }}>
                  <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.5rem", color: "#fff", fontWeight: 400 }}>Calm Co-ord</div>
                  <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.65rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.08em", marginTop: 4 }}>Block Print Set · Summer 2026</div>
                </div>
              </div>
            </div>

            {/* Right — 2 stacked cards + info */}
            <div style={{ background: "#1a1a1a", padding: "48px 40px", display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Info text */}
              <div>
                <div style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(1.6rem,2.5vw,2.4rem)", color: "#fff", fontWeight: 400, lineHeight: 1.1, marginBottom: 16 }}>
                  Handcrafted pieces,<br /><em style={{ color: "rgba(255,255,255,0.4)" }}>arriving very soon</em>
                </div>
                <div style={{ display: "flex", gap: 24, marginBottom: 24, flexWrap: "wrap" }}>
                  {[["04", "Pieces"], ["100%", "Handmade"], ["2026", "Launch"]].map(([val, lab]) => (
                    <div key={val}>
                      <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "2rem", color: "#fff", lineHeight: 1 }}>{val}</div>
                      <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.16em", textTransform: "uppercase", marginTop: 4 }}>{lab}</div>
                    </div>
                  ))}
                </div>
                <button className="btn-white" style={{ fontSize: "0.75rem", padding: "11px 28px" }} onClick={() => setShowModal(true)}>Get Early Access</button>
              </div>

              {/* 2 mini images */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1 }}>
                {[product3, product4].map((img, i) => (
                  <div key={i} style={{ position: "relative", borderRadius: 12, overflow: "hidden", background: "#222" }}>
                    <img src={img} alt="preview" loading="lazy" decoding="async" style={{ width: "100%", height: "100%", objectFit: "cover", minHeight: 160, filter: "grayscale(25%)", transition: "transform 0.6s ease, filter 0.5s" }}
                      onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.filter = "grayscale(0%)"; }}
                      onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.filter = "grayscale(25%)"; }}
                    />
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.6) 0%,transparent 60%)" }} />
                    <div style={{ position: "absolute", bottom: 10, left: 12, fontFamily: "'Inter',sans-serif", fontSize: "0.55rem", color: "rgba(255,255,255,0.6)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{i === 0 ? "Wabi Shawl" : "Sutra Drape"}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* ── UPCOMING BANNER — dark section for contrast ── */}
      < section style={{ padding: "110px 5%", background: "#111", textAlign: "center", position: "relative", overflow: "hidden", borderTop: "1px solid rgba(255,255,255,0.06)" }
      }>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Bebas Neue',sans-serif", fontSize: "clamp(6rem,20vw,18rem)", color: "rgba(255,255,255,0.03)", userSelect: "none", pointerEvents: "none", whiteSpace: "nowrap" }}>
          UPCOMING
        </div>
        <div className="reveal" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: 14 }}>What is Next</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2.6rem,5.5vw,6rem)", fontWeight: 400, lineHeight: 1.0, marginBottom: 18 }}>
            <span style={{ color: "#fff" }}>New Collection</span><br />
            <span className="shimmer-text">Upcoming Soon</span>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.1rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.75, maxWidth: 480, margin: "0 auto 40px" }}>
            A new chapter in handcrafted Indian fashion is on its way. Slow, deliberate, and made to last a lifetime.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-white" onClick={() => setShowModal(true)}>Get Notified <IconArrow /></button>
            <button className="btn-white-outline" onClick={() => setShowModal(true)}>View Lookbook</button>
          </div>
        </div>
      </section >

      {/* ── CTA / NEWSLETTER — cream ── */}
      < section id="contact" style={{ padding: "120px 5%", background: "#ede9e3", borderTop: "1px solid rgba(17,17,17,0.08)", textAlign: "center" }}>
        <div className="reveal" style={{ maxWidth: 580, margin: "0 auto" }}>
          <div className="section-label">Join the Movement</div>
          <h2 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "clamp(2rem,4.5vw,3.8rem)", fontWeight: 400, color: "#111", lineHeight: 1.05, marginBottom: 14 }}>
            Be First to<br /><em style={{ color: "#888880" }}>Wear the Calm</em>
          </h2>
          <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "1.05rem", color: "#6b6860", lineHeight: 1.8, marginBottom: 46 }}>
            Get early access to new drops, artisan stories, and exclusive founding perks.
          </p>
          <button className="btn-primary" style={{ padding: "14px 44px", fontSize: "0.82rem" }} onClick={() => setShowModal(true)}>
            Join the Waitlist <IconArrow />
          </button>
          <div style={{ marginTop: 14, fontFamily: "'Inter',sans-serif", fontSize: "0.67rem", color: "#9e9a92", letterSpacing: "0.04em" }}>
            No spam. Unsubscribe anytime.
          </div>
        </div>
      </section >

      {/* ── FOOTER — dark ── */}
      < footer style={{ padding: "64px 5% 36px", background: "#111" }}>
        <div className="footer-cols" style={{ maxWidth: 1240, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 260 }}>
            <img src={LOGO} alt="ZENWAIR" style={{ height: 64, width: "auto", display: "block", marginBottom: 18, objectFit: "contain", borderRadius: 8 }} />
            <p style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "0.95rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.75, marginBottom: 22 }}>
              Stay Calm · Stay Zen<br />Indian clothing for the unhurried soul.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <a href="https://www.instagram.com/zenwair?igsh=anlmOGlvNGllcm54" target="_blank" rel="noopener noreferrer" aria-label="Instagram"
                style={{ width: 38, height: 38, borderRadius: "50%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", transition: "color 0.2s,border-color 0.2s,background 0.2s", textDecoration: "none" }}
                onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)"; e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; e.currentTarget.style.background = "rgba(255,255,255,0.06)"; }}
              ><IconInstagram /></a>
            </div>
          </div>
          {[
            {
              head: "Shop",
              links: [
                { label: "Zen Kurta", href: "#craft" },
                { label: "Calm Co-ord", href: "#craft" },
                { label: "Wabi Shawl", href: "#craft" },
                { label: "Deep tone orange", href: "#craft" },
                { label: "New Arrivals", notify: true },
              ]
            },
            {
              head: "Company",
              links: [
                { label: "Our Story", href: "#story" },
                { label: "Artisans", href: "#story" },
                { label: "Sustainability", href: "#story" },
                { label: "Careers", notify: true },
                { label: "Press", notify: true },
              ]
            },
            {
              head: "Help",
              links: [
                { label: "Sizing Guide", notify: true },
                { label: "Shipping", notify: true },
                { label: "Returns", notify: true },
                { label: "Contact Us", href: "#contact" },
                { label: "FAQ", notify: true },
              ]
            },
          ].map(({ head, links }) => (
            <div key={head}>
              <div style={{ fontFamily: "'Inter',sans-serif", fontSize: "0.58rem", fontWeight: 600, letterSpacing: "0.22em", color: "rgba(255,255,255,0.25)", marginBottom: 18, textTransform: "uppercase" }}>{head}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 11 }}>
                {links.map(({ label, href, notify }) => (
                  <li key={label}>
                    {notify ? (
                      <button
                        onClick={() => document.dispatchEvent(new CustomEvent('open-notify'))}
                        style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                        onMouseEnter={e => e.target.style.color = "#fff"}
                        onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
                      >{label}</button>
                    ) : (
                      <a href={href} style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: "0.82rem", color: "rgba(255,255,255,0.3)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = "#fff"}
                        onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.3)"}
                      >{label}</a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ maxWidth: 1240, margin: "44px auto 0", paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <div style={{ fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.04em" }}>
            2026 ZENWAIR. All rights reserved.
          </div>
          <div style={{ fontFamily: "'Cormorant Garamond',serif", fontStyle: "italic", fontSize: "0.85rem", color: "rgba(255,255,255,0.2)" }}>
            Stay Calm · Stay Zen
          </div>
        </div>
      </footer >
    </>
  );
}
