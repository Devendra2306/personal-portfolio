'use client';

import { motion } from 'motion/react';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { type GitHubRepo, getLanguageColor, formatRepoDate } from '@/lib/github';

interface GitHubReposProps {
  repos: GitHubRepo[];
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const langColor = getLanguageColor(repo.language);

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      data-cursor="pointer"
    >
      <div className="github-repo-card h-full p-5 rounded-xl border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] transition-all duration-300 hover:border-[rgba(196,145,122,0.2)] hover:bg-[rgba(255,255,255,0.035)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.15)]">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <svg
              className="w-4 h-4 text-[rgba(255,255,255,0.3)] group-hover:text-[#C4917A] transition-colors"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1h-8a1 1 0 00-1 1v6.708A2.486 2.486 0 014.5 9h8.5V1.5zm-8.75 4.75a.75.75 0 01.75-.75h4.5a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75z" />
            </svg>
            <span className="font-[family-name:var(--font-mono)] text-sm text-[var(--color-pure-white)] group-hover:text-[#C4917A] transition-colors truncate">
              {repo.name}
            </span>
          </div>
          <svg
            className="w-3.5 h-3.5 text-[rgba(255,255,255,0.15)] group-hover:text-[#C4917A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shrink-0 mt-1"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </div>

        {/* Description */}
        <p className="font-[family-name:var(--font-body)] text-xs text-[var(--color-off-white)] opacity-50 leading-relaxed mb-4 line-clamp-2 min-h-[2.5rem]">
          {repo.description || 'No description provided'}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Language dot */}
            {repo.language && (
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: langColor }}
                />
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-off-white)] opacity-40">
                  {repo.language}
                </span>
              </div>
            )}

            {/* Stars */}
            {repo.stargazers_count > 0 && (
              <div className="flex items-center gap-1">
                <svg className="w-3 h-3 text-[rgba(255,255,255,0.3)]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z" />
                </svg>
                <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-off-white)] opacity-40">
                  {repo.stargazers_count}
                </span>
              </div>
            )}
          </div>

          {/* Updated time */}
          <span className="font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-off-white)] opacity-25">
            {formatRepoDate(repo.updated_at)}
          </span>
        </div>

        {/* Live link badge */}
        {repo.homepage && (
          <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.04)]">
            <span className="inline-flex items-center gap-1.5 font-[family-name:var(--font-mono)] text-[10px] text-[rgba(0,200,120,0.7)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[rgba(0,200,120,0.7)]" />
              Live
            </span>
          </div>
        )}
      </div>
    </a>
  );
}

export function GitHubRepos({ repos }: GitHubReposProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  if (repos.length === 0) return null;

  const cardVariants: any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const containerVariants: any = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.06 },
    },
  };

  const content = (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {repos.map((repo) =>
        prefersReducedMotion ? (
          <RepoCard key={repo.name} repo={repo} />
        ) : (
          <motion.div key={repo.name} variants={cardVariants}>
            <RepoCard repo={repo} />
          </motion.div>
        )
      )}
    </div>
  );

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <svg className="w-5 h-5 text-[#C4917A] opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
          </svg>
          <h3 className="font-[family-name:var(--font-mono)] text-sm uppercase tracking-widest text-[#C4917A]">
            // GITHUB REPOS
          </h3>
        </div>
        <div className="flex items-end justify-between">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl md:text-3xl text-[var(--color-pure-white)] font-bold tracking-tight">
            Open Source & More
          </h2>
          <a
            href="https://github.com/Devendra2306"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 font-[family-name:var(--font-mono)] text-xs text-[var(--color-off-white)] opacity-40 hover:opacity-100 hover:text-[#C4917A] transition-all"
            data-cursor="pointer"
          >
            View all on GitHub
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </div>
        <p className="mt-2 font-[family-name:var(--font-body)] text-sm text-[var(--color-off-white)] opacity-35">
          Auto-synced from GitHub · Updates every hour
        </p>
      </div>

      {prefersReducedMotion ? (
        content
      ) : (
        <motion.div
          variants={containerVariants}
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
