/**
 * Professional experience configuration
 * Add your work experience here
 */

import type { Experience } from '../types';

export const experience: readonly Experience[] = [
    {
        title: 'IBM - Tech Sales ',
        company: 'Work Student',
        location: 'Frankfurt, Germany',
        period: '2024 - ',
        description: 'Coordinated CRM reporting and project roadmaps between management and sales, analyzed collaboration across engineering, R&D, and sales, and developed strategies for customer reactivation and researching deployment strategies for large language models on hyperconverged systems in a cloud-based environment.',
        technologies: ['CRM Reporting', 'Techzone', 'AI Infrastructure', 'LLM'],
        images: [
            {
                url: 'public/towerone.jpg',
                alt: 'Proteinea',
            },
        ],
    },
    {
        title: 'Mercedes-Benz | Software developer culturet',
        company: 'Internship',
        location: 'Stuttgart, Germany',
        period: '2023 - 2024',
        description: 'Supported company-wide open-source (FOSS) initiatives and conducted internal surveys among software developers to generate data-driven insights for improving the development environment. Also contributed to content and media management for internal and external communication of tech topics.',
        technologies: ['FOSS', 'Data-Driven Insights', 'Innovation & Technology Initiatives'],
        images: [
            {
                url: '/IMG_7031.jpg',
                alt: 'Luftborn',
            },
            {
                url: '/IMG_7030.jpg',
                alt: 'Luftborn',
            },
            {
                url: '/IMG_7032.PNG',
                alt: 'Luftborn',
            },
        ],
    },
    {
        title: 'Bayerischer Rundfunk | Social Media Manager',
        company:'Social Media Manager',
        location: 'Munich, Germany',
        period: '2021 - 2023',
        description: 'Developed and produced social media content for Instagram and Snapchat, analyzed performance metrics to optimize reach and engagement, and managed community interaction. Additionally wrote scripts for content productions and coordinated collaboration with actors.',
        technologies: ['Content Creation', 'Audience Engagement', 'Community Management'],
        images: [
            {
                url: '/IMG_7027.jpg',
                alt: 'Offenburg University',
            }
        ],
    }
] as const;
