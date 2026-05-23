'use client';

import { useState, useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatePresence, motion } from 'framer-motion';
import PhoneFrame from '@/components/ui/PhoneFrame';
import CammBot from '@/components/ui/CammBot';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface SceneData {
  title: string;
  body: string;
  screenKey: string;
}

const scenes: SceneData[] = [
  {
    title: '1 / A customer emails asking for a price.',
    body: 'CammBot reads it, checks your prices, and drafts a clean quote ready for you to send. You just hit reply.',
    screenKey: 'quote',
  },
  {
    title: '2 / Photos in. Report out.',
    body: 'Drop your day’s photos in a folder. CammBot writes the report — what got done, what’s next, what’s a problem — and sends it to the client. Done before tea.',
    screenKey: 'report',
  },
  {
    title: '3 / Stop chasing your own money.',
    body: 'Polite reminders go out on a schedule when invoices are overdue. CammBot stays nice. The money comes in faster. You stop sending awkward "just a reminder" emails.',
    screenKey: 'invoice',
  },
  {
    title: '4 / Never lose another customer to a missed call.',
    body: 'Calls, forms, DMs, WhatsApps — all turned into a tidy list with names, numbers, and what they want. Ready when you are.',
    screenKey: 'leads',
  },
];

export default function Scrollytelling() {
  const containerRef = useRef<HTMLDivElement>(null);
  const phoneColumnRef = useRef<HTMLDivElement>(null);
  const [activeScene, setActiveScene] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP desktop pin activation rule execution
  useGSAP(() => {
    if (isMobile || prefersReducedMotion) return;

    // Pin setup across duration of parent element bounds
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: phoneColumnRef.current,
      pinSpacing: false,
    });

    const triggerElements = gsap.utils.toArray('.scrolly-text-block');
    triggerElements.forEach((el: any, i: number) => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: () => setActiveScene(i),
        onEnterBack: () => setActiveScene(i),
      });
    });
  }, { scope: containerRef, dependencies: [isMobile, prefersReducedMotion] });

  return (
    <section id="see-it-work" ref={containerRef} className="relative bg-bg border-b border-line">
      {/* Universal Heading Component Area */}
      <div className="w-full max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-12 flex flex-col items-center text-center relative z-10">
        <CammBot pose="pointing" className="w-20 h-20 mb-4" />
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent mb-2">SEE IT WORK</span>
        <h2 className="text-3xl sm:text-4xl md:text-[48px] text-ink font-display font-medium tracking-tight">
          What CammBot actually does, in four examples.
        </h2>
      </div>

      {isMobile ? (
        /* Mobile Stacking View Layout */
        <div className="w-full max-w-xl mx-auto px-4 pb-24 space-y-20">
          {scenes.map((scene, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              className="flex flex-col items-center text-center gap-8"
            >
              <div className="space-y-4">
                <h3 className="text-22 sm:text-28 font-display text-ink font-medium">{scene.title}</h3>
                <p className="text-ink-soft text-base leading-relaxed">{scene.body}</p>
              </div>
              <div className="w-[75%] flex justify-center">
                <PhoneFrame>
                  <PhoneScreenRenderer screenKey={scene.screenKey} />
                </PhoneFrame>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Desktop Pinned Dual Layout Splitting Layout */
        <div className="w-full max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-2 relative">
          
          {/* Left Text Navigation Thread */}
          <div className="flex flex-col">
            {scenes.map((scene, i) => (
              <div 
                key={i} 
                className="scrolly-text-block min-h-screen flex flex-col justify-center pr-12 transition-opacity duration-300"
                style={{ opacity: activeScene === i ? 1 : 0.25 }}
              >
                <h3 className="text-[28px] lg:text-[36px] font-display text-ink font-medium mb-4 leading-snug">
                  {scene.title}
                </h3>
                <p className="text-lg lg:text-xl text-ink-soft leading-relaxed max-w-md">
                  {scene.body}
                </p>
              </div>
            ))}
          </div>

          {/* Right Static Frame Base Workspace Container */}
          <div ref={phoneColumnRef} className="h-screen w-full flex items-center justify-center relative select-none">
            
            {/* Context Active Micro Dot Navigation Bar Component */}
            <div className="absolute right-4 flex flex-col gap-3 z-20">
              {scenes.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`rounded-full transition-all duration-300 ${activeScene === idx ? 'w-2 h-6 bg-accent' : 'w-2 h-2 bg-muted/50'}`} 
                />
              ))}
            </div>

            <motion.div 
              animate={prefersReducedMotion ? {} : { rotate: activeScene % 2 === 0 ? 1.5 : -1.5 }}
              transition={{ type: 'spring', stiffness: 80, damping: 12 }}
              className="w-full flex justify-center transform-gpu"
            >
              <PhoneFrame>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeScene}
                    initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full"
                  >
                    <PhoneScreenRenderer screenKey={scenes[activeScene].screenKey} />
                  </motion.div>
                </AnimatePresence>
              </PhoneFrame>
            </motion.div>

          </div>
        </div>
      )}
    </section>
  );
}

