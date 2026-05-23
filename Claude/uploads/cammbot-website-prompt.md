# CammBot — Website Build Prompt

> Paste this whole document into your coding agent (v0, Lovable, Cursor, Claude Code, etc.) as the build brief. It is self-contained.

---

## Role

You are a senior frontend engineer and designer. Build a single-page marketing website for **CammBot** — a small AI consultancy run by Ethan Camm that helps small and medium businesses set up AI workflows, custom websites, and personalised consulting.

The site must feel **handcrafted, not AI-generated**. Plain language a tradesperson reading on their phone at lunch instantly understands. Scroll-driven storytelling that physically demonstrates the polish Ethan delivers. One repeated CTA: email `ethan@ethancamm.co.uk`.

---

## Tech stack (use exactly this)

- **Next.js 15** (App Router) + **React 19** + **TypeScript** + **Tailwind CSS**
- **`motion`** (Framer Motion v11+) — declarative React animations
- **`gsap`** + **`ScrollTrigger`** + **`@gsap/react`** — for the pinned scrollytelling section only
- **`lenis`** — smooth scroll
- **`lucide-react`** — icons
- **`next/font/google`** — type loading
- **`clsx`** + **`tailwind-merge`** — class composition

Deploy target: Vercel.

---

## Design tokens

### Colours

```css
--bg:            #FAF9F5;  /* warm off-white page base */
--surface:       #FFFFFF;  /* elevated cards */
--ink:           #0B0F1A;  /* near-black with cool undertone */
--ink-soft:      #475569;  /* secondary text */
--muted:         #94A3B8;  /* tertiary text */
--line:          #E5E1D8;  /* warm borders */
--accent:        #2563EB;  /* electric blue — the brand colour */
--accent-glow:   #3B82F6;
--accent-soft:   #DBEAFE;
--success:       #10B981;  /* for guarantee/thumbs-up moments */
```

### Typography (do not substitute)

- **Display:** **Fraunces** — variable, opsz 144, soft warm serif via `next/font/google`. Use italic on emphasis words for character.
- **Body:** **Geist Sans** via `next/font/google`.
- **Mono / numbers:** **Geist Mono** for stat counters and small caps eyebrows.

Type scale: 14 / 16 / 18 / 22 / 28 / 36 / 48 / 64 / 80.
Line heights: 1.05 on display, 1.55 on body.

**Do not use Inter, Roboto, system-ui or Space Grotesk.** They are everywhere; we want character.

### Spacing & rhythm

- Section vertical padding: `py-24 md:py-32 lg:py-40`
- Max content width: `max-w-6xl`
- Inner prose: `max-w-3xl`
- Generosity > density. Lean into whitespace.

### Texture & atmosphere

- Subtle SVG noise/grain overlay across the whole page at ~3% opacity (single fixed-position element with `pointer-events: none`).
- 2–3 radial gradient halos in `--accent` at 6–10% opacity, blurred large, placed asymmetrically.
- Soft warm cream-to-white gradient as page base.
- A faint dotted grid (12px gap, `--line`, 30% opacity) behind the hero only, fading at edges.

### Radii

- Buttons: `rounded-full` (pill)
- Cards: `rounded-3xl`
- Phone mockup: `rounded-[2.5rem]`

### **Banned aesthetics**

No purple gradients on white. No glassmorphism overload. No tilted-cards-stacked-behind-cards. No generic "AI startup" hero with abstract 3D shapes. No 4-column feature grids of equal cards. No "Trusted by" logo bars unless real logos are provided.

---

## CammBot mascot

CammBot is a friendly little robot character — the **host of the site**, not a logo. Images will be supplied by the user. Reference these paths:

| Pose | Path | Where |
|---|---|---|
| Waving | `/public/cammbot/wave.png` | Hero |
| Typing at laptop | `/public/cammbot/typing.png` | Services |
| Pointing forward | `/public/cammbot/pointing.png` | Scrollytelling |
| Thumbs up | `/public/cammbot/thumbs-up.png` | Guarantee |
| Walking forward | `/public/cammbot/walking.png` | How it works |
| Idle floating | `/public/cammbot/idle.png` | Footer + accents |
| Holding envelope | `/public/cammbot/envelope.png` | Final CTA |

