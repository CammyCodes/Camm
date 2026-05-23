'use client';

import { motion } from 'framer-motion';
import { Bot, Globe, MessageCircle } from 'lucide-react';
import CammBot from '@/components/ui/CammBot';
import { useReducedMotion } from '@/lib/useReducedMotion';

export default function Services() {
  const prefersReducedMotion = useReducedMotion();

  const servicesData = [
    {
      icon: Bot,
      title: 'Smart helpers',
      tag: '(the agentic workflows bit)',
      body: 'Little AI workers that do the repetitive stuff for you — read emails, draft replies, write quotes, chase invoices, log info. They work in the background. You stay in charge.',
      offsetClass: 'md:translate-y-0',
    },
    {
      icon: Globe,
      title: 'Websites that actually do something',
      tag: null,
      body: 'A clean website that doesn’t just sit there. It books appointments, answers questions, captures leads and hands you customers — not just clicks.',
      offsetClass: 'md:translate-y-3', // 12px lower
    },
    {
      icon: MessageCircle,
      title: 'One-to-one consulting',
      tag: null,
      body: 'Not sure where AI fits in your business? We sit down with you, look at how you actually work, and point out exactly where it’ll save you time or money. No fluff.',
      offsetClass: 'md:translate-y-6', // 24px lower
    },
  ];

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-bg px-4 md:px-8 border-b border-line overflow-hidden">
      <div className="w-full max-w-6xl mx-auto">
        
        {/* Title Group with floating co-host */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-20 md:mb-28 max-w-3xl">
          <CammBot pose="typing" className="w-24 h-24 md:w-[120px] md:h-[120px] shrink-0" />
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-[48px] text-ink tracking-tight font-medium">
              Plain-speaking support to clear your desk.
            </h2>
          </div>
        </div>

        {/* Asymmetrical 3-Column Layout Block */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:pb-12">
          {servicesData.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <motion.div
                key={idx}
                initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ delay: idx * 0.15, duration: 0.6, ease: 'easeOut' }}
                whileHover={prefersReducedMotion ? {} : { y: -4, transition: { duration: 0.2 } }}
                className={`bg-surface p-8 rounded-3xl border border-line shadow-2xs group flex flex-col items-start transition-shadow hover:shadow-md ${prefersReducedMotion ? '' : item.offsetClass}`}
              >
                {/* Responsive Icon Element */}
                <motion.div 
                  variants={{
                    hover: { rotate: [0, -5, 5, -5, 0], transition: { duration: 0.4 } }
                  }}
                  whileHover={prefersReducedMotion ? {} : "hover"}
                  className="p-4 rounded-2xl bg-accent-soft text-accent mb-6 flex items-center justify-center"
                >
                  <IconComp className="w-6 h-6" />
                </motion.div>

                <h3 className="text-22 sm:text-28 font-display text-ink tracking-tight font-medium mb-1">
                  {item.title}
                </h3>

                {item.tag && (
                  <span className="font-mono text-xs text-muted block mb-4 uppercase tracking-wider">
                    {item.tag}
                  </span>
                )}

                <p className="text-ink-soft font-sans text-base sm:text-18 leading-relaxed mt-2">
                  {item.body}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}