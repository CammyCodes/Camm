'use client';

import { motion } from 'framer-motion';
import CammBot from '@/components/ui/CammBot';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function Guarantee() {
  const prefersReducedMotion = useReducedMotion();
  
  const headlineText = 'Pay nothing until it works.';
  const words = headlineText.split(' ');

  const badgingData = ['No contracts', 'No setup fees', 'No risk'];

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-accent-soft/30 border-y border-accent-soft relative overflow-hidden px-4 md:px-8">
      {/* Ambient center blur layout element overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] bg-accent/6 blur-[140px] rounded-full pointer-events-none" />

      {/* Embedded co-host bouncing loop position */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 w-28 h-28 md:w-40 md:h-40 pointer-events-none">
        <CammBot pose="thumbs-up" className="w-full h-full" />
      </div>

      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-accent mb-6 block">
          THE PROMISE
        </span>

        <h2 className="text-4xl sm:text-5xl md:text-[64px] text-ink font-display font-medium tracking-tight mb-8 leading-[1.05]">
          {words.map((word, index) => {
            const cleanWord = word.toLowerCase().replace(/[^a-z]/g, '');
            const isTarget = cleanWord === 'pay' || cleanWord === 'nothing';
            const isWorks = cleanWord === 'works';
            
            return (
              <motion.span
                key={index}
                className={`inline-block mr-[0.25em] ${isWorks ? 'italic font-serif' : ''}`}
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 30 }}
                whileInView={prefersReducedMotion ? {} : {
                  opacity: 1,
                  y: 0,
                  color: isTarget ? 'var(--color-accent)' : 'var(--color-ink)',
                }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{
                  delay: index * 0.12,
                  color: { delay: index * 0.12 + 0.4, duration: 0.4 },
                  default: { duration: 0.5, ease: 'easeOut' }
                }}
              >
                {word}
              </motion.span>
            );
          })}
        </h2>

        <motion.p
          initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-lg sm:text-xl md:text-[22px] text-ink-soft font-sans font-normal leading-relaxed max-w-2xl mb-12"
        >
          We do the chat for free. We do the setup for free. You only pay once it's clearly saving you time or making you money in your business. If it doesn't, you walk away owing nothing.
        </motion.p>

        {/* Action Badge Elements Center Assembly Grid */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {badgingData.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.0 + idx * 0.1, type: 'spring', stiffness: 120, damping: 12 }}
              className="px-6 py-2.5 rounded-full bg-white text-ink border border-line text-sm font-sans font-medium shadow-2xs cursor-default"
            >
              {badge}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}