/**
 * Competitions and achievements configuration
 * Add your competition achievements and awards here
 */

import type { Competition } from '../types';

export const competitions: readonly Competition[] = [
  {
    title: 'THINK NEW Innovation Competition',
    description: 'Innovation competition organized by the Faculty of Media at Offenburg University',
    achievement: "Won Best Concept and the Audience Award at the THINK NEW Innovation Competition. Our team developed a concept exploring the use of AI in the career orientation process for students, as well as an event concept focused on healthy nutrition and sustainability for young people under 35.'",
    year: '2025',
    images: [
      { url: '/thinknew.jpg', 
      	alt: 'THINK NEW Innovation Competition',
	description: 'Award ceremony at the THINK NEW Innovation Competition'
      }
    ],
  } 
] as const;
