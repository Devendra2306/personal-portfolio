export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
  fork: boolean;
  topics: string[];
}

const GITHUB_USERNAME = 'Devendra2306';

// Repos to exclude from the auto-fetched list (already in featured projects or not relevant)
const EXCLUDED_REPOS = [
  'Devendra2306', // profile README repo
  'personal-portfolio', // this portfolio itself
];

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`,
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!res.ok) {
      console.error('GitHub API error:', res.status);
      return [];
    }

    const repos: GitHubRepo[] = await res.json();

    return repos
      .filter((repo) => !repo.fork) // Exclude forks
      .filter((repo) => !EXCLUDED_REPOS.includes(repo.name)) // Exclude specific repos
      .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
  } catch (error) {
    console.error('Failed to fetch GitHub repos:', error);
    return [];
  }
}

// Map GitHub language to a color
export function getLanguageColor(language: string | null): string {
  const colors: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    Python: '#3572A5',
    Java: '#b07219',
    HTML: '#e34c26',
    CSS: '#563d7c',
    'Jupyter Notebook': '#DA5B0B',
    Shell: '#89e051',
    C: '#555555',
    'C++': '#f34b7d',
    Rust: '#dea584',
    Go: '#00ADD8',
  };
  return colors[language || ''] || '#C4917A';
}

// Format the date nicely
export function formatRepoDate(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}
