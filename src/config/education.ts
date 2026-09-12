/**
 * Education and courses configuration
 */
 
import type { Education, Course } from '../types';

export const education: readonly Education[] = [
  {
    degree: 'Bachelor of Science',
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
        url: '/hjsoffenbug.jpg',
        alt: 'Hochschule Offenburg',
        description: 'Campus of Hochschule Offenburg',
      },
    ],
  },
  {
    degree: 'Master of Science',
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
        url: '/hswiesbaden.jpg',
        alt: 'Hochschule RheinMain Master',
        description: 'Master studies at Hochschule RheinMain',
      },
    ],
  },
] as const;

// Kept for compatibility; the Notes UI hides this section while empty.
export const courses: readonly never[] = [] as const;
