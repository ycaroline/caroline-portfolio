/**
 * Education and courses configuration
 */
 
import type { Education, Course } from '../types';

export const education: readonly Education[] = [
  {
    degree: 'Bachelor of Media and Information Systems',
    major: 'Media and Information Systems',
    institution: 'Hochschule Offenburg',
    location: 'Offenburg, Germany',
    year: '2020-2024', 
    description: `
Focused on a combination of graphics, media marketing, analytics, and computer science. Relevant courses included:
- Software Engineering
- Digital Media
- Computer Architecture & Operating Systems Lab
- Interaction Software
- Computer Networks
- Databases
- Media Technology
    `,
    images: [
      {
        url: '/hjsoffenburg.jpg', // oder public/
        alt: 'Hochschule Offenburg',
        description: 'Campus of Hochschule Offenburg',
      },
    ],
  },
  {
    degree: 'Master of Media Informatics',
    major: 'Media Informatics',
    institution: 'Hochschule RheinMain',
    location: 'Wiesbaden, Germany',
    year: '2024-2026',
    description: `
Advanced coursework in:
- Digital Government
- Project - Design & Implementation of Systems II
- Advanced Methods in Scientific Research
- Technology Management
- Advanced Human-Computer Interaction
- Artificial Intelligence
    `,
    images: [
      {
        url: '/public/hswiesbaden.jpg',
        alt: 'Hochschule RheinMain Master',
        description: 'Master studies at Hochschule RheinMain',
      },
    ],
  },
] as const;

// 💡 Leerer Export für Kompatibilität mit AppLayout.tsx
export const courses: readonly never[] = [] as const;