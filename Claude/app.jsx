/* ============================================================
   CammBot — App composition
   ============================================================ */

function Nav() {
  return (
    <nav className="nav">
      <a className="logo" href="#top" aria-label="CammBot home">
        <span className="dot" />
        <span>CammBot</span>
      </a>
      <a className="btn btn-ghost" href={MAILTO} style={{ padding: "10px 18px", fontSize: 14 }}>
        Email Ethan <IconArrowRight />
      </a>
    </nav>
  );
}

function App() {
  React.useEffect(() => {
    // Safety net: if IO/animations/transitions are suspended (hidden tab,
    // background iframe), force-reveal everything so the page is never blank.
    // Fire immediately when document is already hidden; otherwise after a delay
    // (long enough for normal IO-driven staggers to play first).
    const reveal = () => document.body.classList.add("force-revealed");
    if (typeof document !== "undefined" && document.visibilityState === "hidden") {
      reveal();
      return;
    }
    const t = setTimeout(reveal, 1800);
    const onVis = () => { if (document.visibilityState === "hidden") reveal(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { clearTimeout(t); document.removeEventListener("visibilitychange", onVis); };
  }, []);
  return (
    <React.Fragment>
      <div className="noise" />
      <Nav />
      <div id="top" />
      <Hero />
      <Showcase />
      <OldWayCost />
      <Services />
      <Scrollytelling />
      <Guarantee />
      <HowItWorks />
      <WhoItsFor />
      <FinalCTA />
      <Footer />
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
