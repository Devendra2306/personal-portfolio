'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { timelineEntries, TimelineEntry } from '@/data/timeline';
import { GlassPanel } from '@/components/shared/GlassPanel';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

function TimelineNode({ type }: { type: TimelineEntry['type'] }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const getDotColor = () => {
    switch (type) {
      case 'work': return 'var(--color-neon-cyan)';
      case 'education': return 'var(--color-electric-purple)';
      case 'achievement': return 'var(--color-system-amber)';
      default: return 'var(--color-neon-cyan)';
    }
  };

  return (
    <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--color-void-black)] border-2 border-[rgba(255,255,255,0.2)] z-10 flex items-center justify-center">
      {prefersReducedMotion ? (
        <div 
          className="w-2 h-2 rounded-full" 
          style={{ 
            backgroundColor: getDotColor(),
            boxShadow: `0 0 8px ${getDotColor()}` 
          }} 
        />
      ) : (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: false, margin: '-40% 0px -40% 0px' }}
          className="w-2 h-2 rounded-full"
          style={{ 
            backgroundColor: getDotColor(),
            boxShadow: `0 0 8px ${getDotColor()}` 
          }}
        />
      )}
    </div>
  );
}

function TimelineCard({ entry, index }: { entry: TimelineEntry, index: number }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const isEven = index % 2 === 0;
  
  // Desktop: Alternate left/right. Mobile: All right.
  const containerClasses = `relative flex flex-col md:flex-row w-full mb-16 ${
    isEven ? 'md:flex-row-reverse' : ''
  }`;
  
  // Connector line
  const connectorClasses = `hidden md:block absolute top-2 w-8 h-[2px] bg-[rgba(0,240,255,0.2)] ${
    isEven ? 'right-[50%] mr-2' : 'left-[50%] ml-2'
  }`;

  const card = (
    <div className={`w-full pl-8 md:pl-0 md:w-[calc(50%-2rem)] relative`}>
      {/* Mobile Connector */}
      <div className="block md:hidden absolute top-2 left-0 w-8 h-[2px] bg-[rgba(0,240,255,0.2)]" />
      
      <GlassPanel className="p-6 h-full">
        <span className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-neon-cyan)] block mb-2">
          [{entry.date}]
        </span>
        <h3 className="font-[family-name:var(--font-heading)] text-xl text-[var(--color-pure-white)] font-bold mb-1">
          {entry.title}
        </h3>
        <h4 className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-electric-purple)] mb-4">
          {entry.organization}
        </h4>
        <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-off-white)] opacity-80 leading-relaxed">
          {entry.description}
        </p>
      </GlassPanel>
    </div>
  );

  return (
    <div className={containerClasses}>
      <TimelineNode type={entry.type} />
      <div className={connectorClasses} />
      
      {prefersReducedMotion ? (
        card
      ) : (
        <motion.div
          initial={{ opacity: 0, x: isEven ? -30 : 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="w-full flex"
          style={{ justifyContent: isEven ? 'flex-start' : 'flex-end' }}
        >
          {card}
        </motion.div>
      )}
    </div>
  );
}

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });
  
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="timeline" aria-label="Experience" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto overflow-hidden">
      <div className="mb-20">
        <h3 className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest text-[var(--color-neon-cyan)] mb-4">
          // EXPERIENCE
        </h3>
        <h2 className="font-[family-name:var(--font-heading)] text-4xl text-[var(--color-pure-white)] font-bold tracking-tight">
          Experience Timeline
        </h2>
      </div>

      <div ref={containerRef} className="relative max-w-5xl mx-auto">
        {/* Background Line */}
        <div className="absolute top-0 bottom-0 left-0 md:left-1/2 -translate-x-1/2 w-[2px] bg-[rgba(255,255,255,0.1)]" />
        
        {/* Foreground Animated Line */}
        <div className="absolute top-0 bottom-0 left-0 md:left-1/2 -translate-x-1/2 w-[2px] overflow-hidden">
          {prefersReducedMotion ? (
            <div className="w-full h-full bg-[var(--color-neon-cyan)] shadow-[0_0_8px_rgba(0,240,255,0.5)]" />
          ) : (
            <motion.div 
              className="w-full h-full bg-[var(--color-neon-cyan)] shadow-[0_0_8px_rgba(0,240,255,0.5)] origin-top"
              style={{ scaleY }}
            />
          )}
        </div>

        {/* Entries */}
        <div className="relative z-10 pt-8 pb-12">
          {timelineEntries.map((entry, index) => (
            <TimelineCard key={entry.id} entry={entry} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
