'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ArrowDown } from 'lucide-react';
import CammBot from '@/components/ui/CammBot';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  // Exact Copy Block Arrays for Word Reveal Animations
  const titleString = 'We build the robot. You get on with the job.';
  const titleWords = titleString.split(' ');

  const handleScrollDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById('see-it-work')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-24 md:py-32 lg:py-40 overflow-hidden px-4 md:px-8 border-b border-line">
      {/* Faint edge-fading background grid & ambient structural setup */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at center, transparent 60%, var(--color-bg) 100%), 
                            radial-gradient(var(--color-line) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 12px 12px'
        }}
      />
      
      {/* Micro accent top-right background halo blur */}
      <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-accent/8 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-center z-10">
        
        {/* Left Messaging Copy Column */}
        <div className="md:col-span-7 flex flex-col items-start text-left">
          
          <motion.span 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="font-mono text-xs font-bold uppercase tracking-wider text-accent mb-4"
          >
            AI THAT DOES THE BORING STUFF
          </motion.span>

          <h1 className="text-4xl sm:text-5xl lg:text-[80px] leading-[1.05] text-ink font-display font-medium tracking-tight mb-6">
            {titleWords.map((word, i) => {
              const isRobot = word.toLowerCase().replace(/[^a-z]/g, '') === 'robot';
              return (
                <motion.span
                  key={i}
                  className={`inline-block mr-[0.25em] ${isRobot ? 'italic font-serif text-accent drop-shadow-xs' : ''}`}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: 'easeOut' }}
                >
                  {word}
                </motion.span>
              );
            })}
          </h1>

          <motion.p 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.6 }}
            className="text-lg sm:text-xl md:text-2xl text-ink-soft max-w-xl font-sans font-normal leading-relaxed mb-4"
          >
            Custom AI helpers for trades, property, services and small businesses. They handle quotes, emails, invoices, leads and admin. You get your time back.
          </motion.p>

          <motion.p 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-sm text-ink-soft/80 font-sans mb-8"
          >
            Free chat. Free setup. You only pay when it's clearly saving you time or making you money.
          </motion.p>

          <motion.div 
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.5 }}
            className="flex flex-wrap gap-4 items-center w-full sm:w-auto"
          >
            <a 
              href="mailto:ethan@ethancamm.co.uk?subject=Free%20chat%20about%20AI%20for%20my%20business"
              className="group inline-flex items-center justify-center bg-accent hover:bg-accent-glow text-white font-sans font-medium px-8 py-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto transform active:scale-98"
            >
              Email Ethan
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </a>
            <button 
              onClick={handleScrollDown}
              className="inline-flex items-center justify-center text-ink-soft hover:text-ink font-sans font-medium px-6 py-4 rounded-full transition-colors w-full sm:w-auto hover:bg-line/20"
            >
              See what it does
              <ArrowDown className="ml-2 w-4 h-4 animate-bounce" />
            </button>
          </motion.div>
        </div>

        {/* Right CammBot Mascot Layout Column */}
        <div className="md:col-span-5 flex justify-center items-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, type: 'spring', stiffness: 100, damping: 12 }}
            className="w-72 h-72 md:w-96 md:h-96"
          >
            <CammBot pose="wave" className="w-full h-full" />
          </motion.div>
        </div>

      </div>
    </section>
  );
}