For every CammBot appearance, apply via a shared `<CammBot pose="..." />` component:

- **Gentle floating idle:** `translateY` ±6px, 4s ease-in-out, infinite (Motion `animate`)
- **Slow blink:** brief opacity dip on the whole image every 5–8 seconds, randomised
- **Cursor proximity tilt:** micro-tilt ±3° when cursor is within ~200px (use mouse position state)

If images are not yet provided, render a clearly-marked CSS placeholder bubble in `--accent-soft` with the pose name inside (e.g. "🤖 wave"), so layout is fully testable before assets arrive.

---

## Page structure — section by section

The page is a single scrolling document. Each section gets its own component under `components/sections/`.

---

### Section 1 — Hero

**Purpose:** Communicate value in five seconds. Establish CammBot.

**Layout:** Two columns on desktop — text left, CammBot right. Stacked on mobile (text first, then CammBot).

**Copy (use verbatim):**

- Eyebrow (small caps, Geist Mono, `--accent`):
  `AI THAT DOES THE BORING STUFF`
- H1 (Fraunces display, ~80px desktop / 48px mobile, italic on the word *robot*):
  **We build the robot. You get on with the job.**
- Subhead (Geist Sans, 22px):
  Custom AI helpers for trades, property, services and small businesses. They handle quotes, emails, invoices, leads and admin. You get your time back.
- Trust line (small, `--ink-soft`):
  Free chat. Free setup. You only pay when it's clearly saving you time or making you money.
- Primary CTA — pill button, `--accent` background, white text:
  `Email Ethan →` → `mailto:ethan@ethancamm.co.uk?subject=Free%20chat%20about%20AI%20for%20my%20business`
- Secondary CTA — ghost button:
  `See what it does ↓` → smooth scroll to `#see-it-work`

**Animation (on load):**

Use Motion. Stagger reveal:
1. Eyebrow fades up (0.0s)
2. Headline reveals word-by-word, stagger 0.08s (0.15s)
3. Subhead fades up (0.75s)
4. Trust line fades up (0.9s)
5. CTAs fade up together (1.05s)
6. CammBot enters with a small bounce (1.2s), then begins its float-loop

Add a gentle scroll-linked parallax: as the user scrolls in the first ~300px, the headline translates up at 1.2× scroll speed, CammBot at 0.8×.

**Background:**

- Warm cream base (`--bg`)
- Radial halo of `--accent` at top-right, ~8% opacity, large blur
- Dotted grid behind hero only, fading at edges
- Noise overlay (page-wide)

---

### Section 2 — The cost of doing things the old way

**Purpose:** Make the pain concrete.

**Layout:** Centered column, then a 2×2 stat grid.

**Copy:**

- Eyebrow: `THE OLD WAY`
- H2 (Fraunces, ~48px): How many hours a week are you losing to this?
- Subhead: These are the jobs that quietly eat your week — for almost every business we talk to.

**Stat cards (2×2):**

| Number | Label |
|---|---|
| **7 hrs / week** | Writing quotes and proposals |
| **5 hrs / week** | Chasing emails and replies |
| **4 hrs / week** | Following up unpaid invoices |
| **6 hrs / week** | Sorting calls, leads and bookings |

**Closing line** (Fraunces italic, ~36px, centered, generous top margin):

> *That's nearly half a working day. Every day. Gone.*

**Animation:**

- Cards fade up on scroll into view (Motion `whileInView`, stagger 0.1s)
- Numbers count up from 0 → final value when card enters viewport (use a `useCountUp` hook keyed off `useInView`; ~1.2s duration, ease-out)
- Closing line: word-by-word reveal on entry, slightly slower stagger than headlines (0.1s per word) — this line needs to land

---

### Section 3 — Three services

**Purpose:** Show what's on offer in plain words.

