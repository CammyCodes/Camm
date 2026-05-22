/* ============================================================
   CammBot — Sections 5-9
   ============================================================ */

// ============================================================
// Section 5 — The Guarantee
// ============================================================
function Guarantee() {
  const [ref, shown] = useReveal(0.4, 1500);
  const words = ["Pay", "nothing", "until", "it", "works."];

  return (
    <section className="section guarantee" ref={ref}>
      <div className="bot">
        <CammBot pose="thumbs up" size={130} />
      </div>
      <div className="wrap-tight">
        <FadeUp><Eyebrow>THE PROMISE</Eyebrow></FadeUp>

        <h2 style={{ marginTop: 22 }}>
          {words.map((w, i) => {
            const isHi = i < 2;
            return (
              <React.Fragment key={i}>
                <span
                  className={"word" + (shown ? " in" : "")}
                  style={{
                    transitionDelay: `${i * 0.12}s`,
                    color: isHi && shown ? "var(--accent)" : undefined,
                    transition: `opacity 0.7s ease ${i * 0.12}s, transform 0.7s cubic-bezier(0.2,0.8,0.2,1) ${i * 0.12}s, color 0.5s ease ${0.5 + words.length * 0.12}s`,
                  }}>
                  {w === "works." ? <em>works.</em> : w}
                </span>
                {i < words.length - 1 && " "}
              </React.Fragment>
            );
          })}
        </h2>

        <FadeUp delay={0.8}>
          <p className="body">
            We do the chat for free. We do the setup for free. You only pay once it's clearly
            saving you time or making you money in your business. If it doesn't, you walk away owing nothing.
          </p>
        </FadeUp>

        <div className="pills">
          {["No contracts", "No setup fees", "No risk"].map((p, i) => (
            <FadeUp key={p} delay={1.0 + i * 0.12} as="span">
              <span className="pill pill-accent" style={{
                animation: shown ? `pop-in 0.7s cubic-bezier(0.3,1.6,0.5,1) ${1.0 + i * 0.12}s both` : "none",
              }}>
                {p}
              </span>
            </FadeUp>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.7); }
          70% { opacity: 1; transform: scale(1.08); }
          100% { transform: scale(1); }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// Section 6 — How it works
// ============================================================
const STEPS = [
  { n: 1, title: "Free chat", body: "Tell us what's eating your time. We listen. No sales pitch, no jargon." },
  { n: 2, title: "We build it for you", body: "We set up CammBot for your business. You don't lift a finger." },
  { n: 3, title: "You watch it work", body: "See it in action. Try it. Break it. We tweak until it's right." },
  { n: 4, title: "You only pay when it pays off", body: "Saving you time or making you money? Brilliant. If not, you owe nothing." },
];

function HowItWorks() {
  const sectionRef = React.useRef(null);
  const stepRefs = React.useRef([]);
  const [progress, setProgress] = React.useState(0);
  const [activeSteps, setActiveSteps] = React.useState([false, false, false, false]);

  React.useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      const r = sectionRef.current.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.5;
      const seen = Math.max(0, -r.top + window.innerHeight * 0.5);
      const p = Math.max(0, Math.min(1, seen / total));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const obs = stepRefs.current.map((el, i) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        (es) => es.forEach((e) => {
          if (e.isIntersecting) {
            setActiveSteps((prev) => {
              if (prev[i]) return prev;
              const next = [...prev]; next[i] = true; return next;
            });
            io.disconnect();
          }
        }),
        { threshold: 0.4 }
      );
      io.observe(el);
      return io;
    });
    // Fallback: reveal all steps after 1.8s in case IO is suspended
    const fb = setTimeout(() => setActiveSteps([true, true, true, true]), 1800);
    return () => { obs.forEach((io) => io && io.disconnect()); clearTimeout(fb); };
  }, []);

  return (
    <section className="section how" ref={sectionRef}>
      <div className="wrap">
        <div className="header">
          <FadeUp><Eyebrow>HOW IT WORKS</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2>Four steps. No surprises.</h2>
          </FadeUp>
        </div>

        <div className="how-timeline">
          <div className="rail" />
          <div className="rail-fill" style={{ height: `calc((100% - 60px) * ${progress})` }} />

          {STEPS.map((s, i) => (
            <div key={s.n}
              ref={(el) => (stepRefs.current[i] = el)}
              className={`step ${activeSteps[i] ? "in" : ""}`}>
              <div className="num">{String(s.n).padStart(2, "0")}</div>
              <div>
                <h3>{s.title}</h3>
                <p className="body">{s.body}</p>
              </div>
              {i === 3 && (
                <div className="bot-walker">
                  <CammBot pose="walking" size={90} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 7 — Who it's for
// ============================================================
const AUDIENCE = [
  "Trades & construction",
  "Property & lettings",
  "Professional services",
  "Small businesses",
  "E-commerce",
  "Agencies",
  "Anyone drowning in admin",
];

// Pre-computed scatter offsets / rotations (stable, not random per render)
const SCATTER = [
  { rot: -2, off: -8,  dx: -30, dy: 24 },
  { rot:  1.5, off: 6, dx: 36,  dy: -18 },
  { rot: -1, off: -14, dx: -22, dy: -30 },
  { rot:  2.5, off: 10, dx: 28, dy: 26 },
  { rot: -2.5, off: -4, dx: -40, dy: 14 },
  { rot:  1, off: 12,  dx: 22,  dy: -8 },
  { rot: -0.5, off: -2, dx: 0,  dy: 38 },
];

function WhoItsFor() {
  const [ref, shown] = useReveal(0.3, 1500);

  return (
    <section className="section who" ref={ref}>
      <div className="wrap">
        <FadeUp><Eyebrow>WHO IT'S FOR</Eyebrow></FadeUp>
        <FadeUp delay={0.1}>
          <h2>Built for businesses that have better things to do than paperwork.</h2>
        </FadeUp>

        <div className="cluster">
          {AUDIENCE.map((a, i) => {
            const s = SCATTER[i];
            return (
              <span
                key={a}
                className={`float-pill ${shown ? "in" : ""}`}
                style={{
                  "--rot": `${s.rot}deg`,
                  "--off": `${s.off}px`,
                  transform: shown
                    ? `rotate(${s.rot}deg) translateY(${s.off}px)`
                    : `translate(${s.dx}px, ${s.dy}px) rotate(${s.rot}deg)`,
                  transitionDelay: `${0.1 + i * 0.08}s`,
                  animationDelay: `${0.5 + i * 0.08}s`,
                }}>
                {a}
              </span>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 8 — Final CTA
// ============================================================
function FinalCTA() {
  const botRef = React.useRef(null);
  const [botShift, setBotShift] = React.useState({ x: 0, y: 0 });
  const [toast, setToast] = React.useState(false);

  React.useEffect(() => {
    const onMove = (e) => {
      if (!botRef.current) return;
      const r = botRef.current.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / 30;
      const dy = (e.clientY - cy) / 30;
      setBotShift({
        x: Math.max(-15, Math.min(15, dx)),
        y: Math.max(-15, Math.min(15, dy)),
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const copyEmail = () => {
    navigator.clipboard?.writeText("ethan@ethancamm.co.uk").then(() => {
      setToast(true);
      setTimeout(() => setToast(false), 1800);
    });
  };

  const ctaWords = ["Stop", "wasting", "time", "on", "admin."];

  return (
    <section className="section final-cta">
      <div className="wrap-tight">
        <div className="bot" ref={botRef}
          style={{ transform: `translate(${botShift.x}px, ${botShift.y}px)` }}>
          <CammBot pose="envelope" size={220} />
        </div>

        <FadeUp><Eyebrow>READY?</Eyebrow></FadeUp>
        <SplitText as="h2" stagger={0.1}>{ctaWords.join(" ")}</SplitText>

        <FadeUp delay={0.5}>
          <p className="sub">
            Book a free chat with Ethan. No pressure. No jargon. Just a friendly conversation about what's slowing you down.
          </p>
        </FadeUp>

        <FadeUp delay={0.7}>
          <MagneticButton href={MAILTO} className="">
            <span className="btn btn-primary big">
              Email Ethan <IconArrowRight />
            </span>
          </MagneticButton>
        </FadeUp>

        <FadeUp delay={0.85}>
          <div className="copy-row">
            or copy: <strong style={{ color: "var(--ink)" }}>ethan@ethancamm.co.uk</strong>
            <button onClick={copyEmail} aria-label="Copy email">
              <IconCopy /> Copy
            </button>
          </div>
        </FadeUp>
      </div>

      <div className={`toast ${toast ? "show" : ""}`}>
        <IconCheck /> &nbsp; Copied!
      </div>
    </section>
  );
}

// ============================================================
// Section 9 — Footer
// ============================================================
function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <div className="row">
          <div className="left">
            <CammBot pose="hi" size={40} animate={false} />
            <span>Built by Ethan Camm</span>
          </div>
          <a href="mailto:ethan@ethancamm.co.uk">ethan@ethancamm.co.uk</a>
          <span>© 2026</span>
        </div>
      </div>
    </footer>
  );
}

Object.assign(window, { Guarantee, HowItWorks, WhoItsFor, FinalCTA, Footer });
