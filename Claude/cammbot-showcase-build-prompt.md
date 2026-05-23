# Build Prompt — CammBot "Watch it work" Showcase

You are working on **CammBot**, a one-page React site that sells custom AI agents to small businesses (trades, property, services, marketplace sellers). The site lives in the repo `CammyCodes/Camm`. Your job is to build the **#1 hero feature**: a mobile-first, self-playing showcase of real AI-agent workflows, placed as the first content block on the page so visitors instantly *see* what the agents do.

Treat this as a finished, production-quality feature that matches the existing site's craft. Do not lower the design bar.

---

## STEP 0 — Read the repo first (do not skip)

Before writing anything, read and understand these files so you match existing conventions exactly:

- `index.html` — confirms the setup (details below).
- `app.jsx` — the root app and the **order in which sections render**. You will insert the new section here.
- `ui.jsx` — shared UI primitives (buttons, section wrappers, eyebrow/label components, etc.). **Reuse these** rather than inventing new ones.
- `sections-a.jsx` and `sections-b.jsx` — existing page sections. Match their component style, naming, and how they animate / reveal on scroll.
- `styles.css` — the **design tokens** (CSS custom properties for colour, spacing, radius, type). You MUST reuse these.
- `sections.css` — section-level styles. Your new CSS goes here.
- `uploads/` and `cammbot/` — check for existing imagery/assets you can reuse.

Note the exact naming convention for components and CSS classes already in use, and copy it.

---

## Hard technical constraints (non-negotiable)

The site has **no build step**. From `index.html`: React 18.3.1 + ReactDOM are loaded from a CDN, and `.jsx` files are transformed in-browser by **Babel Standalone** via `<script type="text/babel" data-presets="react" src="...">`, loaded in order: `ui.jsx` → `sections-a.jsx` → `sections-b.jsx` → `app.jsx`.

Therefore:

1. **No ES modules.** Do **not** use `import` or `export`. Components are shared via global scope (top-level `function`/`const` declarations visible across the scripts). Declare your new component the same way the existing components are declared — check the files and match.
2. **No new dependencies, no bundler, no JSX outside this pattern.** Pure React (`React`, `ReactDOM`) + hooks (`React.useState`, `React.useEffect`, `React.useRef`). The site does not alias hooks, so reference them via `React.` unless the existing files do otherwise — check and match.
3. **Where the code goes:**
   - Add the new component to **`sections-a.jsx`** (the early-page sections file), matching its declaration style.
   - Wire it into **`app.jsx`** as the **first content section after the hero/headline**. Read `app.jsx` to find the exact spot and the section-rendering pattern, then follow it.
   - Add all styling to **`sections.css`**, namespaced (e.g. `.showcase`, `.showcase__phone`, `.showcase__chip`), using the **existing CSS custom properties** from `styles.css`. Do not introduce a new colour palette or font stack.
   - Do **not** edit `index.html` (no new fonts/scripts are needed).
4. **Type system:** display/headlines in **Fraunces**, body in **Geist**, and all **numbers/stats/prices in Geist Mono** — these are already loaded. Use the site's existing tokens/classes for these.
5. **Smooth scroll:** the site uses **Lenis**. Do not attach competing scroll handlers or transforms that fight it.
6. **Reduced motion:** the site already respects `prefers-reduced-motion`. Your showcase MUST too — when reduced motion is on, render each demo's **final completed state statically** (no typing animation, no auto-advance), so it's fully understandable without movement.
7. **Performance:** lightweight only. Animate with CSS + minimal JS (`requestAnimationFrame`/`setTimeout`). Keep the DOM small, clean up all timers on unmount and on demo switch. Any imagery must be small/optimised; prefer a simple CSS illustration or a small asset from `uploads/`.
8. **No third-party logos.** For the marketplace demo, reference eBay / Etsy / Amazon as **plain text labels / neutral pills**, never their copyrighted logos.

---

## What to build

A new section, recommended id `showcase` (verify naming against the repo), positioned first under the hero.

### Section header
- Small eyebrow label (reuse the existing eyebrow component): `SEE IT IN ACTION`
- Headline (Fraunces): **"Watch CammBot do the boring stuff."**
- Sub (Geist): "The jobs that quietly eat your week — handled. Tap one and watch it run."

