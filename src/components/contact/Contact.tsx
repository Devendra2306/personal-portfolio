'use client';

import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { ContactCard } from './ContactCard';
import { ContactForm } from './ContactForm';
import { personalInfo } from '@/data/personal';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

export function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback for older browsers
      window.location.href = `mailto:${personalInfo.email}`;
    }
  }, []);

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="contact-section"
    >
      {/* Ambient background elements */}
      <div className="contact-ambient" aria-hidden="true">
        <div className="contact-orb contact-orb--1" />
        <div className="contact-orb contact-orb--2" />
      </div>

      <div className="contact-container">
        {/* Giant headline */}
        <motion.div
          className="contact-headline-wrap"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <span className="contact-eyebrow">Get in Touch</span>
          <h2 className="contact-headline">
            Let&apos;s <span className="contact-headline-accent">Talk</span>
          </h2>
          <p className="contact-subtitle">
            Have a project in mind, a question, or just want to say hi?
            <br className="hidden md:block" />
            I&apos;d love to hear from you.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="contact-bento">
          {/* ─── Main Form Card (spans 2 rows on desktop) ─── */}
          <ContactCard className="contact-bento-form" delay={0.1} tilt={false}>
            <div className="contact-card-header">
              <div className="contact-card-dot-row" aria-hidden="true">
                <span className="contact-card-dot contact-card-dot--red" />
                <span className="contact-card-dot contact-card-dot--yellow" />
                <span className="contact-card-dot contact-card-dot--green" />
              </div>
              <span className="contact-card-title">New Message</span>
            </div>
            <ContactForm />
          </ContactCard>

          {/* ─── Email Card ─── */}
          <ContactCard className="contact-bento-email" delay={0.2}>
            <div className="contact-mini-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </div>
            <p className="contact-mini-label">Email</p>
            <p className="contact-email-value">{personalInfo.email}</p>
            <button
              onClick={copyEmail}
              className="contact-copy-btn"
              aria-label="Copy email address"
            >
              {copiedEmail ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="14" height="14" x="8" y="8" rx="2" />
                    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          </ContactCard>

          {/* ─── GitHub Card ─── */}
          <ContactCard className="contact-bento-github" delay={0.3}>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-link"
              aria-label="Visit GitHub profile"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="contact-social-icon">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              <div className="contact-social-info">
                <span className="contact-social-name">GitHub</span>
                <span className="contact-social-handle">@{personalInfo.github.split('/').pop()}</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-social-arrow">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </ContactCard>

          {/* ─── LinkedIn Card ─── */}
          <ContactCard className="contact-bento-linkedin" delay={0.35}>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-social-link"
              aria-label="Visit LinkedIn profile"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="contact-social-icon">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <div className="contact-social-info">
                <span className="contact-social-name">LinkedIn</span>
                <span className="contact-social-handle">Connect</span>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contact-social-arrow">
                <path d="M7 17 17 7M7 7h10v10" />
              </svg>
            </a>
          </ContactCard>

          {/* ─── Location Card ─── */}
          <ContactCard className="contact-bento-location" delay={0.4}>
            <div className="contact-location-content">
              <div className="contact-location-pin" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="contact-location-text">
                <span className="contact-location-city">{personalInfo.location}</span>
                <span className="contact-location-tz">
                  IST (UTC+5:30) ·{' '}
                  <span className="contact-location-time">
                    {new Date().toLocaleTimeString('en-IN', {
                      hour: '2-digit',
                      minute: '2-digit',
                      timeZone: 'Asia/Kolkata',
                    })}
                  </span>
                </span>
              </div>
              <div className="contact-status-badge">
                <span className="contact-status-dot" />
                Available
              </div>
            </div>
          </ContactCard>
        </div>
      </div>
    </section>
  );
}
