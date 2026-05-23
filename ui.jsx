/* ============================================================
   CammBot — shared UI atoms
   Exports to window for cross-file Babel scope.
   ============================================================ */

// ------------------------------------------------------------
// Icons (hand-drawn SVG, stroked, matches lucide vocabulary)
// ------------------------------------------------------------
const Icon = ({ children, size = 22, stroke = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={stroke}
    strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const IconBot = (props) => (
  <Icon {...props}>
    <rect x="4" y="8" width="16" height="12" rx="2"/>
    <path d="M12 4v4"/>
    <circle cx="12" cy="3" r="1"/>
    <circle cx="9" cy="13" r="1"/>
    <circle cx="15" cy="13" r="1"/>
    <path d="M9 17h6"/>
  </Icon>
);
const IconGlobe = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M3 12h18"/>
    <path d="M12 3a14 14 0 0 1 0 18"/>
    <path d="M12 3a14 14 0 0 0 0 18"/>
  </Icon>
);
const IconMessage = (props) => (
  <Icon {...props}>
    <path d="M21 12c0 4.4-4 8-9 8a10 10 0 0 1-3-.5L4 21l1.5-4A8 8 0 0 1 3 12c0-4.4 4-8 9-8s9 3.6 9 8z"/>
  </Icon>
);
const IconArrowRight = (props) => (
  <Icon size={18} {...props}>
    <path d="M5 12h14"/><path d="M13 5l7 7-7 7"/>
  </Icon>
);
const IconArrowDown = (props) => (
  <Icon size={18} {...props}>
    <path d="M12 5v14"/><path d="M5 13l7 7 7-7"/>
  </Icon>
);
const IconCopy = (props) => (
  <Icon size={14} {...props}>
    <rect x="9" y="9" width="11" height="11" rx="2"/>
    <path d="M5 15V5a2 2 0 0 1 2-2h10"/>
  </Icon>
);
const IconCheck = (props) => (
  <Icon size={14} {...props}>
    <path d="M5 12l5 5L20 7"/>
  </Icon>
);
const IconSend = (props) => (
  <Icon size={12} {...props}>
    <path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>
  </Icon>
);
const IconPhone = (props) => (
  <Icon size={14} {...props}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.69 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.56 2.81.69A2 2 0 0 1 22 16.92z"/>
  </Icon>
);

// ------------------------------------------------------------
// CammBot — placeholder bubble with pose label
// ------------------------------------------------------------
function CammBot({ pose = "idle", size = 200, className = "", animate = true }) {
  const ref = React.useRef(null);
  const [tilt, setTilt] = React.useState({ x: 0, y: 0 });
  const [bounced, setBounced] = React.useState(false);

  React.useEffect(() => {
    if (!animate) return;
    setBounced(true);
    const t = setTimeout(() => setBounced(false), 1500);
    return () => clearTimeout(t);
  }, [animate]);

  React.useEffect(() => {
    if (!animate) return;
    const onMove = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const k = (1 - dist / 200) * 3;
        setTilt({ x: -(dy / 200) * k, y: (dx / 200) * k });
      } else if (tilt.x !== 0 || tilt.y !== 0) {
        setTilt({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [animate]);

  const classes = ["cammbot", animate ? "cammbot-float" : "", bounced ? "cammbot-bounce" : "", className].filter(Boolean).join(" ");

  const posePaths = {
    waving: "cammbot/wave.png",
    hi: "cammbot/wave.png",
    typing: "cammbot/typing.png",
    pointing: "cammbot/pointing.png",
    "thumbs up": "cammbot/thumbs-up.png",
    walking: "cammbot/walking.png",
    envelope: "cammbot/envelope.png",
    idle: "cammbot/idle.png"
  };

  const normalizedPose = String(pose).toLowerCase().trim();
  const imgSrc = posePaths[normalizedPose] || posePaths.idle;

  return (
    <div className={classes} ref={ref}
      style={{
        width: size,
        height: size,
        transform: `perspective(600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      role="img"
      aria-label={`CammBot ${pose}`}>
      <img
        src={imgSrc}
        alt={`CammBot mascot - ${pose}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          pointerEvents: "none"
        }}
      />
    </div>
  );
}

// ------------------------------------------------------------
// Eyebrow
// ------------------------------------------------------------
function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

// ------------------------------------------------------------
// useReveal — IO + fallback timer (handles hidden-document case)
// ------------------------------------------------------------
function useReveal(threshold = 0.25, fallback = 1200) {
  const ref = React.useRef(null);
  const [shown, setShown] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current) return;
    let done = false;
    const reveal = () => { if (!done) { done = true; setShown(true); } };
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { reveal(); io.disconnect(); } }),
      { threshold }
    );
    io.observe(ref.current);
    // Fallback for hidden documents where IO callbacks are suspended.
    const t = setTimeout(reveal, fallback);
    return () => { io.disconnect(); clearTimeout(t); };
  }, [threshold, fallback]);
  return [ref, shown];
}

