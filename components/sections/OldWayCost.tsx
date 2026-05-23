'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from '@/lib/useReducedMotion';

interface StatCardProps {
  targetNum: number;
  label: string;
  index: number;
}

function StatCard({ targetNum, label, index }: StatCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: '-100px' });
  const [count, setCount] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setCount(targetNum);
      return;
    }

    let start = 0;
    const duration = 1200; // 1.2s execution
    const totalFrames = Math.round(duration / 16);
    const counterStep = targetNum / totalFrames;
    let frame = 0;

    const counterInterval = setInterval(() => {
      frame++;
      start += counterStep;
      if (frame >= totalFrames) {
        clearInterval(counterInterval);
        setCount(targetNum);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counterInterval);
  }, [isInView, targetNum, prefersReducedMotion]);

  return (
    <motion.div
      ref={cardRef}
      initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
      className="bg-surface p-8 rounded-3xl border border-line flex flex-col justify-between shadow-xs"
    >
      <span className="font-mono text-3xl sm:text-4xl lg:text-[48px] text-accent font-bold tracking-tight mb-2">
        {count} hrs / week
      </span>
      <p className="text-ink-soft font-sans font-medium text-base sm:text-18">{label}</p>
    </motion.div>
  );
}

export default function OldWayCost() {
  const prefersReducedMotion = useReducedMotion();
  const closingLine = "That's nearly half a working day. Every day. Gone.";

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-bg px-4 md:px-8 border-b border-line">
      <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
        
        <div className="text-center max-w-3xl mb-16 md:mb-24">
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-muted mb-4 block">
            THE OLD WAY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-[48px] text-ink mb-6 tracking-tight font-medium">
            How many hours a week are you losing to this?
          </h2>
          <p className="text-lg md:text-xl text-ink-soft">
            These are the jobs that quietly eat your week — for almost every business we talk to.
          </p>
        </div>

        {/* 2x2 Clean Minimalist Layout Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          <StatCard targetNum={7} label="Writing quotes and proposals" index={0} />
          <StatCard targetNum={5} label="Chasing emails and replies" index={1} />
          <StatCard targetNum={4} label="Following up unpaid invoices" index={2} />
          <StatCard targetNum={6} label="Sorting calls, leads and bookings" index={3} />
        </div>

        {/* Emotional impact Landing Quote Block */}
        <div className="mt-20 md:mt-28 max-w-3xl text-center">
          <blockquote className="text-2xl sm:text-3xl md:text-[36px] font-display text-ink leading-normal italic">
            {closingLine.split(' ').map((word, idx) => (
              <motion.span
                key={idx}
                className="inline-block mr-[0.25em]"
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                {word}
              </motion.span>
            ))}
          </blockquote>
        </div>

      </div>
    </section>
  );
}