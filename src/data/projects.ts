export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  demoUrl?: string;
  sourceUrl?: string;
  status: 'online' | 'warning' | 'error';
  timestamp: string;
}

export const projects: Project[] = [
  {
    id: 'cloud-vault',
    title: 'CloudVault Drive',
    description: 'Enterprise-grade cloud storage platform featuring robust JWT authentication, protected routing, secure file sharing via email, and AWS S3 integration.',
    tags: ['Next.js', 'Node.js', 'PostgreSQL', 'JWT', 'AWS S3', 'Resend'],
    demoUrl: 'https://www.cloudvault.co.in',
    sourceUrl: '#',
    status: 'online',
    timestamp: '2026.07',
  },
  {
    id: 'smart-locker',
    title: 'Smart Secured Locker',
    description: 'A hardware-software integration project focusing on secure physical storage solutions and IoT connectivity.',
    tags: ['IoT', 'Hardware', 'Embedded Systems'],
    demoUrl: '#',
    sourceUrl: 'https://github.com/Devendra2306/Smart-Secured-Locker',
    status: 'online',
    timestamp: '2025',
  },
  {
    id: 'devops-experiment',
    title: 'College DevOps Experiment',
    description: 'An exploration into CI/CD pipelines, containerization, and modern deployment strategies for college coursework.',
    tags: ['DevOps', 'CI/CD', 'Linux'],
    demoUrl: '#',
    sourceUrl: 'https://github.com/Devendra2306/Devendra',
    status: 'online',
    timestamp: '2025',
  },
  {
    id: 'aqi-monitoring',
    title: 'AI Air Quality Monitoring',
    description: 'AI-powered AQI monitoring platform that collects and analyzes live environmental data with Python and Flask.',
    tags: ['Python', 'Flask', 'Pandas', 'Jupyter', 'REST APIs'],
    demoUrl: 'https://air-quality-rv98.onrender.com/',
    sourceUrl: '#',
    status: 'warning', // Warning status since it's "Under Development"
    timestamp: '2026.07',
  },
];
