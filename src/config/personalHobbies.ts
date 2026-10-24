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
      { url: '/hobby-travel-turtle.webp', alt: 'Caroline beside a giant tortoise', description: 'A little closer to nature' },
      { url: '/hobby-travel-helmet.webp', alt: 'Caroline wearing a helmet in the desert', description: 'Desert adventures' },
      {
        url: '/hobby-travel-beach.webp',
        alt: 'Camels on the beach in Djerba at sunset',
        description: 'Beach day in Djerba'
      },
      {
        url: '/hobby-travel-tunisia.webp',
        alt: 'Caroline exploring street art in Tunisia',
        description: 'Exploring Tunisia'
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
        url: '/hobby-sports.webp',
        alt: 'Gym mirror photograph with a friend',
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
      { url: '/hobby-food-matcha.webp', alt: 'Caroline enjoying a matcha drink', description: 'Matcha moments' },
      {
        url: '/hobby-food-burger.webp',
        alt: 'New restaurant',
        description: 'Enjoying good burgers'
      },
      {
        url: '/hobby-food-pizza.webp',
        alt: 'Food spot',
        description: 'testing local cuisines'
      },
    ],
  },
] as const;