// ------------------------------------------------------------
// SplitText — word-by-word reveal on view
// ------------------------------------------------------------
function SplitText({ children, className = "", as: As = "h1", delay = 0, stagger = 0.08, italic = [] }) {
  const [ref, shown] = useReveal(0.25, 1200);
  const words = String(children).split(" ");

  return (
    <As ref={ref} className={className}>
      {words.map((w, i) => {
        const isItalic = italic.includes(w.replace(/[.,!?]/g, "").toLowerCase());
        return (
          <React.Fragment key={i}>
            <span
              className={"word" + (shown ? " in" : "")}
              style={{
                transitionDelay: `${delay + i * stagger}s`,
                fontStyle: isItalic ? "italic" : undefined,
                color: isItalic ? "var(--accent)" : undefined,
              }}
            >
              {w}
            </span>
            {i < words.length - 1 && " "}
          </React.Fragment>
        );
      })}
    </As>
  );
}

// ------------------------------------------------------------
// FadeUp — wrapper for scroll-in fade
// ------------------------------------------------------------
function FadeUp({ children, delay = 0, threshold = 0.2, className = "", as: As = "div", style }) {
  const [ref, shown] = useReveal(threshold, 1200);
  return (
    <As ref={ref}
      className={`fade-up ${shown ? "in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s`, ...style }}>
      {children}
    </As>
  );
}

// ------------------------------------------------------------
// CountUp — number counter when visible
// ------------------------------------------------------------
function CountUp({ to, duration = 1200, suffix = "" }) {
  const ref = React.useRef(null);
  const [val, setVal] = React.useState(0);
  const startedRef = React.useRef(false);

  React.useEffect(() => {
    if (!ref.current) return;
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      const t0 = performance.now();
      const loop = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setVal(Math.round(to * eased));
        if (p < 1) requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) start(); });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    // Fallback for hidden documents
    const fb = setTimeout(start, 1500);
    return () => { io.disconnect(); clearTimeout(fb); };
  }, [to, duration]);

  return <span ref={ref}>{val}{suffix}</span>;
}

// ------------------------------------------------------------
// MagneticButton — drift toward cursor on proximity
// ------------------------------------------------------------
function MagneticButton({ children, href, className = "", strength = 0.35, radius = 90 }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const onMove = (e) => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < radius) {
        setPos({ x: dx * strength, y: dy * strength });
      } else {
        setPos({ x: 0, y: 0 });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength, radius]);

  return (
    <a ref={ref} href={href}
      className={`magnetic-btn ${className}`}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}>
      {children}
    </a>
  );
}

// ------------------------------------------------------------
// Mail link helper
// ------------------------------------------------------------
const MAILTO = "mailto:ethan@ethancamm.co.uk?subject=Free%20chat%20about%20AI%20for%20my%20business";

// ------------------------------------------------------------
// PhoneFrame — generic modern phone bezel + screen
// ------------------------------------------------------------
function PhoneFrame({ children, rotation = 0 }) {
  return (
    <div className="phone-frame" style={{ transform: `rotate(${rotation}deg)` }}>
      <div className="notch" />
      <div className="phone-screen">
        <div className="statusbar">
          <span>9:41</span>
          <div className="right">
            <span style={{ fontSize: 11 }}>●●●</span>
            <div className="batt"><div className="batt-fill" /></div>
          </div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
// Export to window for cross-file scope
// ------------------------------------------------------------
Object.assign(window, {
  Icon, IconBot, IconGlobe, IconMessage,
  IconArrowRight, IconArrowDown, IconCopy, IconCheck, IconSend, IconPhone,
  CammBot, Eyebrow, SplitText, FadeUp, CountUp, MagneticButton, PhoneFrame, MAILTO,
  useReveal,
});