### Core anatomy
1. **A phone frame** containing an animated "screen" where the demo plays out (chat-style bubbles + agent status lines + a final output card).
2. **A use-case selector** — 5 pill chips. On mobile: a single horizontally-scrollable row with scroll-snap (hide the scrollbar). On desktop: a tidy vertical list beside the phone.
3. **Controls:** a replay button and a play/pause toggle. A small set of progress dots showing which demo is active.
4. **A stat line** per demo, rendered in Geist Mono.
5. Subtle microcopy near the phone: "Illustrative examples."
6. A primary CTA below the showcase that reuses the site's existing main call-to-action (link/anchor) — find it in the repo and reuse it; do not invent a new destination.

### Layout
- **Mobile-first (~360px baseline):** stacked order — header, chips (scroll-x), phone, stat line, controls, CTA. The phone is full container width minus gutters; all text legible at 360px.
- **Desktop:** two columns within the site's existing max-width container — left column: header + vertical selector list + active stat + CTA; right column: the phone, centred. Keep generous whitespace consistent with the rest of the site.

### Interaction / motion
- Use an **IntersectionObserver** to start playback when the section scrolls into view (match how other sections trigger reveals, if they do).
- Each demo is a scripted sequence of timed **events**. Reveal events one at a time:
  - Incoming/outgoing chat bubbles fade-and-rise in.
  - Before an agent reply, show a brief **"typing" three-dot indicator** (~700–900ms).
  - Inter-bubble delay ~600–1100ms (tune for natural pacing).
  - Agent "working" status lines (e.g. "Checking your diary…") appear as subtle ticked items.
  - The sequence ends on an emphasised **output card** entrance.
- After the output card holds (~2.5s), **auto-advance to the next demo and loop**.
- **Pause auto-advance** when the user taps a chip, taps pause, or otherwise interacts. Tapping a chip jumps to that demo and restarts its sequence. Replay restarts the current demo.
- Implementation: a single component with a `demos` data array, an event-player driven by `setTimeout`/`rAF`, state for `activeDemo` / `visibleEvents` / `isPlaying`. **Clear all timers** on unmount and whenever the active demo changes.

### Accessibility
- Selector chips are real buttons, keyboard-operable, with `aria-selected`/`aria-pressed` as appropriate; min 44×44px tap targets.
- The chat region uses `aria-live="polite"` so revealed messages are announced; provide an accessible label for the phone region.
- Controls have clear `aria-label`s. Honour `prefers-reduced-motion` as described above.

---

## The five demos — exact scripts (UK English, CammBot voice: plain, friendly, a touch blunt, zero jargon)

Lead with **Demo 1** and **Demo 2**. Order the chips as listed.

### Demo 1 — chip: "Daily catch-up"
**Context header:** `Today · you were on a job`
**Style:** a timeline of incoming items with agent status ticks, ending in a digest card.
Events:
1. `08:14` incoming — "Hi, do you cover Leeds? Need a quote for a bathroom."
2. agent tick — "Replied + asked 3 questions ✅"
3. `10:02` incoming — "Missed call — 07xxx 492 118"
4. agent tick — "Texted back, booked Tues 2pm ✅"
5. `11:30` incoming — "You free this week?"
6. agent tick — "Sent availability ✅"
7. `13:45` incoming — "Can you resend my invoice?"
8. agent tick — "Sent a copy ✅"

**Output card — "Today's catch-up":**
- 5 enquiries handled
- 2 jobs booked
- 1 quote sent
- **1 needs you:** "Mrs Patel wants to move Tuesday's job — your call."

**Stat line:** `~2 hrs of admin handled today · you did none of it`

---

### Demo 2 — chip: "List & optimise" (the real marketplace workflow)
**Context header:** `You → CammBot`
Events:
1. you — "[📷 photo] Selling this vintage brass lamp, no idea what to put."
2. typing indicator
3. agent — "On it. Found 12 similar sold recently — here's a listing ready to go 👇"

**Output card — listing preview:**
- **Title:** "Vintage Mid-Century Brass Table Lamp — Retro MCM Lighting, Fully Working"
- **Suggested price:** £48 *(based on 12 recent sold: £39–£60)*
- **Tags:** brass lamp · mid-century · retro lighting · MCM · vintage desk lamp
- **Description (short):** "Genuine mid-century brass table lamp. Warm retro glow, fully tested and working. A characterful piece for a desk, console or bedside."
- Neutral pill row (text only, no logos): `List on eBay` · `Etsy` · `Amazon`

