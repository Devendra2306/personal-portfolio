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

  // Track active section via IntersectionObserver
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

  // Track scroll for nav background opacity
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on Escape
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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[rgba(10,10,15,0.85)] backdrop-blur-[16px] border-b border-[rgba(0,240,255,0.08)]'
          : 'bg-[rgba(10,10,15,0.1)]'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <button
          onClick={() => scrollToSection('hero')}
          className="font-[family-name:var(--font-heading)] text-sm font-bold tracking-tight text-[var(--color-pure-white)] hover:text-[var(--color-neon-cyan)] transition-colors duration-300"
        >
          {personalInfo.name.split(' ')[0].toUpperCase()}
          <span className="text-[var(--color-neon-cyan)]">.</span>
        </button>

        {/* Desktop Section Links */}
        <div className="hidden md:flex items-center gap-8">
          {navSections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`relative font-[family-name:var(--font-mono)] text-xs tracking-wider transition-colors duration-300 py-1 ${
                activeSection === id
                  ? 'text-[var(--color-neon-cyan)]'
                  : 'text-[var(--color-off-white)] hover:text-[var(--color-pure-white)]'
              }`}
              aria-current={activeSection === id ? 'page' : undefined}
            >
              {label}
              {/* Active indicator — cyan underline */}
              {activeSection === id && (
                prefersReducedMotion ? (
                  <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-neon-cyan)]" />
                ) : (
                  <motion.span
                    layoutId="nav-active-indicator"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-[var(--color-neon-cyan)]"
                    style={{ boxShadow: '0 0 8px rgba(0, 240, 255, 0.5)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )
              )}
            </button>
          ))}
        </div>

        {/* Quick Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-4">
          {quickLinks.map(({ label, href, external }) => (
            <a
              key={label}
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noopener noreferrer' : undefined}
              className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-[var(--color-off-white)] hover:text-[var(--color-neon-cyan)] transition-colors duration-300"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden relative w-10 h-10 flex items-center justify-center"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
          <div className="flex flex-col gap-1.5">
            <span
              className={`block w-5 h-[1px] bg-[var(--color-off-white)] transition-all duration-300 ${
                isMobileMenuOpen ? 'rotate-45 translate-y-[4px]' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1px] bg-[var(--color-off-white)] transition-all duration-300 ${
                isMobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-[1px] bg-[var(--color-off-white)] transition-all duration-300 ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-[4px]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: '100%' }}
            transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 top-16 bg-[rgba(10,10,15,0.95)] backdrop-blur-[16px] md:hidden"
          >
            <div className="flex flex-col items-center gap-6 pt-12">
              {navSections.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => scrollToSection(id)}
                  className={`font-[family-name:var(--font-mono)] text-sm tracking-[0.2em] transition-colors duration-300 ${
                    activeSection === id
                      ? 'text-[var(--color-neon-cyan)]'
                      : 'text-[var(--color-off-white)] hover:text-[var(--color-pure-white)]'
                  }`}
                >
                  {label}
                </button>
              ))}

              {/* Mobile Quick Links */}
              <div className="mt-8 pt-8 border-t border-[rgba(255,255,255,0.1)] flex gap-6">
                {quickLinks.map(({ label, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    className="font-[family-name:var(--font-mono)] text-xs tracking-[0.2em] text-[var(--color-off-white)] hover:text-[var(--color-neon-cyan)] transition-colors duration-300"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