**Layout:** Three columns on desktop, stacked on mobile. Vary the cards' vertical position slightly (the middle card sits 12px lower, the right card 24px lower) — asymmetric, not a boring grid.

**Card 1**
- Icon (lucide): `Bot`
- Title: **Smart helpers**
- Tagline (mono, muted): *(the agentic workflows bit)*
- Body: Little AI workers that do the repetitive stuff for you — read emails, draft replies, write quotes, chase invoices, log info. They work in the background. You stay in charge.

**Card 2**
- Icon (lucide): `Globe`
- Title: **Websites that actually do something**
- Body: A clean website that doesn't just sit there. It books appointments, answers questions, captures leads and hands you customers — not just clicks.

**Card 3**
- Icon (lucide): `MessageCircle`
- Title: **One-to-one consulting**
- Body: Not sure where AI fits in your business? We sit down with you, look at how you actually work, and point out exactly where it'll save you time or money. No fluff.

**Decorative:** Place the `typing.png` CammBot pose floating to one side of the section title (small, ~120px wide).

**Animation:**

- Stagger fade-up on scroll into view (Motion, 0.15s stagger)
- On hover: card lifts 4px, soft shadow expands, icon does a single 5° wiggle (Motion variant)

---

### Section 4 — Scrollytelling centrepiece ⭐

**Purpose:** A pinned phone mockup that morphs through four screens as the user scrolls. **This is the signature moment of the site.** Spend the most time here.

**Anchor:** `<section id="see-it-work">`

**Layout (desktop ≥ 768px):**

- Two columns. Left (50%): scrolling copy blocks, one per scene (each ~100vh tall). Right (50%): a pinned phone mockup that stays in view while the copy scrolls past.
- Above the pinned area, a centered heading block:
  - Eyebrow: `SEE IT WORK`
  - H2 (Fraunces, ~48px): What CammBot actually does, in four examples.

**Layout (mobile < 768px):**

- **No pin.** Stack each scene vertically: copy on top, phone mockup below at ~70% width, full-width section. Simple fade-in on scroll for each scene. GSAP pinning is unreliable on iOS Safari — do not use it on mobile.

**Implementation (desktop):**

Use GSAP + ScrollTrigger via `useGSAP` from `@gsap/react`. Pin the phone column for the duration of the section. Each scene is a separate ScrollTrigger that toggles an `activeScene` state. On state change, cross-fade the phone screen contents and the copy.

```ts
// Sketch
useGSAP(() => {
  if (window.innerWidth < 768) return;
  ScrollTrigger.create({
    trigger: '#scrollytelling',
    start: 'top top',
    end: 'bottom bottom',
    pin: '.phone-frame',
    pinSpacing: false,
  });
  scenes.forEach((scene, i) => {
    ScrollTrigger.create({
      trigger: scene,
      start: 'top 60%',
      end: 'bottom 40%',
      onEnter: () => setActiveScene(i),
      onEnterBack: () => setActiveScene(i),
    });
  });
}, { scope: containerRef });
```

**Lenis ↔ GSAP sync (critical):**

