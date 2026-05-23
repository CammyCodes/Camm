'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useReducedMotion } from '@/lib/useReducedMotion';

type CammBotPose = 'wave' | 'typing' | 'pointing' | 'thumbs-up' | 'walking' | 'idle' | 'envelope';

interface CammBotProps {
  pose: CammBotPose;
  className?: string;
}

const poseMap: Record<CammBotPose, { path: string; alt: string }> = {
  wave: { path: '/cammbot/wave.png', alt: 'CammBot waving hello friendly' },
  typing: { path: '/cammbot/typing.png', alt: 'CammBot working hard typing at a laptop' },
  pointing: { path: '/cammbot/pointing.png', alt: 'CammBot pointing forward highlighting content' },
  'thumbs-up': { path: '/cammbot/thumbs-up.png', alt: 'CammBot giving a confident thumbs up' },
  walking: { path: '/cammbot/walking.png', alt: 'CammBot walking forward through steps' },
  idle: { path: '/cammbot/idle.png', alt: 'CammBot floating peacefully' },
  envelope: { path: '/cammbot/envelope.png', alt: 'CammBot holding an envelope securely' },
};

export default function CammBot({ pose, className = 'w-48 h-48' }: CammBotProps) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Micro-tilt mechanics checking cursor proximity
  useEffect(() => {
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height / 2;
      
      const distance = Math.hypot(e.clientX - botCenterX, e.clientY - botCenterY);
      
      if (distance < 200) {
        const tiltX = ((e.clientX - botCenterX) / 200) * 3; // Maximum ±3 deg
        const tiltY = ((e.clientY - botCenterY) / 200) * 3;
        setMousePos({ x: tiltX, y: -tiltY });
      } else {
        setMousePos({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [prefersReducedMotion]);

  // Randomized slow blinking loop
  useEffect(() => {
    if (prefersReducedMotion) return;
    
    let timeoutId: NodeJS.Timeout;
    const triggerBlink = () => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
      timeoutId = setTimeout(triggerBlink, 5000 + Math.random() * 3000);
    };

    timeoutId = setTimeout(triggerBlink, 5000);
    return () => clearTimeout(timeoutId);
  }, [prefersReducedMotion]);

  const currentPose = poseMap[pose];

  return (
    <div ref={containerRef} className={`relative flex items-center justify-center ${className}`}>
      {imgError ? (
        /* CSS Placeholder bubble fallback if assets pending or missing */
        <div className="w-full h-full rounded-full bg-accent-soft text-accent border border-accent/20 font-mono font-bold text-sm tracking-wider flex items-center justify-center animate-pulse uppercase p-4 text-center">
          🤖 {pose}
        </div>
      ) : (
        <motion.div
          animate={prefersReducedMotion ? {} : {
            y: [0, -6, 0],
            rotateX: mousePos.y,
            rotateY: mousePos.x,
            opacity: isBlinking ? 0.2 : 1,
          }}
          transition={prefersReducedMotion ? {} : {
            y: { duration: 4, ease: 'easeInOut', repeat: Infinity },
            opacity: { duration: 0.1 },
            rotateX: { type: 'spring', stiffness: 120, damping: 15 },
            rotateY: { type: 'spring', stiffness: 120, damping: 15 },
          }}
          className="w-full h-full relative transform-gpu"
        >
          <Image
            src={currentPose.path}
            alt={currentPose.alt}
            fill
            sizes="(max-w-768px) 100vw, 300px"
            className="object-contain"
            priority={pose === 'wave'}
            onError={() => setImgError(true)}
          />
        </motion.div>
      )}
    </div>
  );
}