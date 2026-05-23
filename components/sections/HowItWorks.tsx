'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CammBot from '@/components/ui/CammBot';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface StepData {
  num: string;
  title: string;
  body: string;
}

const steps: StepData[] = [
  { num: '1', title: 'Free chat', body: 'Tell us what’s eating your time. We listen. No sales pitch, no jargon.' },
  { num: '2', title: 'We build it for you', body: 'We set up CammBot for your business. You don’t lift a finger.' },
  { num: '3', title: 'You watch it work', body: 'See it in action. Try it. Break it. We tweak until it’s right.' },
  { num: '4', title: 'You only pay when it pays off', body: 'Saving you time or making you money? Brilliant. If not, you owe nothing.' },
];

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // Scroll Tracking for SVG Path Drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 lg:py-40 bg-bg px-4 md:px-8 border-b border-line relative overflow-hidden">
      <div className="w-full max-w-2xl mx-auto relative">
        
        <div className="text-center mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-[48px] text-ink font-display font-medium tracking-tight">
            How it works in four steps
          </h2>
        </div>

        {/* Dynamic Timeline Tracker Vector Component */}
        <div className="absolute left-6 top-32 bottom-24 w-[2px] bg-line pointer-events-none hidden sm:block">
          <motion.div 
            style={prefersReducedMotion ? { scaleY: 1 } : { scaleY }} 
            className="w-full h-full bg-accent origin-top transform-gpu" 
          />
        </div>

        {/* Sequential Grid Item Layout Thread */}
        <div className="space-y-16 relative">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8 relative">
              
              {/* Giant Numeric Column Display Block */}
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.3 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="font-display text-[64px] sm:text-[80px] leading-none font-bold text-accent sm:w-16 flex items-center justify-start sm:justify-center shrink-0 z-10 bg-bg"
              >
                {step.num}
              </motion.div>

              {/* Text Blocks Content Context Layout Grid */}
              <div className="flex-1 pt-2">
                <motion.h3 
                  initial={{ opacity: 0, x: prefersReducedMotion ? 0 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="text-xl sm:text-22 font-sans font-bold text-ink mb-2"
                >
                  {step.title}
                </motion.h3>
                <p className="text-ink-soft text-base sm:text-18 leading-relaxed">
                  {step.body}
                </p>
              </div>

              {/* Step 4 Context Mascot Insertion Alignment Rule */}
              {idx === 3 && (
                <div className="absolute top-full sm:top-auto sm:left-full mt-4 sm:mt-0 sm:-ml-12 w-24 h-24 pointer-events-none">
                  <CammBot pose="walking" className="w-full h-full" />
                </div>
              )}

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}