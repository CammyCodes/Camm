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

  React.useEffect(() => {
    if (window.innerWidth < 900) {
      // mobile: don't drive scrollytelling
      return;
    }
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
  }, []);

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

      <div className="scrolly-stage">
        <div className="scrolly-copy">
          {SCENES.map((s, i) => {
            const S = SCENE_SCREENS[i];
            return (
              <div key={i}
                ref={(el) => (refs.current[i] = el)}
                className={`scene ${active === i ? "active" : ""}`}>
                <div className="num">{s.num} / Scene</div>
                <h3>{s.title}</h3>
                <p className="body">{s.body}</p>
                {/* Inline mobile phone for stacked layout */}
                <div className="phone-mobile-wrapper">
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <PhoneFrame><S /></PhoneFrame>
                  </div>
                </div>
              </div>
            );
          })}
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
    </section>
  );
}

Object.assign(window, { Hero, OldWayCost, Services, Scrollytelling });
