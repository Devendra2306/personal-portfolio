'use client';

import { personalInfo } from '@/data/personal';
import { SectionReveal } from '@/components/shared/SectionReveal';

export function About() {
  const infoBadges = [
    { icon: '📍', value: personalInfo.location },
    { icon: '🎓', value: personalInfo.status },
    { icon: '💻', value: personalInfo.focus },
  ];

  return (
    <section id="about" aria-label="About" className="py-24 px-6 md:px-12 lg:px-24 max-w-4xl mx-auto">
      <SectionReveal direction="up">
        <div className="flex flex-col items-center text-center">
          {/* Heading */}
          <h3 className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest text-[var(--color-neon-cyan)] mb-4">
            // ABOUT
          </h3>
          <h2 className="font-[family-name:var(--font-heading)] text-4xl md:text-5xl text-[var(--color-pure-white)] font-bold mb-8 tracking-tight">
            About Me
          </h2>

          {/* Bio */}
          <p className="font-[family-name:var(--font-body)] text-base md:text-lg text-[var(--color-off-white)] leading-relaxed max-w-2xl mb-12">
            {personalInfo.bio}
          </p>

          {/* Info Badges */}
          <div className="flex flex-wrap justify-center gap-4">
            {infoBadges.map((badge, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] backdrop-blur-md shadow-[0_0_20px_rgba(0,240,255,0.05)] transition-colors duration-300 hover:border-[rgba(0,240,255,0.3)] hover:bg-[rgba(255,255,255,0.08)]"
              >
                <span className="text-base" role="img" aria-hidden="true">
                  {badge.icon}
                </span>
                <span className="font-[family-name:var(--font-body)] text-sm text-[var(--color-off-white)] tracking-wide">
                  {badge.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}
