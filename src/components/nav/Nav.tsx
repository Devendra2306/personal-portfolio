'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo } from '@/data/personal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const navSections = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'timeline', label: 'TIMELINE' },
  { id: 'contact', label: 'CONTACT' },
];

const quickLinks = [
  { label: 'RESUME', href: personalInfo.resumeUrl, external: false },
  { label: 'GITHUB', href: personalInfo.github, external: true },
  { label: 'LINKEDIN', href: personalInfo.linkedin, external: true },
];

export function Nav() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    navSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { rootMargin: '-40% 0px -60% 0px' }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  }, []);

  return (
    <div className="fixed top-4 md:top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-8 pointer-events-none">
      <nav
        className={`pointer-events-auto transition-all duration-500 rounded-full border ${
          isScrolled
            ? 'bg-[rgba(20,20,25,0.7)] backdrop-blur-xl border-[rgba(255,255,255,0.08)] shadow-[0_16px_40px_rgba(0,0,0,0.3)] py-1.5 px-2 md:px-4'
            : 'bg-[rgba(15,15,20,0.2)] backdrop-blur-md border-[rgba(255,255,255,0.03)] py-2 px-3 md:px-5'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo / Name */}
          <button
            onClick={() => scrollToSection('hero')}
            className="pl-2 md:pl-0 font-[family-name:var(--font-heading)] text-sm font-bold tracking-tight text-[var(--color-pure-white)] hover:text-[#C4917A] transition-colors duration-300"
          >
            {personalInfo.name.split(' ')[0].toUpperCase()}
            <span className="text-[#C4917A]">.</span>
          </button>

          {/* Desktop Section Links */}
          <div className="hidden md:flex items-center gap-1">
            {navSections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={`relative px-4 py-1.5 rounded-full font-[family-name:var(--font-mono)] text-[10px] tracking-wider transition-colors duration-300 ${
                  activeSection === id
                    ? 'text-[var(--color-pure-white)]'
                    : 'text-[var(--color-off-white)] hover:text-[var(--color-pure-white)] opacity-60 hover:opacity-100'
                }`}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                <span className="relative z-10">{label}</span>
                {activeSection === id && (
                  prefersReducedMotion ? (
                    <span className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.08)] -z-0" />
                  ) : (
                    <motion.span
                      layoutId="nav-pill-active"
                      className="absolute inset-0 rounded-full bg-[rgba(255,255,255,0.08)] -z-0"
                      transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                    />
                  )
                )}
              </button>
            ))}
          </div>

          {/* Quick Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-4 border-l border-[rgba(255,255,255,0.1)] pl-6 ml-2">
            {quickLinks.map(({ label, href, external }) => (
              <a
                key={label}
                href={href}
                target={external ? '_blank' : undefined}
                rel={external ? 'noopener noreferrer' : undefined}
                className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--color-off-white)] opacity-60 hover:opacity-100 hover:text-[#C4917A] transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden relative w-9 h-9 flex items-center justify-center mr-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            <span className="sr-only">{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
            <div className="flex flex-col gap-[5px]">
              <span
                className={`block w-4 h-[1.5px] bg-[var(--color-off-white)] transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[6.5px]' : ''
                }`}
              />
              <span
                className={`block w-4 h-[1.5px] bg-[var(--color-off-white)] transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-4 h-[1.5px] bg-[var(--color-off-white)] transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[6.5px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
            className="absolute top-full mt-4 w-full max-w-sm left-1/2 -translate-x-1/2 bg-[rgba(20,20,25,0.9)] backdrop-blur-xl border border-[rgba(255,255,255,0.08)] rounded-3xl p-6 shadow-2xl pointer-events-auto md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navSections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`text-left px-4 py-3 rounded-xl font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] transition-colors duration-300 ${
                    activeSection === id
                      ? 'bg-[rgba(255,255,255,0.05)] text-[#C4917A]'
                      : 'text-[var(--color-off-white)] opacity-70 hover:bg-[rgba(255,255,255,0.02)] hover:opacity-100'
                  }`}
                >
                  {label}
                </button>
              ))}

              {/* Mobile Quick Links */}
              <div className="mt-4 pt-4 border-t border-[rgba(255,255,255,0.08)] flex flex-wrap gap-4 px-4">
                {quickLinks.map(({ label, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="font-[family-name:var(--font-mono)] text-[10px] tracking-[0.2em] text-[var(--color-off-white)] opacity-50 hover:opacity-100 hover:text-[#C4917A] transition-colors duration-300"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
