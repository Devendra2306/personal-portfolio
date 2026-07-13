export interface SkillDomain {
  id: string;
  domain: string;
  label: string;
  tags: string[];
  application: string;
}

export const skillDomains: SkillDomain[] = [
  {
    id: 'frontend',
    domain: 'Frontend',
    label: 'Frontend Engineering',
    tags: ['React', 'Next.js', 'JavaScript', 'HTML5', 'CSS3'],
    application: 'Built responsive web interfaces and dynamic single-page applications.',
  },
  {
    id: 'backend-ops',
    domain: 'Backend & DevOps',
    label: 'Backend & DevOps',
    tags: ['Java', 'Node.js', 'CI/CD', 'CloudVault Storage'],
    application: 'Developing robust backend services and experimenting with DevOps workflows.',
  },
  {
    id: 'data-ml',
    domain: 'Data Science',
    label: 'Data Science & ML',
    tags: ['Python', 'Jupyter Notebook', 'Data Analysis'],
    application: 'Analyzed air quality datasets and built predictive models.',
  },
  {
    id: 'hardware-iot',
    domain: 'Hardware & IoT',
    label: 'Hardware & IoT',
    tags: ['Embedded Systems', 'Smart Secured Locker', 'Sensors'],
    application: 'Bridging the physical and digital world with smart hardware integrations.',
  },
];