/* Internal Presentation Components Processing Content Rendering for Screens */
function PhoneScreenRenderer({ screenKey }: { screenKey: string }) {
  if (screenKey === 'quote') {
    return (
      <div className="h-full flex flex-col justify-between text-xs font-sans text-ink">
        <div className="bg-white p-2.5 rounded-xl border border-line shadow-xs">
          <div className="font-bold text-slate-400 text-[10px] uppercase mb-1">Incoming Email</div>
          <p className="font-semibold text-slate-800">Can I get a price for a new kitchen worktop installation?</p>
        </div>
        <div className="bg-accent-soft text-accent p-2.5 rounded-xl text-center font-mono my-2 border border-accent/10">
          ✨ got it, drafting now...
        </div>
        <div className="bg-slate-900 text-white p-3 rounded-t-xl mt-auto space-y-2 border-t border-slate-800 shadow-lg">
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>To: Customer</span>
            <span className="font-mono text-accent">Draft</span>
          </div>
          <div className="bg-slate-800 p-2 rounded-md font-mono text-[10px] space-y-1 text-slate-200">
            <p>QUOTE #402</p>
            <p>Materials & Labour: £1,250</p>
          </div>
          <button className="w-full py-2 bg-accent hover:bg-accent-glow rounded-lg font-bold text-center text-white transition-colors">
            Send Quote
          </button>
        </div>
      </div>
    );
  }

  if (screenKey === 'report') {
    return (
      <div className="h-full flex flex-col gap-2.5 text-xs text-ink font-sans">
        <div className="font-bold text-slate-500 text-[11px] px-1">Daily Project Drop</div>
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-white border border-line rounded-xl">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="aspect-square bg-slate-200 rounded-lg relative overflow-hidden flex items-center justify-center text-[10px] text-slate-400 font-mono">
              📸
            </div>
          ))}
        </div>
        <div className="flex gap-1 items-center justify-start py-0.5 px-1 text-slate-400 text-[10px]">
          <span className="animate-bounce">●</span><span className="animate-bounce delay-100">●</span><span className="animate-bounce delay-200">●</span>
          <span className="font-mono ml-1">Writing report...</span>
        </div>
        <div className="bg-white p-3 rounded-xl border border-line shadow-xs space-y-2">
          <div className="font-bold border-b border-line pb-1 text-slate-800">Site Update Report</div>
          <ul className="space-y-1.5 text-slate-600 text-[11px]">
            <li>✓ Footings poured clean</li>
            <li>✓ Next up: rebar structural placement</li>
            <li className="text-amber-600 font-medium">⚠ Skip delivery delayed 24h</li>
          </ul>
        </div>
      </div>
    );
  }

  if (screenKey === 'invoice') {
    return (
      <div className="h-full flex flex-col justify-between text-xs text-ink font-sans">
        <div className="bg-white p-3 rounded-xl border border-line shadow-xs relative overflow-hidden">
          <div className="absolute top-2 right-2 bg-rose-100 text-rose-600 font-mono text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm">
            Overdue 14 days
          </div>
          <div className="text-slate-400 font-mono text-[10px]">INVOICE #0421</div>
          <div className="text-lg font-bold text-slate-800 mt-1">£2,400.00</div>
          <div className="text-slate-500 text-[10px] mt-1">Client: Apex Lettings</div>
        </div>
        <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60 text-[11px] italic text-slate-500 text-center my-2">
          "Hi Apex, just a gentle automated note regarding invoice #0421..."
        </div>
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-center gap-3 shadow-xs mt-auto">
          <div className="w-7 h-7 rounded-full bg-success text-white flex items-center justify-center text-sm">💰</div>
          <div>
            <div className="font-bold text-emerald-900">Paid ✓</div>
            <div className="text-[10px] text-emerald-700">Invoice #0421 settled full</div>
          </div>
        </div>
      </div>
    );
  }

  if (screenKey === 'leads') {
    return (
      <div className="h-full flex flex-col gap-2.5 text-xs text-ink font-sans">
        <div className="bg-rose-50 border border-rose-100 text-rose-700 p-2 rounded-xl flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="text-base" aria-hidden="true">📞</span>
            <div>
              <div className="font-bold">Missed Call</div>
              <div className="text-[10px] text-rose-500">Today 11:45 AM</div>
            </div>
          </div>
          <span className="font-mono text-[10px] font-bold bg-rose-100 px-1.5 py-0.5 rounded-sm">07700...</span>
        </div>
        
        <div className="text-[10px] font-mono uppercase text-slate-400 tracking-wider font-bold px-1 mt-1">
          CammBot Action Log
        </div>

        <div className="bg-white rounded-xl border border-line shadow-xs divide-y divide-line overflow-hidden flex-1 flex flex-col">
          {[
            { name: 'John Green', note: 'wants a kitchen quote, Wed afternoon' },
            { name: 'Sarah Finch', note: 'boiler service inquiry urgent' },
            { name: 'Dave Miller', note: 'extension blueprint review' },
          ].map((lead, i) => (
            <div key={i} className="p-2.5 hover:bg-slate-50 transition-colors">
              <div className="flex justify-between items-center mb-0.5">
                <span className="font-bold text-slate-800">{lead.name}</span>
                <span className="text-[9px] bg-slate-100 text-slate-500 px-1 rounded-sm font-mono">New Lead</span>
              </div>
              <p className="text-slate-600 text-[11px] truncate">{lead.note}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}