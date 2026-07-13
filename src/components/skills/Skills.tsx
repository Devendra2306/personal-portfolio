'use client';

import { motion } from 'motion/react';
import { skillDomains } from '@/data/skills';
import { GlassPanel } from '@/components/shared/GlassPanel';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { staggerContainer, fadeUp } from '@/lib/motion-variants';

export function Skills() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const content = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skillDomains.map((domain, index) => (
        <motion.div key={domain.id} variants={prefersReducedMotion ? {} : fadeUp}>
          <GlassPanel
            hoverable
            className="h-full p-6 flex flex-col justify-between"
          >
            <div>
              <h4 className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-neon-cyan)] tracking-widest uppercase mb-4">
                [{domain.domain}]
              </h4>
              <div className="flex flex-wrap gap-2 mb-6">
                {domain.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-[rgba(255,255,255,0.05)] border border-[rgba(0,240,255,0.1)] px-2 py-1 rounded-sm font-[family-name:var(--font-mono)] text-xs text-[var(--color-off-white)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-off-white)] opacity-70">
              {domain.application}
            </p>
          </GlassPanel>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section id="skills" aria-label="Skills" className="py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="mb-12">
        <h3 className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest text-[var(--color-neon-cyan)] mb-4">
          // SKILLS
        </h3>
        <h2 className="font-[family-name:var(--font-heading)] text-4xl text-[var(--color-pure-white)] font-bold tracking-tight">
          Technical Skills
        </h2>
      </div>

      {prefersReducedMotion ? (
        content
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {content}
        </motion.div>
      )}
    </section>
  );
}
