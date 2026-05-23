/* ============================================================
   CammBot — Sections 1-4
   ============================================================ */

// ============================================================
// Section 1 — Hero
// ============================================================
function Hero() {
  const headlineWords = ["We", "build", "the", "robot.", "You", "get", "on", "with", "the", "job."];
  const [parallax, setParallax] = React.useState(0);
  const [headlineShown, setHeadlineShown] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setParallax(Math.min(window.scrollY, 300));
    window.addEventListener("scroll", onScroll, { passive: true });
    // Headline reveals on load (it's above the fold)
    const t = setTimeout(() => setHeadlineShown(true), 150);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);

  return (
    <section className="hero">
      <div className="halo halo-tr" />
      <div className="dot-grid" />
      <div className="wrap">
        <div className="grid">
          <div className="hero-left">
            <FadeUp delay={0}>
              <Eyebrow>AI THAT DOES THE BORING STUFF</Eyebrow>
            </FadeUp>
            <h1 style={{ transform: `translateY(${-parallax * 0.2}px)` }}>
              {headlineWords.map((w, i) => (
                <React.Fragment key={i}>
                  <span className={"word" + (headlineShown ? " in" : "")}
                    style={{ transitionDelay: `${0.15 + i * 0.08}s` }}>
                    {w === "robot." ? <em>robot.</em> : w}
                  </span>
                  {i < headlineWords.length - 1 && " "}
                </React.Fragment>
              ))}
            </h1>
            <FadeUp delay={0.75}>
              <p className="sub">
                Custom AI helpers for trades, property, services and small businesses.
                They handle quotes, emails, invoices, leads and admin. You get your time back.
              </p>
            </FadeUp>
            <FadeUp delay={0.9}>
              <div className="trust">
                <span className="badge">Free</span>
                <span>Free chat. Free setup. You only pay when it's clearly saving you time or making you money.</span>
              </div>
            </FadeUp>
            <FadeUp delay={1.05}>
              <div className="ctas">
                <a href={MAILTO} className="btn btn-primary">
                  Email Ethan <IconArrowRight />
                </a>
                <a href="#see-it-work" className="btn btn-ghost">
                  See what it does <IconArrowDown />
                </a>
              </div>
            </FadeUp>
          </div>

          <div className="bot-stage" style={{ transform: `translateY(${-parallax * 0.13}px)` }}>
            <CammBot pose="waving" size={300} />
          </div>
        </div>
      </div>

      <a href="#see-it-work" className="scroll-cue" aria-label="Scroll">
        <span>scroll</span>
        <span className="line" />
      </a>

      <style>{`
        @keyframes hero-word-in {
          from { opacity: 0; transform: translateY(0.5em); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

// ============================================================
// Section 2 — The cost of doing things the old way
// ============================================================
const STATS = [
  { num: 7, label: "Writing quotes and proposals", tag: "01" },
  { num: 5, label: "Chasing emails and replies", tag: "02" },
  { num: 4, label: "Following up unpaid invoices", tag: "03" },
  { num: 6, label: "Sorting calls, leads and bookings", tag: "04" },
];

function OldWayCost() {
  const closingWords = ["That's", "nearly", "half", "a", "working", "day.", "Every", "day.", "Gone."];
  const [closingRef, shown] = useReveal(0.4, 1500);

  return (
    <section className="section oldway">
      <div className="wrap">
        <div className="header">
          <FadeUp><Eyebrow>THE OLD WAY</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2>How many hours a week are you losing to this?</h2>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="sub">
              These are the jobs that quietly eat your week — for almost every business we talk to.
            </p>
          </FadeUp>
        </div>

        <div className="stat-grid">
          {STATS.map((s, i) => (
            <FadeUp key={i} delay={i * 0.1} className="stat-card" as="div">
              <div className="tag">{s.tag}</div>
              <div className="num">
                <CountUp to={s.num} /><span className="unit">hrs / week</span>
              </div>
              <div className="label">{s.label}</div>
            </FadeUp>
          ))}
        </div>

        <p ref={closingRef} className="closing">
          {closingWords.map((w, i) => (
            <React.Fragment key={i}>
              <span className={"word" + (shown ? " in" : "")}
                style={{ transitionDelay: `${i * 0.1}s` }}>
                {w === "Gone." ? <em>Gone.</em> : w}
              </span>
              {i < closingWords.length - 1 && " "}
            </React.Fragment>
          ))}
        </p>
      </div>
    </section>
  );
}

// ============================================================
// Section 3 — Three services
// ============================================================
const SERVICES = [
  {
    Icon: IconBot,
    title: "Smart helpers",
    tagline: "the agentic workflows bit",
    body: "Little AI workers that do the repetitive stuff for you — read emails, draft replies, write quotes, chase invoices, log info. They work in the background. You stay in charge.",
  },
  {
    Icon: IconGlobe,
    title: "Websites that actually do something",
    tagline: "not a digital business card",
    body: "A clean website that doesn't just sit there. It books appointments, answers questions, captures leads and hands you customers — not just clicks.",
  },
  {
    Icon: IconMessage,
    title: "One-to-one consulting",
    tagline: "sit-down, work it out together",
    body: "Not sure where AI fits in your business? We sit down with you, look at how you actually work, and point out exactly where it'll save you time or money. No fluff.",
  },
];

function Services() {
  return (
    <section className="section services">
      <div className="wrap">
        <div className="header">
          <div className="copy">
            <FadeUp><Eyebrow>WHAT WE BUILD</Eyebrow></FadeUp>
            <FadeUp delay={0.1}>
              <h2>Three ways CammBot earns its keep.</h2>
            </FadeUp>
          </div>
          <div className="bot">
            <CammBot pose="typing" size={140} />
          </div>
        </div>

        <div className="svc-grid">
          {SERVICES.map((s, i) => {
            const I = s.Icon;
            return (
              <FadeUp key={i} delay={i * 0.15} className={`svc-card offset-${i}`} as="div">
                <div className="ico"><I size={28} /></div>
                <h3>{s.title}</h3>
                <div className="tagline">{s.tagline}</div>
                <p className="body">{s.body}</p>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Section 4 — Scrollytelling (pinned phone)
// ============================================================
const SCENES = [
  {
    num: "1",
    title: "A customer emails asking for a price.",
    body: "CammBot reads it, checks your prices, and drafts a clean quote ready for you to send. You just hit reply.",
  },
  {
    num: "2",
    title: "Photos in. Report out.",
    body: "Drop your day's photos in a folder. CammBot writes the report — what got done, what's next, what's a problem — and sends it to the client. Done before tea.",
  },
  {
    num: "3",
    title: "Stop chasing your own money.",
    body: "Polite reminders go out on a schedule when invoices are overdue. CammBot stays nice. The money comes in faster. You stop sending awkward \"just a reminder\" emails.",
  },
  {
    num: "4",
    title: "Never lose another customer to a missed call.",
    body: "Calls, forms, DMs, WhatsApps — all turned into a tidy list with names, numbers, and what they want. Ready when you are.",
  },
];

// --- Phone screen contents per scene ---
function SceneScreen1() {
  return (
    <React.Fragment>
      <div className="email-card">
        <div className="row">
          <div className="from">Sarah Mills</div>
          <div className="when">9:38 am</div>
        </div>
        <div className="subj">Quote for kitchen refit?</div>
        <div className="preview">Hi — could you send me a price for fitting a new kitchen in our flat? Approx 3.2m × 4m, mid-range units…</div>
      </div>
      <div className="bot-bubble">
        <span className="mini">●</span>
        got it — drafting now…
      </div>
      <div className="compose-card">
        <div className="head">
          <span style={{ fontSize: 11, color: "var(--ink-soft)" }}>To: Sarah Mills</span>
          <span className="draft">Draft</span>
        </div>
        <div className="lines">
          <div /><div /><div /><div />
        </div>
        <button className="send">Send <IconSend /></button>
      </div>
    </React.Fragment>
  );
}

function SceneScreen2() {
  return (
    <React.Fragment>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>
        Today's site photos · 6
      </div>
      <div className="photo-grid">
        <div className="ph" /><div className="ph" /><div className="ph" />
        <div className="ph" /><div className="ph" /><div className="ph" />
      </div>
      <div className="typing-dots"><span /><span /><span /></div>
      <div className="report-card">
        <div className="hd"><span className="dotg" />Daily report · sent</div>
        <div className="item ok"><span className="ico">✓</span>Footings poured at the back</div>
        <div className="item next"><span className="ico">→</span>Next: rebar &amp; pump tomorrow</div>
        <div className="item warn"><span className="ico">⚠</span>Skip delivery delayed</div>
      </div>
    </React.Fragment>
  );
}

function SceneScreen3() {
  return (
    <React.Fragment>
      <div className="invoice-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span className="badge-overdue">Overdue 14 days</span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>#0421</span>
        </div>
        <div className="total">£2,480.00</div>
        <div className="meta">Hartwell &amp; Co · due Apr 28</div>
      </div>
      <div className="bot-bubble">
        <span className="mini">●</span>
        sending a friendly nudge…
      </div>
      <div className="paid-toast">
        <span className="emj">💰</span>
        <div>
          <div>Paid · Invoice #0421</div>
          <div style={{ fontSize: 10, color: "#047857", fontFamily: "var(--font-mono)", marginTop: 2 }}>cleared 11:02 am</div>
        </div>
      </div>
    </React.Fragment>
  );
}

function SceneScreen4() {
  return (
    <React.Fragment>
      <div className="notif-missed">
        <div className="ic"><IconPhone /></div>
        <div>
          <div className="who">Missed call · 07900 412 003</div>
          <div className="meta">just now</div>
        </div>
      </div>
      <div className="bot-bubble">
        <span className="mini">●</span>
        logging to your leads…
      </div>
      <div className="lead-list">
        <div className="head">
          Today's leads <span className="count">3 new</span>
        </div>
        <div className="row">
          <div className="name">Tom Whitley</div>
          <div className="num">07900 412 003</div>
          <div className="note">wants a kitchen quote · Wed afternoon</div>
        </div>
        <div className="row">
          <div className="name">Priya Shah</div>
          <div className="num">07712 884 992</div>
          <div className="note">bathroom — boiler swap query</div>
        </div>
        <div className="row">
          <div className="name">Marcus Lin</div>
          <div className="num">07404 220 871</div>
          <div className="note">general handyman, half-day</div>
        </div>
      </div>
    </React.Fragment>
  );
}

const SCENE_SCREENS = [SceneScreen1, SceneScreen2, SceneScreen3, SceneScreen4];

function Scrollytelling() {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef([]);
  const [isMobile, setIsMobile] = React.useState(true);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 900);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  React.useEffect(() => {
    if (isMobile) return;
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && e.intersectionRatio > 0.4) {
              setActive(i);
            }
          });
        },
        { threshold: [0.4, 0.5, 0.6], rootMargin: "-30% 0px -30% 0px" }
      );
      io.observe(el);
      return io;
    });
    return () => observers.forEach((io) => io && io.disconnect());
  }, [isMobile]);

  const ActiveScreen = SCENE_SCREENS[active];

  return (
    <section id="see-it-work" className="scrolly">
      <div className="wrap">
        <div className="header">
          <FadeUp><Eyebrow>SEE IT WORK</Eyebrow></FadeUp>
          <FadeUp delay={0.1}>
            <h2>What CammBot actually does, in four examples.</h2>
          </FadeUp>
          <div className="bot">
            <CammBot pose="pointing" size={110} />
          </div>
        </div>
      </div>

      {isMobile ? (
        <div className="scrolly-mobile-stage">
          {SCENES.map((s, i) => {
            const S = SCENE_SCREENS[i];
            return (
              <FadeUp key={i} className="scrolly-mobile-scene" delay={i * 0.05}>
                <div className="scrolly-mobile-copy">
                  <div className="num">{s.num} / Scene</div>
                  <h3>{s.title}</h3>
                  <p className="body">{s.body}</p>
                </div>
                <div className="scrolly-mobile-phone-wrapper">
                  <PhoneFrame>
                    <div className="phone-fade active">
                      <S />
                    </div>
                  </PhoneFrame>
                </div>
              </FadeUp>
            );
          })}
        </div>
      ) : (
        <div className="scrolly-stage">
          <div className="scrolly-copy">
            {SCENES.map((s, i) => (
              <div key={i}
                ref={(el) => (refs.current[i] = el)}
                className={`scene ${active === i ? "active" : ""}`}>
                <div className="num">{s.num} / Scene</div>
                <h3>{s.title}</h3>
                <p className="body">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="phone-col">
            <div className="phone-pin">
              <PhoneFrame rotation={(active - 1.5) * 1.5}>
                {SCENE_SCREENS.map((S, i) => (
                  <div key={i} className={`phone-fade ${active === i ? "active" : ""}`}>
                    <S />
                  </div>
                ))}
              </PhoneFrame>
              <div className="scene-progress">
                {SCENES.map((_, i) => (
                  <div key={i} className={`dot ${active === i ? "active" : ""}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================
// Showcase component support SVG icons
// ============================================================
const IconPlay = (props) => (
  <Icon size={16} {...props}>
    <polygon points="6 3 20 12 6 21 6 3" fill="currentColor" />
  </Icon>
);

const IconPause = (props) => (
  <Icon size={16} {...props}>
    <rect x="14" y="4" width="4" height="16" rx="1" fill="currentColor" />
    <rect x="6" y="4" width="4" height="16" rx="1" fill="currentColor" />
  </Icon>
);

const IconReplay = (props) => (
  <Icon size={16} {...props}>
    <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
  </Icon>
);

// ============================================================
// Showcase Card Sub-component
// ============================================================
function ShowcaseCard({ type }) {
  if (type === "catchup") {
    return (
      <div className="showcase-card showcase-card--catchup">
        <div className="showcase-card__header">Today's catch-up</div>
        <div className="showcase-card__body">
          <div className="showcase-card__row"><span className="showcase-card__bullet">●</span> 5 enquiries handled</div>
          <div className="showcase-card__row"><span className="showcase-card__bullet">●</span> 2 jobs booked</div>
          <div className="showcase-card__row"><span className="showcase-card__bullet">●</span> 1 quote sent</div>
          <div className="showcase-card__alert">
            <strong>1 needs you:</strong> Mrs Patel wants to move Tuesday's job — your call.
          </div>
        </div>
      </div>
    );
  }
  if (type === "listing") {
    return (
      <div className="showcase-card showcase-card--listing">
        <div className="showcase-card__label">Listing Preview</div>
        <div className="showcase-card__title">Vintage Mid-Century Brass Table Lamp — Retro MCM Lighting, Fully Working</div>
        <div className="showcase-card__price-row">
          <span className="showcase-card__price">£48</span>
          <span className="showcase-card__price-sub">(based on 12 recent sold: £39–£60)</span>
        </div>
        <div className="showcase-card__tags">
          <span className="showcase-card__tag">brass lamp</span>
          <span className="showcase-card__tag">mid-century</span>
          <span className="showcase-card__tag">retro lighting</span>
          <span className="showcase-card__tag">MCM</span>
          <span className="showcase-card__tag">vintage desk lamp</span>
        </div>
        <div className="showcase-card__desc">
          Genuine mid-century brass table lamp. Warm retro glow, fully tested and working. A characterful piece for a desk, console or bedside.
        </div>
        <div className="showcase-card__platforms">
          <span className="showcase-card__platform">List on eBay</span>
          <span className="showcase-card__platform">Etsy</span>
          <span className="showcase-card__platform">Amazon</span>
        </div>
      </div>
    );
  }
  if (type === "quote") {
    return (
      <div className="showcase-card showcase-card--quote">
        <div className="showcase-card__header">Quote</div>
        <div className="showcase-card__body">
          <div className="showcase-card__item">Gutter clearance — 3-bed semi, two storey</div>
          <div className="showcase-card__item">Clear gutters + flush downpipes — <strong>£85</strong></div>
          <div className="showcase-card__item">Before/after photos — included</div>
          <div className="showcase-card__divider" />
          <div className="showcase-card__total-row">
            <span>Total</span>
            <span className="showcase-card__total-price">£85</span>
          </div>
          <div className="showcase-card__valid">valid 30 days</div>
          <button className="showcase-card__btn" type="button" disabled>Approve &amp; send</button>
        </div>
      </div>
    );
  }
  if (type === "money") {
    return (
      <div className="showcase-card showcase-card--money">
        <div className="showcase-card__header">Money recap</div>
        <div className="showcase-card__body">
          <div className="showcase-card__recovered">
            <span className="showcase-card__big-num">£930</span> recovered today
          </div>
          <div className="showcase-card__item">2 polite reminders sent</div>
          <div className="showcase-card__alert">
            <strong>1 needs you:</strong> Oakfield's gone quiet — want me to call?
          </div>
        </div>
      </div>
    );
  }
  if (type === "reviews") {
    return (
      <div className="showcase-card showcase-card--reviews">
        <div className="showcase-card__header">Reviews this month</div>
        <div className="showcase-card__body">
          <div className="showcase-card__stat-item"><strong>9 new</strong> 5-star reviews</div>
          <div className="showcase-card__stat-item">1 unhappy caught early (kept private)</div>
          <div className="showcase-card__google-rating">
            <span>Google rating:</span>
            <span className="showcase-card__stars">4.9 ★</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
}

// ============================================================
// Showcase Demo Sequence Data
// ============================================================
const DEMOS = [
  {
    chip: "Daily catch-up",
    stat: "~2 hrs of admin handled today · you did none of it",
    contextHeader: "Today · you were on a job",
    events: [
      { type: "incoming", time: "08:14", text: "Hi, do you cover Leeds? Need a quote for a bathroom." },
      { type: "tick", text: "Replied + asked 3 questions ✅" },
      { type: "incoming", time: "10:02", text: "Missed call — 07xxx 492 118" },
      { type: "tick", text: "Texted back, booked Tues 2pm ✅" },
      { type: "incoming", time: "11:30", text: "You free this week?" },
      { type: "tick", text: "Sent availability ✅" },
      { type: "incoming", time: "13:45", text: "Can you resend my invoice?" },
      { type: "tick", text: "Sent a copy ✅" },
      { type: "card", cardType: "catchup" }
    ]
  },
  {
    chip: "List & optimise",
    stat: "4700 optimised in bulk last week · a month of listing work in an afternoon",
    contextHeader: "You → CammBot",
    events: [
      { type: "outgoing", text: "[📷 photo] Selling this vintage brass lamp, no idea what to put." },
      { type: "agent", text: "On it. Found 12 similar sold recently — here's a listing ready to go 👇", typing: true },
      { type: "card", cardType: "listing" },
      { type: "incoming", text: "Does it ship to France?" },
      { type: "tick", text: "Replied: yes, £12 tracked, 5–7 days ✅" }
    ]
  },
  {
    chip: "Instant quote",
    stat: "Quote ready in 40 seconds · while you carried on working",
    contextHeader: "New enquiry",
    events: [
      { type: "incoming", text: "Hi, how much to clean the gutters on a 3-bed semi?" },
      { type: "agent", text: "Happy to help — quick couple of questions:", typing: true },
      { type: "agent", text: "Single or two storey? Any conservatory? Easy access round the back?" },
      { type: "incoming", text: "Two storey, no conservatory, yep easy access." },
      { type: "agent", text: "Great — here's your quote 👇", typing: true },
      { type: "card", cardType: "quote" }
    ]
  },
  {
    chip: "Chase the money",
    stat: "£2,400 chased back this month · 0 awkward phone calls for you",
    contextHeader: "This morning",
    events: [
      { type: "agent", text: "3 invoices overdue. I'll handle the chasing." },
      { type: "tick", text: "Reminder sent → J. Whitehouse (£320)" },
      { type: "tick", text: "Reminder sent → Oakfield Ltd (£1,150)" },
      { type: "tick", text: "Paid! ✅ M. Reilly cleared £930" },
      { type: "card", cardType: "money" }
    ]
  },
  {
    chip: "Reviews on autopilot",
    stat: "More 5-stars, fewer surprises · all on autopilot",
    contextHeader: "Job complete",
    events: [
      { type: "agent", text: "Job marked complete for the Hargreaves. Good time to ask for a review." },
      { type: "tick", text: "Sent a friendly request 🌟" },
      { type: "incoming", text: "5 stars — brilliant job, thank you!" },
      { type: "tick", text: "Nudged them to Google — posted ✅" },
      { type: "agent", text: "Heads up: Mr Doyle replied 3/5. I've kept it private. Want to sort it first?" },
      { type: "card", cardType: "reviews" }
    ]
  }
];

// ============================================================
// Showcase Main Component
// ============================================================
function Showcase() {
  const [activeDemo, setActiveDemo] = React.useState(0);
  const [visibleCount, setVisibleCount] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false); // start paused, triggered by observer
  const [autoAdvance, setAutoAdvance] = React.useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(false);

  const sectionRef = React.useRef(null);
  const chatContainerRef = React.useRef(null);

  // Prefers reduced motion detection
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const listener = (e) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", listener);
    return () => mq.removeEventListener("change", listener);
  }, []);

  // IntersectionObserver to control playback based on viewport
  React.useEffect(() => {
    if (!sectionRef.current || prefersReducedMotion) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsPlaying(true);
        } else {
          setIsPlaying(false);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  // Timeline Player Effect
  React.useEffect(() => {
    if (prefersReducedMotion) {
      setVisibleCount(DEMOS[activeDemo].events.length);
      setIsTyping(false);
      return;
    }

    if (!isPlaying) return;

    const events = DEMOS[activeDemo].events;

    // Timeline completed
    if (visibleCount >= events.length) {
      if (autoAdvance) {
        const timer = setTimeout(() => {
          setActiveDemo((prev) => (prev + 1) % DEMOS.length);
          setVisibleCount(0);
          setIsTyping(false);
        }, 2500);
        return () => clearTimeout(timer);
      }
      return;
    }

    const isFirstEvent = visibleCount === 0;
    const nextEvent = events[visibleCount];

    if (isTyping) {
      // Wait for typing indicator, then reveal the event
      const typingDuration = 700 + Math.random() * 200; // 700ms - 900ms
      const timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleCount((prev) => prev + 1);
      }, typingDuration);
      return () => clearTimeout(timer);
    } else {
      // Normal delay before next action
      const interBubbleDelay = isFirstEvent ? 300 : (600 + Math.random() * 500); // 600ms - 1100ms
      const timer = setTimeout(() => {
        if (nextEvent.typing) {
          setIsTyping(true);
        } else {
          setVisibleCount((prev) => prev + 1);
        }
      }, interBubbleDelay);
      return () => clearTimeout(timer);
    }
  }, [activeDemo, visibleCount, isTyping, isPlaying, autoAdvance, prefersReducedMotion]);

  // Auto scroll chat log to bottom
  React.useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [visibleCount, isTyping]);

  const handleSelectDemo = (idx) => {
    setActiveDemo(idx);
    setVisibleCount(0);
    setIsTyping(false);
    setAutoAdvance(false); // Stop auto-advancing after interaction
    setIsPlaying(true);
  };

  const handleReplay = () => {
    setVisibleCount(0);
    setIsTyping(false);
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // Restart if at the end
      if (visibleCount >= DEMOS[activeDemo].events.length) {
        setActiveDemo((prev) => (prev + 1) % DEMOS.length);
        setVisibleCount(0);
        setIsTyping(false);
      }
      setAutoAdvance(true);
    }
  };

  const demo = DEMOS[activeDemo];
  const visibleEvents = demo.events.slice(0, visibleCount);

  return (
    <section id="showcase" className="section showcase" ref={sectionRef}>
      <div className="wrap">
        <div className="showcase__grid">
          
          <div className="showcase__left">
            <div className="showcase__header">
              <FadeUp><Eyebrow>SEE IT IN ACTION</Eyebrow></FadeUp>
              <FadeUp delay={0.1}>
                <h2>Watch CammBot do the boring stuff.</h2>
              </FadeUp>
              <FadeUp delay={0.2}>
                <p className="sub">
                  The jobs that quietly eat your week — handled. Tap one and watch it run.
                </p>
              </FadeUp>
            </div>

            <div className="showcase__selectors" role="tablist" aria-label="Use cases">
              {DEMOS.map((d, idx) => (
                <button
                  key={idx}
                  role="tab"
                  aria-selected={activeDemo === idx}
                  className={`showcase__chip ${activeDemo === idx ? "active" : ""}`}
                  onClick={() => handleSelectDemo(idx)}
                >
                  {d.chip}
                </button>
              ))}
            </div>

            <div className="showcase__stat-wrapper">
              <span className="showcase__stat">{demo.stat}</span>
            </div>

            <div className="showcase__cta-wrapper">
              <a href={MAILTO} className="btn btn-primary">
                Email Ethan <IconArrowRight />
              </a>
            </div>
          </div>

          <div className="showcase__right">
            <div className="showcase__phone-container">
              <PhoneFrame>
                <div className="showcase-chat" aria-live="polite" aria-label="CammBot timeline animation screen">
                  <div className="showcase-chat__header">
                    {demo.contextHeader}
                  </div>
                  <div className="showcase-chat__messages" ref={chatContainerRef}>
                    {visibleEvents.map((evt, idx) => {
                      if (evt.type === "card") {
                        return <ShowcaseCard key={idx} type={evt.cardType} />;
                      }
                      if (evt.type === "tick") {
                        return (
                          <div key={idx} className="showcase-chat__tick">
                            <span className="showcase-chat__tick-icon">✓</span>
                            <span className="showcase-chat__tick-text">{evt.text}</span>
                          </div>
                        );
                      }
                      
                      const bubbleClass = evt.type === "outgoing" 
                        ? "showcase-chat__bubble showcase-chat__bubble--outgoing"
                        : evt.type === "agent"
                        ? "showcase-chat__bubble showcase-chat__bubble--agent"
                        : "showcase-chat__bubble showcase-chat__bubble--incoming";
                        
                      return (
                        <div key={idx} className={bubbleClass}>
                          {evt.time && <span className="showcase-chat__time">{evt.time}</span>}
                          {evt.text}
                        </div>
                      );
                    })}

                    {isTyping && (
                      <div className="showcase-chat__typing" aria-label="CammBot is typing">
                        <span /><span /><span />
                      </div>
                    )}
                  </div>
                </div>
              </PhoneFrame>
              <span className="showcase__microcopy">Illustrative examples.</span>
            </div>

            <div className="showcase__controls">
              <button
                className="showcase__control-btn"
                onClick={handleTogglePlay}
                aria-label={isPlaying ? "Pause timeline" : "Play timeline"}
              >
                {isPlaying ? <IconPause /> : <IconPlay />}
              </button>

              <div className="showcase__dots" role="tablist" aria-label="Demo progress">
                {DEMOS.map((_, idx) => (
                  <button
                    key={idx}
                    role="tab"
                    aria-selected={activeDemo === idx}
                    aria-label={`Go to demo ${idx + 1}`}
                    className={`showcase__dot ${activeDemo === idx ? "active" : ""}`}
                    onClick={() => handleSelectDemo(idx)}
                  />
                ))}
              </div>

              <button
                className="showcase__control-btn"
                onClick={handleReplay}
                aria-label="Replay current demo"
              >
                <IconReplay />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Hero, Showcase, OldWayCost, Services, Scrollytelling });
