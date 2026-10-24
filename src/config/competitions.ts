import type { Competition } from '../types';

export const competitions: readonly Competition[] = [
  {
    id: 'think-new',
    title: 'THINK NEW Innovation Competition',
    description: 'Faculty of Media · Offenburg University',
    achievement: 'Best Concept and Audience Award at THINK NEW.',
    year: '2025',
    status: 'Award-winning team entry',
    badges: ['Best Concept', 'Audience Award'],
    concept: 'mEatGreen',
    summary: 'An event concept for AOK that makes healthy eating and sustainability engaging for people under 35.',
    tags: ['Audience research', 'Event planning', 'Communication'],
    images: [
      { url: '/thinknew.jpg', alt: 'The team at the THINK NEW award ceremony.', description: 'THINK NEW · Award ceremony' },
      { url: '/thinknew-meatgreen-cover.webp', alt: 'Original mEatGreen presentation cover: event concept in cooperation with AOK.', description: 'mEatGreen · Original concept presentation' },
      { url: '/thinknew-meatgreen-posters.webp', alt: 'Two original poster concepts for the proposed mEatGreen event.', description: 'mEatGreen · Proposed event posters' },
    ],
    sections: [
      { title: 'The brief', text: 'Develop an event around healthy eating and sustainability for young people up to 35, making AOK approachable through a shared experience.' },
      { title: 'The concept', text: 'mEatGreen combines cooking stations, a cooking show, creative and fitness workshops, and social content. The proposal covers personas, programme design, resources, budget and communication before, during and after the event.' },
      { title: 'Team project', text: 'Developed with Nico Kappler and Ramona Schneider. The visuals show the proposed event and communication materials; they document a concept rather than a delivered event.' },
      { title: 'Another THINK NEW concept', text: 'A separate concept explored AI-supported career orientation for students.' },
    ],
  },
  {
    id: 'watsonx-challenge',
    title: 'IBM watsonx Challenge',
    description: 'Global competition · IBM',
    achievement: 'Participant in the global IBM watsonx Challenge.',
    year: '2026',
    status: 'Participant · Team entry',
    badges: ['Global competition', 'Participant'],
    concept: 'Sales Incentive Transparency',
    summary: 'A team concept for helping sales employees navigate incentive guidance through one context-aware interface, explored with IBM Bob.',
    tags: ['UI/UX', 'IBM Bob', 'Prompting', 'Prototyping'],
    images: [
      { url: '/watsonx-sales-incentive-cover.webp', alt: 'Sales Incentive Transparency concept cover with the IBM Bob mascot, labelled 2026 Participant.', description: 'Portfolio concept visualization · IBM Bob' },
      { url: '/watsonx-overlay-concept.webp', alt: 'Concept visualization of an incentive guidance overlay beside a sales workspace.', description: 'Overlay concept · Retrospective UI/UX visualization' },
      { url: '/watsonx-bob-prototyping.webp', alt: 'Illustrative development workspace showing prompting, testing and refinement with IBM Bob.', description: 'Working with IBM Bob · Illustrative prototyping workflow, not an actual product screenshot' },
    ],
    sections: [
      { title: 'The challenge', text: 'Sales employees need to navigate incentive guidance spread across different resources. The proposal explores a clearer way to find relevant information without first knowing which team owns it.' },
      { title: 'The concept', items: ['Modernize incentive handbook content with IBM Bob.', 'Test an existing assistant with practical seller questions and explore gaps through prompts and prototype scenarios.', 'Design an overlay widget that directs questions to guidance across global processes, HR, local policies, business units and finance.'] },
      { title: 'My contribution', items: ['Designed the UI/UX concept for the overlay widget and visual flows for navigating incentive information.', 'Tested prompts and prototype scenarios in IBM Bob to explore gaps in existing assistant responses.', 'Collected practical seller questions to inform testing and use-case development.'] },
      { title: 'Development stage', text: 'Competition submission and concept exploration. IBM Bob supported prompting and prototyping; the cover is a retrospective concept visualization rather than a screenshot of a deployed product.' },
    ],
  },
] as const;
