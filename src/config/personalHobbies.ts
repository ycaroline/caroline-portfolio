/**
 * Personal hobbies configuration (replaces extraCurricularActivities)
 */

import type { personalHobbie } from '../types';


export const personalHobbies: readonly personalHobbie[] = [
  {
    title: 'Traveling',
    description: 'Visited several countries and explored local cultures and traditions.',
    location: 'Various Countries',
    year: '2024',
    images: [
      { 
        url: '/public/Strand2.jpg', 
        alt: 'Travel 1', 
        description: 'Beach day in Djerba' 
      },
      { 
        url: '/public/Tunesien.jpg', 
        alt: 'Travel 2', 
        description: 'Exploring Tunesia' 
      },
    ],
  },
  {
    title: 'Sports',
    description: 'Active in sports',
    location: 'Local gyms and outdoors',
    year: '2024',
    images: [
      { 
        url: '/public/Sport.JPG', 
        alt: 'weight training', 
        description: 'Training day' 
      },
    ],
  },
  {
    title: 'Food Exploration',
    description: 'Discovering new restaurants and food spots in different cities.',
    location: 'Various Cities',
    year: '2024',
    images: [
      { 
        url: '/public/Burger.jpg', 
        alt: 'New restaurant', 
        description: 'Enjoying good burgers' 
      },
      { 
        url: '/public/Pizza.jpg', 
        alt: 'Food spot', 
        description: 'testing local cuisines' 
      },
    ],
  },
] as const;