```ts
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

Without this, the pin will desync from the scroll position.

#### The 4 scenes

**Scene 1 — Quote drafting**
- Side headline: **1 / A customer emails asking for a price.**
- Body: CammBot reads it, checks your prices, and drafts a clean quote ready for you to send. You just hit reply.
- Phone screen: incoming email at top → a CammBot speech bubble appears mid-screen ("got it, drafting now…") → a finished quote slides up in a compose window with a `Send` button

**Scene 2 — Daily report**
- Side headline: **2 / Photos in. Report out.**
- Body: Drop your day's photos in a folder. CammBot writes the report — what got done, what's next, what's a problem — and sends it to the client. Done before tea.
- Phone screen: a 2×3 grid of photo thumbnails → typing dots → a finished message card with bullet points ("✓ Footings poured / Next: rebar / ⚠ Skip delivery delayed")

**Scene 3 — Invoice chasing**
- Side headline: **3 / Stop chasing your own money.**
- Body: Polite reminders go out on a schedule when invoices are overdue. CammBot stays nice. The money comes in faster. You stop sending awkward "just a reminder" emails.
- Phone screen: invoice card with red "Overdue 14 days" badge → CammBot drafts a friendly reminder → notification slides in: "💰 Paid ✓ — Invoice #0421"

**Scene 4 — Lead capture**
- Side headline: **4 / Never lose another customer to a missed call.**
- Body: Calls, forms, DMs, WhatsApps — all turned into a tidy list with names, numbers, and what they want. Ready when you are.
- Phone screen: missed call notification → CammBot logging icon → tidy contact list with three entries (name, number, one-line note like "wants a kitchen quote, Wed afternoon")

**Phone mockup design:**

Build a reusable `<PhoneFrame>` component. Realistic but stylised: dark bezel, subtle inner shadow, status bar with time/battery, content area swappable via children. **Do not** use a real iPhone bezel image (legal grey area). Make it generic-modern.

**Decorative:** The `pointing.png` CammBot pose floats beside the section title at the top.

**Animation:**

- Phone screen transitions: cross-fade (0.4s) with a slight scale (0.96 → 1) on incoming content. Use `<AnimatePresence mode="wait">` keyed off `activeScene`.
- Copy block transitions: word-stagger reveal as the new scene activates, previous block fades.
- Phone frame itself does a tiny ±1.5° rotation per scene for life (not jarring — subtle).
- Small vertical progress indicator on the right edge of the phone column: 4 dots, the active one growing to a pill in `--accent`.

---

### Section 5 — The guarantee

**Purpose:** Make the offer impossible to miss. This is the differentiator. **Do not bury it.**

**Layout:** Full-width, isolated section with thin `--accent-soft` border top and bottom. Centered single column. The `thumbs-up.png` CammBot pose floats in the corner with a subtle bounce-loop. Generous padding above and below.

**Background:** Subtle `--accent-soft` tint base with a single soft radial halo behind the text in `--accent` at 12% opacity.

**Copy:**

- Eyebrow: `THE PROMISE`
- H2 (Fraunces, very large ~64px desktop, italic on the word *works*):
  **Pay nothing until it works.**
- Body (Geist Sans, ~22px, max-w-2xl, centered):
  We do the chat for free. We do the setup for free. You only pay once it's clearly saving you time or making you money in your business. If it doesn't, you walk away owing nothing.
- Three pill badges centred underneath:
  `No contracts` · `No setup fees` · `No risk`

**Animation:**

- H2: massive scroll-triggered word reveal (Motion stagger 0.12s — slower than other sections; this is THE moment). The phrase "Pay nothing" highlights to `--accent` on a 0.4s delay after it lands.
- Body fades in below at 0.8s.
- Pills slide in with stagger and a subtle scale-bounce (1.1 → 1).
- Thumbs-up CammBot pops in with a small jump animation.

---

### Section 6 — How it works in four steps

**Purpose:** Demystify the process. Remove friction from booking.

**Layout:** Vertical timeline. Single column, `max-w-2xl`, centered. A vertical line on the left animates drawing in (top to bottom) as the user scrolls through the section.

**Implementation of the drawing line:**

Use Motion's `useScroll` + `useTransform` mapped to an SVG `<line>`'s `pathLength` or a div's `scaleY` from 0 → 1. Anchor the scroll progress to the section's bounding box.

**Steps:**

1. **Free chat** — Tell us what's eating your time. We listen. No sales pitch, no jargon.
2. **We build it for you** — We set up CammBot for your business. You don't lift a finger.
3. **You watch it work** — See it in action. Try it. Break it. We tweak until it's right.
4. **You only pay when it pays off** — Saving you time or making you money? Brilliant. If not, you owe nothing.

Each step: huge number (Fraunces, `--accent`, ~80px), title (Geist Sans bold, 22px), body (`--ink-soft`, 18px).

**Decorative:** The `walking.png` CammBot pose appears beside step 4 (walking forward toward the next section).

**Animation:**

- Connecting line draws from top to bottom mapped to scroll progress
- Each step number does a "stamp" animation (scale 1.3 → 1, ease-out, 0.4s) when it enters view
- Step titles fade in slightly after their numbers

---

### Section 7 — Who it's for

**Purpose:** Welcome everyone. Make the broad audience explicit.

**Layout:** Centered. Headline above a relaxed cluster of floating pill badges.

**Copy:**

- Eyebrow: `WHO IT'S FOR`
- H2 (Fraunces, ~48px): Built for businesses that have better things to do than paperwork.

