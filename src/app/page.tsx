import { Hero } from '@/components/hero/Hero';
import { About } from '@/components/about/About';
import { Skills } from '@/components/skills/Skills';
import { Projects } from '@/components/projects/Projects';
import { Timeline } from '@/components/timeline/Timeline';
import { Contact } from '@/components/contact/Contact';
import { personalInfo } from '@/data/personal';
import { Marquee } from '@/components/shared/Marquee';

const footerNavLinks = [
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const marqueeItems = [
  'REACT',
  'NEXT.JS 15',
  'TYPESCRIPT',
  'TAILWIND CSS',
  'NODE.JS',
  'POSTGRESQL',
  'AWS',
  'FRAMER MOTION'
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <div className="relative">
        <Hero />
      </div>

      <Marquee items={marqueeItems} speed="slow" className="mb-24" />

      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Contact />

      {/* Footer */}
      <footer className="border-t border-[rgba(255,255,255,0.06)]">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
            {/* Left — Name & Tagline */}
            <div className="flex flex-col gap-3">
              <span className="font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-pure-white)] tracking-tight">
                {personalInfo.name}
              </span>
              <p className="font-[family-name:var(--font-body)] text-sm text-[var(--color-off-white)] opacity-50 leading-relaxed max-w-xs">
                {personalInfo.title}
              </p>
            </div>

            {/* Center — Quick Nav */}
            <div className="flex flex-col gap-3 md:items-center">
              <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-[var(--color-neon-cyan)] uppercase opacity-60">
                Navigate
              </span>
              <ul className="flex flex-col gap-2 md:items-center">
                {footerNavLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-[family-name:var(--font-body)] text-sm text-[var(--color-off-white)] opacity-40 hover:opacity-100 hover:text-[var(--color-neon-cyan)] transition-all duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Social Links */}
            <div className="flex flex-col gap-3 md:items-end">
              <span className="font-[family-name:var(--font-mono)] text-[11px] tracking-[0.2em] text-[var(--color-neon-cyan)] uppercase opacity-60">
                Connect
              </span>
              <div className="flex gap-4 items-center">
                {/* GitHub */}
                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="text-[var(--color-off-white)] opacity-40 hover:opacity-100 hover:text-[var(--color-neon-cyan)] transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </a>
                {/* LinkedIn */}
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-[var(--color-off-white)] opacity-40 hover:opacity-100 hover:text-[var(--color-neon-cyan)] transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
                {/* Email */}
                <a
                  href={`mailto:${personalInfo.email}`}
                  aria-label="Email"
                  className="text-[var(--color-off-white)] opacity-40 hover:opacity-100 hover:text-[var(--color-neon-cyan)] transition-all duration-300"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[rgba(255,255,255,0.04)] px-6 md:px-12 lg:px-24 py-6">
          <p className="font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-off-white)] opacity-25 tracking-wider text-center">
            © {new Date().getFullYear()} {personalInfo.name.toUpperCase()} — ALL RIGHTS RESERVED
          </p>
        </div>
      </footer>
    </>
  );
}
