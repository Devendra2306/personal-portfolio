export interface TimelineEntry {
  id: string;
  date: string;
  title: string;
  organization: string;
  description: string;
  type: 'work' | 'education' | 'achievement';
}

export const timelineEntries: TimelineEntry[] = [
  {
    id: 'btech',
    date: '2024 - Present',
    title: 'B.Tech in Information Technology',
    organization: 'St Francis Institute of Technology',
    description: 'Pursuing undergraduate degree with a current CGPA of 7.00. Focusing on Software Engineering, Full Stack Development, and Cloud Technologies.',
    type: 'education',
  },
  {
    id: 'cert-fs',
    date: 'Recent',
    title: 'The Complete Full-Stack Web Development Bootcamp',
    organization: 'Certification',
    description: 'Mastered modern web development including React, Node.js, and databases.',
    type: 'achievement',
  },
  {
    id: 'cert-aws',
    date: 'In Progress',
    title: 'AWS Cloud Practitioner',
    organization: 'Certification',
    description: 'Currently preparing for the AWS Cloud Practitioner certification to solidify cloud computing fundamentals.',
    type: 'achievement',
  },
  {
    id: 'ssc',
    date: '2022 - 2024',
    title: 'Class XII SSC',
    organization: 'Nirmala Memorial Junior College of Science',
    description: 'Completed higher secondary education in science.',
    type: 'education',
  },
];