**Pills (scatter across max-w-4xl, random rotation ±3°, varied vertical offset ±20px):**

- Trades & construction
- Property & lettings
- Professional services
- Small businesses
- E-commerce
- Agencies
- Anyone drowning in admin

**Animation:**

- Pills float in from random offsets (Motion stagger; each from a random 30–60px offset), settle into their rotated final positions
- Subtle continuous wobble after settling (±0.5°, 6s loop, very slow) — gives the section gentle life

---

### Section 8 — Final CTA

**Purpose:** Convert. Make emailing dead-simple.

**Layout:** Big, centred, generous padding. The `envelope.png` CammBot pose as the visual centrepiece, sized large (~280px on desktop).

**Copy:**

- Eyebrow: `READY?`
- H2 (Fraunces, ~64px): Stop wasting time on admin.
- Subhead: Book a free chat with Ethan. No pressure. No jargon. Just a friendly conversation about what's slowing you down.
- Big pill button (`--accent` bg, white text, larger than the hero button):
  `Email Ethan →` → `mailto:ethan@ethancamm.co.uk?subject=Free%20chat%20about%20AI%20for%20my%20business`
- Underneath the button (smaller, `--ink-soft`):
  or copy: `ethan@ethancamm.co.uk` [📋] *(clickable copy-to-clipboard icon with a brief "Copied!" toast)*

**Animation:**

- H2 reveals word by word as it enters view
- CammBot envelope: subtle parallax — extends the envelope slightly toward the cursor position (translateX/Y ±15px based on mouse position relative to the image centre)
- Button: **magnetic hover** — when the cursor is within ~50px, the button shifts toward the cursor with a spring (Motion spring, stiffness 150, damping 15). Reset when cursor leaves.
- Button gradient subtly shifts on hover (lighten by ~5%).

---

### Section 9 — Footer

**Layout:** Single row on desktop, stacked on mobile. `py-12`, border-top in `--line`.

**Content:**
- Left: small `idle.png` CammBot (40px) + "Built by Ethan Camm" (Geist Sans, `--ink-soft`)
- Centre: `ethan@ethancamm.co.uk` (linked mailto)
- Right: `© 2026`

---

## Animation library usage rules

### Use Motion (Framer Motion) for:
- Component-level reveals (`whileInView`, `initial`, `animate`, `exit`)
- All stagger animations
- Hover/tap micro-interactions
- Page-load hero stagger
- Pill clouds in Section 7
- Magnetic button (Section 8)
- The connecting line in Section 6 (scroll-linked via `useScroll`)

### Use GSAP + ScrollTrigger for:
- **Only** the pinned scrollytelling section (Section 4) on desktop
- Anywhere you need true pin-and-scrub behaviour Motion can't cleanly express

### Use Lenis for:
- Smooth scroll across the entire page
- Initialise in a top-level `<SmoothScroll>` wrapper in `app/layout.tsx`
- **Critical:** sync Lenis with GSAP using the snippet in Section 4. Without this, the pin will desync.

### Reduced motion:

```ts
const prefersReducedMotion = useReducedMotion(); // motion's hook
```

When set, disable: Lenis smooth scroll, all GSAP animations, CammBot float/blink loops, magnetic button, parallax. Keep: simple opacity fades on scroll-in, basic hover state changes. Test by toggling the OS setting.

---

## Copy tone — say this, not that

**Say:**
- "Stop typing the same email three times a day"
- "Your phone fills the customer list, not you"
- "We build the robot. You get on with the job."
- "Saving you time or making you money"
- "Tea break-friendly"
- "Email Ethan"
- "It just works"

