'use client';

import { motion } from 'framer-motion';
import { useReducedMotion } from '@/lib/useReducedMotion';

const pills = [
  'Trades & construction',
  'Property & lettings',
  'Professional services',
  'Small businesses',
  'E-commerce',
  'Agencies',
  'Anyone drowning in admin',
];

export default function WhoItsFor() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-bg px-4 md:px-8 border-b border-line overflow-hidden">
      <div className="w-full max-w-4xl mx-auto text-center">
        
        <div className="max-w-2xl mx-auto mb-16">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted mb-4 block">
            WHO IT’S FOR
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[48px] text-ink font-display font-medium tracking-tight">
            Built for businesses that have better things to do than paperwork.
          </h2>
        </div>

        {/* Relaxed Asymmetrical Cloud Assembly Layout Block */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-w-3xl mx-auto px-2">
          {pills.map((pill, idx) => {
            // Precise pseudo-random variance variables generation
            const rotation = prefersReducedMotion ? 0 : (idx % 3 === 0 ? 2.5 : idx % 2 === 0 ? -2 : 1.5);
            const yOffset = prefersReducedMotion ? 0 : (idx % 2 === 0 ? 8 : -8);

            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: idx * 0.08, duration: 0.5, ease: 'easeOut' }}
                style={prefersReducedMotion ? {} : { rotate: rotation, y: yOffset }}
                animate={prefersReducedMotion ? {} : {
                  rotate: [rotation, rotation + 0.4, rotation - 0.4, rotation],
                }}
                transition-loop={prefersReducedMotion ? {} : {
                  rotate: { duration: 6, ease: 'easeInOut', repeat: Infinity, delay: idx * 0.3 }
                }}
                className="px-6 py-3 rounded-full bg-surface text-ink border border-line shadow-2xs font-sans font-medium text-base hover:border-accent/40 hover:text-accent transition-colors cursor-default select-none"
              >
                {pill}
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}