'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, useSpring } from 'framer-motion';
import { Mail, Copy, Check } from 'lucide-react';
import CammBot from '@/components/ui/CammBot';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function FinalCTA() {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Magnetic Button Spring Vectors
  const x = useSpring(0, { stiffness: 150, damping: 15 });
  const y = useSpring(0, { stiffness: 150, damping: 15 });

  const emailAddress = 'ethan@ethancamm.co.uk';

  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;
      
      const distance = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);

      if (distance < 50) {
        // Magnetic attraction pulling within vector delta thresholds
        x.set(e.clientX - btnCenterX);
        y.set(e.clientY - btnCenterY);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, prefersReducedMotion]);

  const handleCopyClipboard = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed copying structural string properties to clipboard', err);
    }
  };

  return (
    <section ref={containerRef} className="py-24 md:py-32 lg:py-40 bg-bg px-4 md:px-8 text-center relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Large Visual Envelope Feature */}
        <div className="w-56 h-56 md:w-[280px] md:h-[280px] mb-8 transform-gpu">
          <CammBot pose="envelope" className="w-full h-full" />
        </div>

        <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted mb-4 block">
          READY?
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-[64px] font-display text-ink tracking-tight font-medium mb-6 leading-tight">
          Stop wasting time on admin.
        </h2>

        <p className="text-lg sm:text-xl text-ink-soft font-sans max-w-xl mx-auto mb-10 leading-relaxed">
          Book a free chat with Ethan. No pressure. No jargon. Just a friendly conversation about what’s slowing you down.
        </p>

        {/* Magnetic Action Block Target Wrapper Component */}
        <motion.a
          ref={buttonRef}
          href={`mailto:${emailAddress}?subject=Free%20chat%20about%20AI%20for%20my%20business`}
          style={prefersReducedMotion ? {} : { x, y }}
          className="group inline-flex items-center justify-center bg-accent hover:bg-accent-glow text-white text-lg font-sans font-medium px-10 py-5 rounded-full transition-shadow duration-200 shadow-md hover:shadow-xl w-full sm:w-auto transform active:scale-98 relative overflow-hidden transform-gpu"
        >
          Email Ethan →
        </motion.a>

        {/* Explicit Clipboard Alternative Backup Component */}
        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-ink-soft font-sans">
          <span>or copy: <code className="font-mono bg-line/30 px-2 py-0.5 rounded text-ink font-semibold">{emailAddress}</code></span>
          <button 
            onClick={handleCopyClipboard}
            className="p-2 rounded-full hover:bg-line/40 transition-colors text-ink-soft hover:text-accent relative"
            aria-label="Copy email address to clipboard"
          >
            {copied ? <Check className="w-4 h-4 text-success animate-scale" /> : <Copy className="w-4 h-4" />}
            
            {/* Direct Context Floating Feedback Toast */}
            {copied && (
              <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-[10px] rounded font-mono font-normal tracking-normal shadow-md animate-fade-in whitespace-nowrap">
                Copied!
              </span>
            )}
          </button>
        </div>

      </div>
    </section>
  );
}