**Never say:**
- "Leverage", "synergy", "ecosystem", "platform", "solution"
- "AI-powered", "cutting-edge", "next-generation"
- "Streamline operational efficiency"
- "Bespoke agentic orchestration layer"
- "Empower your workflow"
- "Transform your business"
- "Unlock the power of…"

**The test:** if a 50-year-old builder reading this on his phone at lunch wouldn't say it down the pub, it doesn't go on the page.

---

## Accessibility (non-negotiable)

- All animations behind `prefers-reduced-motion`
- Semantic HTML — `<section>`, single `<h1>`, real `<button>` and `<a>` elements
- All CammBot images: descriptive `alt` text (e.g. `alt="CammBot waving hello"`)
- Colour contrast: WCAG AA on all text (verify with Lighthouse)
- Keyboard navigation: every interactive element tab-reachable, visible focus state (custom but clearly distinct from hover)
- Mailto links must work on mobile tap

---

## Suggested file structure

```
app/
  layout.tsx              // fonts (next/font), Lenis wrapper, metadata
  page.tsx                // composes sections
  globals.css             // CSS vars, base styles
components/
  sections/
    Hero.tsx
    OldWayCost.tsx
    Services.tsx
    Scrollytelling.tsx    // GSAP pinned
    Guarantee.tsx
    HowItWorks.tsx
    WhoItsFor.tsx
    FinalCTA.tsx
    Footer.tsx
  ui/
    Button.tsx
    Pill.tsx
    CammBot.tsx           // image + float/blink/tilt
    PhoneFrame.tsx
    NoiseOverlay.tsx
    Eyebrow.tsx
  motion/
    SmoothScroll.tsx      // Lenis wrapper + GSAP sync
    SplitText.tsx         // word-stagger helper
    CountUp.tsx           // scroll-triggered number counter
    MagneticButton.tsx
lib/
  cn.ts                   // clsx + tailwind-merge
  useReducedMotion.ts
public/
  cammbot/
    wave.png
    typing.png
    pointing.png
    thumbs-up.png
    walking.png
    idle.png
    envelope.png
  noise.svg
```

---

## SEO / metadata

```ts
// app/layout.tsx metadata
{
  title: 'CammBot — AI that does the boring stuff for your business',
  description: 'Custom AI helpers for trades, property, services and small businesses. Quotes, emails, invoices, leads, admin — handled. Free chat. Free setup. You only pay when it works.',
  openGraph: {
    title: 'CammBot — We build the robot. You get on with the job.',
    description: 'Custom AI workflows, websites and consulting for small businesses. Free until it works.',
    images: ['/og.png'],  // 1200×630, hero pose + headline
  },
}
```

---

## Final QA checklist

Before declaring done:

- [ ] Mobile Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95
- [ ] Cumulative Layout Shift < 0.1
- [ ] All seven CammBot poses placed correctly (or clearly-marked placeholders if assets pending)
- [ ] Scrollytelling section pins cleanly on desktop, stacks vertically below 768px
- [ ] Phone mockup screen contents render distinctly for each of the four scenes
- [ ] Every CTA opens the mail client to `ethan@ethancamm.co.uk` with subject line
- [ ] Copy-to-clipboard works in Section 8 with a brief toast
- [ ] `prefers-reduced-motion` disables all heavy animations
- [ ] No purple gradients, no glassmorphism, no AI-startup clichés
- [ ] No use of Inter, Roboto or Space Grotesk
- [ ] Hero passes the **5-second test**: a stranger reading the hero alone understands what's offered and what to do next
- [ ] Tested on iOS Safari and Android Chrome — scroll feels smooth, pin doesn't break

---

## A final note to the building agent

This site is a small consultancy's calling card. It must feel handcrafted. Choose intentional, restrained details over busy ones. The CammBot character is the soul of the site — treat the mascot like a small co-host, not a sticker.

More polish on the **hero**, the **scrollytelling section**, and the **guarantee** beats even polish everywhere else. If you have to skimp somewhere, skimp on Section 7's pill animations, not on Section 4's pinned phone.

Build it like you're proud of it.
