'use client';

import { motion } from 'motion/react';
import { personalInfo, heroTagline } from '@/data/personal';
import { GlowButton } from '@/components/shared/GlowButton';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function Hero() {
  const prefersReducedMotion = usePrefersReducedMotion();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  // Specific word reveal variants
  const wordContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.08 },
    },
  };

  const wordVariants = {
    hidden: { y: '120%' },
    visible: {
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const charContainerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.04, delayChildren: 0.1 },
    },
  };

  const charVariants = {
    hidden: { y: '120%' },
    visible: {
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Static render for reduced motion
  if (prefersReducedMotion) {
    return (
      <section
        id="hero"
        aria-label="Hero"
        className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-16"
      >
        <div
          className="absolute inset-0 -z-10"
          style={{
            background: 'radial-gradient(ellipse at 70% 50%, rgba(196, 145, 122, 0.1) 0%, transparent 60%), linear-gradient(180deg, #0A0A0F 0%, #0D0D12 100%)',
          }}
        />

        <div className="max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <p className="font-[family-name:var(--font-mono)] text-sm md:text-base text-[#C4917A] tracking-wide mb-4">
              Hi, I&apos;m
            </p>

            <h1 className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-8xl font-bold text-[var(--color-pure-white)] tracking-tight leading-[0.95]">
              {personalInfo.name}
            </h1>

            <p className="mt-4 font-[family-name:var(--font-mono)] text-lg md:text-xl text-[var(--color-off-white)] opacity-60 tracking-wide">
              {personalInfo.title}
            </p>

            <p className="mt-6 font-[family-name:var(--font-body)] text-base md:text-lg text-[var(--color-off-white)] leading-relaxed max-w-lg">
              {heroTagline}
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <GlowButton variant="primary" href="#projects">
                PROJECTS
              </GlowButton>
              <GlowButton variant="secondary" href="#contact">
                CONTACT
              </GlowButton>
              <GlowButton variant="secondary" href={personalInfo.resumeUrl}>
                RESUME
              </GlowButton>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="hero"
      aria-label="Hero"
      className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24 pt-16"
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(196, 145, 122, 0.08) 0%, transparent 60%), linear-gradient(180deg, #0A0A0F 0%, #0D0D12 100%)',
        }}
      />

      {/* Ambient glow orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(196, 145, 122, 0.06) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          className="max-w-2xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Greeting */}
          <motion.p
            variants={itemVariants}
            className="font-[family-name:var(--font-mono)] text-sm md:text-base text-[#C4917A] tracking-wide mb-4"
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name - Character Reveal */}
          <motion.h1
            variants={charContainerVariants}
            className="font-[family-name:var(--font-heading)] text-5xl md:text-7xl lg:text-[5.5rem] font-bold text-[var(--color-pure-white)] tracking-tight leading-[0.95] flex flex-wrap overflow-hidden py-2"
          >
            {personalInfo.name.split(' ').map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 md:mr-6 last:mr-0">
                {word.split('').map((char, charIndex) => (
                  <span key={charIndex} className="inline-block overflow-hidden">
                    <motion.span
                      className="inline-block"
                      variants={charVariants}
                    >
                      {char}
                    </motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h1>

          {/* Title */}
          <motion.p
            variants={itemVariants}
            className="mt-4 font-[family-name:var(--font-mono)] text-lg md:text-xl text-[var(--color-off-white)] opacity-60 tracking-wide"
          >
            {personalInfo.title}
          </motion.p>

          {/* Tagline - Word Reveal */}
          <motion.div
            variants={wordContainerVariants}
            className="mt-6 font-[family-name:var(--font-body)] text-base md:text-lg text-[var(--color-off-white)] leading-relaxed max-w-lg flex flex-wrap"
          >
            {heroTagline.split(' ').map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.3em]">
                <motion.span
                  className="inline-block"
                  variants={wordVariants}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col sm:flex-row gap-4"
          >
            <GlowButton variant="primary" href="#projects">
              PROJECTS
            </GlowButton>
            <GlowButton variant="secondary" href="#contact">
              CONTACT
            </GlowButton>
            <GlowButton variant="secondary" href={personalInfo.resumeUrl}>
              RESUME
            </GlowButton>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="mt-6 flex items-center gap-4"
          >
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-[var(--color-off-white)] opacity-30 hover:opacity-100 hover:text-[#C4917A] transition-all duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-[var(--color-off-white)] opacity-30 hover:opacity-100 hover:text-[#C4917A] transition-all duration-300"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <span className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.3em] text-[var(--color-off-white)] opacity-40 uppercase">
              Scroll
            </span>
            <motion.div
              className="w-[1px] h-8 bg-gradient-to-b from-[#C4917A] to-transparent opacity-40"
              animate={{ scaleY: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