Then continue:
4. buyer — "Does it ship to France?"
5. agent tick — "Replied: yes, £12 tracked, 5–7 days ✅"

**Stat line:** `47 listings optimised in bulk last week · a month of listing work in an afternoon`

---

### Demo 3 — chip: "Instant quote"
**Context header:** `New enquiry`
Events:
1. customer — "Hi, how much to clean the gutters on a 3-bed semi?"
2. typing indicator
3. agent — "Happy to help — quick couple of questions:"
4. agent — "Single or two storey? Any conservatory? Easy access round the back?"
5. customer — "Two storey, no conservatory, yep easy access."
6. typing indicator
7. agent — "Great — here's your quote 👇"

**Output card — quote:**
- Gutter clearance — 3-bed semi, two storey
- Clear gutters + flush downpipes — **£85**
- Before/after photos — included
- **Total £85** · valid 30 days
- (visual-only button) `Approve & send`

**Stat line:** `Quote ready in 40 seconds · while you carried on working`

---

### Demo 4 — chip: "Chase the money"
**Context header:** `This morning`
Events:
1. agent — "3 invoices overdue. I'll handle the chasing."
2. agent tick — "Reminder sent → J. Whitehouse (£320)"
3. agent tick — "Reminder sent → Oakfield Ltd (£1,150)"
4. agent tick — "Paid! ✅ M. Reilly cleared £930"

**Output card — "Money recap":**
- **£930 recovered** today
- 2 polite reminders sent
- **1 needs you:** "Oakfield's gone quiet — want me to call?"

**Stat line:** `£2,400 chased back this month · 0 awkward phone calls for you`

---

### Demo 5 — chip: "Reviews on autopilot"
**Context header:** `Job complete`
Events:
1. agent — "Job marked complete for the Hargreaves. Good time to ask for a review."
2. agent tick — "Sent a friendly request 🌟"
3. customer — "5 stars — brilliant job, thank you!"
4. agent tick — "Nudged them to Google — posted ✅"
5. agent — "Heads up: Mr Doyle replied 3/5. I've kept it private. Want to sort it first?"

**Output card — "Reviews this month":**
- **9 new 5-star reviews**
- 1 unhappy caught early (kept private)
- Google rating: **4.9 ★**

**Stat line:** `More 5-stars, fewer surprises · all on autopilot`

---

## Acceptance criteria

- [ ] New section renders as the **first content block after the hero**, wired into `app.jsx` following the existing pattern.
- [ ] Component lives in `sections-a.jsx`, declared in the same style as existing components; **no `import`/`export`**; works under in-browser Babel with no console errors.
- [ ] All styling in `sections.css`, using **existing tokens** from `styles.css`; Fraunces/Geist/Geist Mono used per the type rules (numbers in Geist Mono).
- [ ] Visually consistent with the rest of the site (spacing, radius, colour, restraint). It should look hand-made, not like a generic SaaS card.
- [ ] Fully legible and usable at 360px width; chips scroll horizontally with snap; phone scales cleanly. Desktop uses the two-column layout within the site container.
- [ ] All five demos play with natural pacing, typing indicators, agent status ticks, and an emphasised output card; auto-advances and loops; pauses on user interaction; chips switch + restart correctly; replay works.
- [ ] **Reduced-motion:** with `prefers-reduced-motion: reduce`, each demo shows its completed final state statically — no animation, no auto-advance — and is fully understandable.
- [ ] No layout shift / jank; Lenis smooth scroll still works; all timers cleaned up (no leaks when switching demos or unmounting).
- [ ] Accessible: keyboard-operable selector, `aria` labels, `aria-live` chat, 44px tap targets.
- [ ] No third-party logos; eBay/Etsy/Amazon shown as plain text pills. "Illustrative examples" microcopy present.
- [ ] CTA below the showcase reuses the site's existing primary call-to-action.

## Notes
- Keep copy exactly as scripted (UK English). Stats are intentionally modest and illustrative.
- If anything in the repo contradicts an assumption here (e.g. component naming, where sections are registered), **follow the repo's actual convention** and keep this feature consistent with it.
